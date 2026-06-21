# 1·2차 리뷰 반영 정리

## 확인한 리뷰

### 1차 리뷰

- 날짜 이동 시 편집 상자/에러 메시지 잔존 버그를 초기화 함수로 정리한 점이 좋았음
- `setSelectionRange`로 수정 입력 커서 위치를 챙긴 UX 디테일이 좋았음
- `getMondayOfDate`의 일요일 엣지 케이스 처리와 `try-catch` 방어가 좋았음

### 2차 리뷰

- 다크모드에서 시스템 설정을 확인한 점과 `useRef`로 포커스/커서 위치를 챙긴 점이 좋았음
- 개선점: `App.jsx`에 상태와 핸들러가 몰려 있음
- 개선점: 날짜 함수가 `App.jsx`와 `WeeklyCalendar.jsx`에 중복되어 있음
- Zustand 같은 상태 관리 라이브러리보다 먼저 `utils` 폴더로 함수 분리부터 해보는 것이 좋겠다는 피드백

## 3차 과제에 반영한 방식

- 날짜 계산은 `task3/frontend/app/lib/date.ts`로 분리했습니다.
- URL 파라미터 생성은 `task3/frontend/app/lib/url.ts`로 분리했습니다.
- FastAPI 요청은 `task3/frontend/app/lib/api.ts`로 분리했습니다.
- Todo 목록 페이지는 URL 상태 해석과 데이터 조회를 담당하고, 버튼 클릭이 필요한 완료/삭제만 Client Component로 분리했습니다.
- 필터/검색 상태는 `useState`가 아니라 URL 파라미터로 관리해 새로고침과 공유가 가능한 구조로 바꿨습니다.

## 남긴 아쉬움

- 2차의 다크모드 토글은 3차에서 유지하지 않았습니다.
- 대신 과제 핵심인 App Router, Server/Client Component 분리, FastAPI 연동에 집중했습니다.
