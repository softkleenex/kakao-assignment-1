# 3차 과제 구현 계획

## 목표

2차 React/localStorage Todo 앱을 Next.js App Router와 FastAPI 기반 풀스택 구조로 전환한다.

## 구현 범위

1. 프로젝트 구조
   - `task3/frontend`: Next.js App Router 프로젝트
   - `task3/backend`: FastAPI 단일 파일 API 서버

2. 백엔드
   - SQLite `todos` 테이블
   - Todo 필드: `id`, `text`, `completed`, `date`
   - API: 목록 조회, 단건 조회, 생성, 수정, 삭제
   - 서버 기반 필터: `?filter=active|completed`
   - 서버 기반 검색: `?search=키워드`
   - 날짜별 조회: `?date=YYYY-MM-DD`

3. 프론트엔드
   - `/todos`: 목록, 날짜 이동, 주간 뷰, 필터, 검색, 완료/삭제
   - `/todos/new`: 생성 폼
   - `/todos/[todoId]`: 수정 폼
   - `app/api/todos/*/route.ts`: FastAPI 프록시
   - `app/actions.ts`: 생성/수정 Server Action
   - `loading.tsx`, `error.tsx`: 로딩/에러 화면

4. 환경변수
   - 프론트: `BACKEND_URL`
   - 백엔드: `DATABASE_URL`, `CORS_ORIGINS`
   - 실제 `.env.local`은 커밋하지 않고 `.env.example`만 커밋한다.

## 역할 분리

- Server Component
  - Todo 목록 조회
  - URL 파라미터 해석
  - 정적/표시 중심 UI 렌더링

- Client Component
  - 완료 토글, 삭제처럼 클릭 이벤트가 필요한 버튼
  - API Route 호출 후 `router.refresh()`로 서버 렌더링 결과 갱신

- FastAPI
  - DB 저장과 CRUD 책임
  - 필터/검색 조건을 DB 쿼리에서 처리

## 2차 과제에서 옮기는 기능

- 유지: CRUD, 완료 표시, 날짜별 Todo, 주간 뷰, 빈 상태 화면
- 변경: localStorage 저장 → SQLite 저장
- 변경: `useState` 필터 → URL 파라미터 + 서버 필터
- 변경: 인라인 수정 → `/todos/[todoId]` 수정 페이지

## 검증 계획

1. 백엔드 패키지 설치 후 FastAPI 앱 import 확인
2. FastAPI TestClient로 생성, 조회, 수정, 삭제, 필터, 검색 테스트
3. 프론트엔드 ESLint 실행
4. 프론트엔드 production build 실행
5. 제출 전 README와 Issue 초안 작성

## 1·2차 리뷰 반영 기준

- 1차 리뷰에서 좋게 평가된 날짜 이동 시 임시 상태 초기화, 일요일 엣지 케이스 처리, UX 디테일을 유지한다.
- 2차 리뷰에서 개선점으로 나온 날짜 유틸 중복과 App 단일 집중 구조를 줄인다.
- 3차에서는 날짜 계산을 `app/lib/date.ts`, URL 상태 생성을 `app/lib/url.ts`, API 호출을 `app/lib/api.ts`로 분리한다.
- 화면 상호작용은 필요한 컴포넌트에만 Client Component로 제한하고, 목록 조회와 URL 상태 해석은 Server Component에서 처리한다.
