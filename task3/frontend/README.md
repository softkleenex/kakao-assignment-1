# task3/frontend

3차 과제의 Next.js App Router 프론트엔드입니다.

전체 과제 설명과 실행 방법은 [`../README.md`](../README.md)를 확인하세요.

## 주요 역할

- `/todos`: Todo 목록, 날짜 이동, 주간 뷰, 필터, 검색
- `/todos/new`: Todo 생성
- `/todos/[todoId]`: Todo 수정
- `/api/todos/*`: FastAPI 백엔드 프록시
- `app/actions.ts`: 생성/수정 Server Action

## 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

`BACKEND_URL`은 `.env.local`에서 관리합니다.

## 검증

- `npm run lint`
- `npm run build`
