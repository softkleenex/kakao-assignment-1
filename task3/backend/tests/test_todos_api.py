import sys
from pathlib import Path

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from main import Base, app, get_db


def create_test_client(tmp_path):
    database_url = f"sqlite:///{tmp_path / 'todos_test.db'}"
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
    testing_session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = testing_session_local()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)


def test_todo_crud_filter_and_search(tmp_path):
    client = create_test_client(tmp_path)

    try:
        created = client.post(
            "/todos",
            json={"text": "  FastAPI 테스트 작성하기  ", "date": "2026-06-21"},
        )
        assert created.status_code == 201
        todo = created.json()
        assert todo["text"] == "FastAPI 테스트 작성하기"
        assert todo["completed"] is False

        active_list = client.get(
            "/todos",
            params={"date": "2026-06-21", "filter": "active", "search": "FastAPI"},
        )
        assert active_list.status_code == 200
        assert [item["id"] for item in active_list.json()] == [todo["id"]]

        updated = client.put(f"/todos/{todo['id']}", json={"completed": True})
        assert updated.status_code == 200
        assert updated.json()["completed"] is True

        completed_list = client.get("/todos", params={"filter": "completed"})
        assert completed_list.status_code == 200
        assert [item["id"] for item in completed_list.json()] == [todo["id"]]

        deleted = client.delete(f"/todos/{todo['id']}")
        assert deleted.status_code == 204

        missing = client.get(f"/todos/{todo['id']}")
        assert missing.status_code == 404
    finally:
        app.dependency_overrides.clear()


def test_rejects_blank_todo_text(tmp_path):
    client = create_test_client(tmp_path)

    try:
        response = client.post("/todos", json={"text": "   ", "date": "2026-06-21"})

        assert response.status_code == 422
    finally:
        app.dependency_overrides.clear()
