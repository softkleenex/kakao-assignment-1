# 3차 과제 - Next.js와 FastAPI로 Todo 앱 만들기

2차 React/localStorage Todo 앱을 Next.js App Router와 FastAPI/SQLite 구조로 전환한 과제입니다.

## 구현한 기능

- Todo 생성, 조회, 수정, 삭제
- 완료/진행 중 상태 토글
- 날짜별 Todo 조회
- 주간 캘린더와 날짜별 Todo 개수 표시
- URL 파라미터 기반 필터
  - 전체
  - 진행 중: `?filter=active`
  - 완료: `?filter=completed`
- URL 파라미터 기반 서버 검색
  - `?search=키워드`
  - `?filter=active&search=키워드`
- Next API Route를 통한 FastAPI 프록시
- Server Action 기반 생성/수정 폼
- `loading.tsx`, `error.tsx` 화면

## 전/후 서비스 화면

### 2차 React/localStorage 버전

![2차 React Todo 화면](./screenshots/before-task2-react.png)

### 3차 Next.js/FastAPI 버전

![3차 Next.js FastAPI Todo 화면](./screenshots/after-task3-next-fastapi.png)

## 프로젝트 구조

```text
task3/
├── PLAN.md
├── REVIEW_REFLECTION.md
├── README.md
├── TROUBLESHOOTING.md
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── app/
    │   ├── actions.ts
    │   ├── api/todos/
    │   ├── lib/
    │   ├── todos/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── package.json
    └── .env.example
```

## 실행 방법

### Backend

```bash
cd task3/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env.local
uvicorn main:app --reload
```

백엔드 확인:

- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

### Frontend

```bash
cd task3/frontend
npm install
cp .env.example .env.local
npm run dev
```

프론트엔드 확인:

- App: http://localhost:3000/todos

## 데이터 흐름

```text
브라우저
  → Next.js Page / Client Component
  → Next API Route 또는 Server Action
  → FastAPI
  → SQLite
```

목록 조회는 Server Component에서 FastAPI를 호출합니다. 완료 토글과 삭제처럼 클릭 이벤트가 필요한 동작은 Client Component에서 `/api/todos/*`로 요청하고, Next API Route가 FastAPI로 전달합니다.

## 2차 과제와 달라진 점

- localStorage 대신 SQLite에 저장합니다.
- `useState`에만 있던 필터 상태를 URL 파라미터로 이동했습니다.
- 필터와 검색은 브라우저 배열 필터링이 아니라 FastAPI 쿼리에서 처리합니다.
- 수정은 인라인 입력 대신 `/todos/[todoId]` 페이지에서 처리합니다.
- 2차 리뷰에서 지적된 날짜 함수 중복과 App 단일 집중 구조를 줄이기 위해 날짜, URL, API 로직을 `app/lib/`로 분리했습니다.

## 검증 결과

- `npm run lint` 통과
- `npm run build` 통과
- `npm audit --omit=dev` 취약점 0건
- FastAPI HTTP CRUD 스모크 테스트 통과
- Next API Route → FastAPI 프록시 스모크 테스트 통과
