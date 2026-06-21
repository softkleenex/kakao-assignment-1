import os
from pathlib import Path
from typing import Annotated, Literal

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from sqlalchemy import Boolean, String, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker


load_dotenv(Path(__file__).with_name(".env.local"))

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    text: Mapped[str] = mapped_column(String(255), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    date: Mapped[str] = mapped_column(String(10), index=True, nullable=False)


class TodoCreate(BaseModel):
    text: str = Field(min_length=1, max_length=255)
    date: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")

    @field_validator("text")
    @classmethod
    def strip_text(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Todo 내용은 비어 있을 수 없습니다.")
        return stripped


class TodoUpdate(BaseModel):
    text: str | None = Field(default=None, min_length=1, max_length=255)
    completed: bool | None = None
    date: str | None = Field(default=None, pattern=r"^\d{4}-\d{2}-\d{2}$")

    @field_validator("text")
    @classmethod
    def strip_text(cls, value: str | None) -> str | None:
        if value is None:
            return value
        stripped = value.strip()
        if not stripped:
            raise ValueError("Todo 내용은 비어 있을 수 없습니다.")
        return stripped

    @model_validator(mode="after")
    def require_one_field(self) -> "TodoUpdate":
        if self.text is None and self.completed is None and self.date is None:
            raise ValueError("수정할 필드를 하나 이상 전달해야 합니다.")
        return self


class TodoRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    completed: bool
    date: str


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kakao Tech Campus Todo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DbSession = Annotated[Session, Depends(get_db)]
TodoFilter = Literal["all", "active", "completed"]


@app.get("/")
def root():
    return {"message": "Todo API is running"}


@app.get("/todos", response_model=list[TodoRead])
def list_todos(
    db: DbSession,
    status_filter: Annotated[TodoFilter, Query(alias="filter")] = "all",
    search: str | None = Query(default=None, max_length=255),
    date: str | None = Query(default=None, pattern=r"^\d{4}-\d{2}-\d{2}$"),
):
    statement = select(Todo)

    if date:
        statement = statement.where(Todo.date == date)

    if status_filter == "active":
        statement = statement.where(Todo.completed.is_(False))
    elif status_filter == "completed":
        statement = statement.where(Todo.completed.is_(True))

    if search and search.strip():
        statement = statement.where(Todo.text.ilike(f"%{search.strip()}%"))

    statement = statement.order_by(Todo.date.asc(), Todo.id.asc())
    return db.scalars(statement).all()


@app.get("/todos/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int, db: DbSession):
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo를 찾을 수 없습니다.")
    return todo


@app.post("/todos", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
def create_todo(payload: TodoCreate, db: DbSession):
    todo = Todo(text=payload.text, date=payload.date, completed=False)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


@app.put("/todos/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, payload: TodoUpdate, db: DbSession):
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo를 찾을 수 없습니다.")

    if payload.text is not None:
        todo.text = payload.text
    if payload.completed is not None:
        todo.completed = payload.completed
    if payload.date is not None:
        todo.date = payload.date

    db.commit()
    db.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, db: DbSession):
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo를 찾을 수 없습니다.")

    db.delete(todo)
    db.commit()
    return None
