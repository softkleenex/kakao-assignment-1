# 과제 3 제출

## 과제 목표

- Next.js App Router의 파일 기반 라우팅 구조를 이해한다.
- Server Component와 Client Component의 역할을 구분한다.
- FastAPI와 SQLite로 Todo CRUD API를 구현한다.
- localStorage 기반 상태 관리에서 서버 API 기반 데이터 흐름으로 전환한다.
- AI 사용 결과를 그대로 붙여넣지 않고, 계획/검증/트러블슈팅 문서로 관리한다.

---

## 과제 위치

- 브랜치명 : `week-05-softkleenex`
- 주요 파일 :
  - `task3/frontend/app/todos/page.tsx`
  - `task3/frontend/app/actions.ts`
  - `task3/frontend/app/api/todos/route.ts`
  - `task3/frontend/app/api/todos/[todoId]/route.ts`
  - `task3/backend/main.py`
  - `task3/PLAN.md`
  - `task3/TROUBLESHOOTING.md`

---

## 구현한 기능

- [x] Next.js App Router 프로젝트 세팅
- [x] FastAPI 백엔드 프로젝트 세팅
- [x] Todo CRUD API 구현
- [x] Todo 목록 페이지 구현
- [x] Todo 생성 페이지 구현
- [x] Todo 수정 페이지 구현
- [x] API Route와 FastAPI 연동
- [x] Server Action 기반 생성/수정 처리
- [x] 환경변수 분리
- [x] `loading.tsx`, `error.tsx` 구현

---

## 도전 기능

- [x] 서버 기반 상태별 필터링
- [x] 서버 기반 Todo 검색
- [x] 날짜별 조회와 주간 Todo 개수 표시

---

## 전/후 서비스 화면

### 2차 React/localStorage 버전

![2차 React Todo 화면](https://github.com/softkleenex/kakao-assignment-1/blob/week-05-softkleenex/task3/screenshots/before-task2-react.png?raw=true)

### 3차 Next.js/FastAPI 버전

![3차 Next.js FastAPI Todo 화면](https://github.com/softkleenex/kakao-assignment-1/blob/week-05-softkleenex/task3/screenshots/after-task3-next-fastapi.png?raw=true)

---

## 1·2차 리뷰 반영

- 1차 리뷰에서 좋게 평가된 날짜 이동 시 임시 상태 초기화, 일요일 엣지 케이스 처리, UX 디테일을 유지하려고 했습니다.
- 2차 리뷰에서 개선점으로 나온 `App.jsx` 집중 구조와 날짜 함수 중복을 줄이기 위해 3차에서는 날짜 계산을 `app/lib/date.ts`, URL 상태 생성을 `app/lib/url.ts`, API 호출을 `app/lib/api.ts`로 분리했습니다.
- 상태도 클라이언트 `useState`에만 두지 않고 URL 파라미터와 서버 조회 흐름으로 옮겨 새로고침/공유 가능한 구조로 바꿨습니다.

---

## AI 활용 내역

### 전체 구조 계획

- AI 활용 내용 : 1, 2차 과제 리뷰에서 나온 피드백을 바탕으로 3차 과제 구현 전 계획 문서와 역할 분리를 먼저 정리했습니다.
- 직접 수정한 부분 : `task3/PLAN.md`에 구현 범위, 역할 분리, 검증 기준을 정리했습니다.
- 수정 이유 : AI가 만든 코드를 그대로 사용하는 흐름을 줄이고, 어떤 기능이 어디에 있어야 하는지 먼저 설명할 수 있게 하기 위해서입니다.

### Next.js / FastAPI 구현

- AI 활용 내용 : Next.js App Router, Server Action, API Route, FastAPI CRUD 구조를 기능 단위로 구현했습니다.
- 직접 수정한 부분 : 필터/검색/날짜 상태를 `useState`가 아니라 URL 파라미터 중심으로 관리하도록 조정했습니다.
- 수정 이유 : 새로고침과 URL 공유 시에도 같은 목록 상태가 유지되고, 서버 기반 필터링 요구사항과 잘 맞기 때문입니다.

### 검증과 트러블슈팅

- AI 활용 내용 : 백엔드와 프론트엔드 검증 절차를 순서대로 실행했습니다.
- 직접 수정한 부분 : `TestClient` 관련 이슈를 `task3/TROUBLESHOOTING.md`에 기록하고, 실제 HTTP 스모크 테스트로 대체했습니다.
- 수정 이유 : 테스트를 위해 불필요한 런타임 의존성을 늘리는 것보다, 실제 서버 요청 흐름을 확인하는 편이 과제 목적에 더 적합하다고 판단했습니다.

---

## 구현하면서 고민한 점

- 고민한 점 : 2차 과제의 인라인 수정 UI를 그대로 옮길지, 과제에서 요구한 `/todos/[todoId]` 수정 페이지를 사용할지 고민했습니다.
- 해결 방법 : 3차 과제의 파일 기반 라우팅 학습 목적을 살리기 위해 수정 페이지 방식으로 구현했습니다.

- 고민한 점 : 필터와 검색을 클라이언트 상태로 관리할지 URL로 관리할지 고민했습니다.
- 해결 방법 : 도전 미션 요구사항에 맞춰 URL 파라미터로 관리하고, FastAPI에서 필터/검색 조건을 처리하도록 구현했습니다.

---

## 과제 회고

- 잘한 점 : 구현 전에 계획 문서를 먼저 작성하고, 검증 결과와 트러블슈팅을 남겼습니다.
- 아쉬운 점 : Playwright 같은 브라우저 자동화 테스트까지는 추가하지 못했습니다.
- 다음에 시도해볼 것 : API 테스트를 별도 테스트 파일로 정리하고, UI E2E 테스트를 추가해보고 싶습니다.
