# 테스트 및 검증 기록

## 자동화 테스트

### Backend API 테스트

터미널에서 다음 순서로 실행합니다.

    cd task3/backend
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements-dev.txt
    .venv/bin/pytest

검증 범위:

- Todo 생성
- 날짜/상태/검색 조건 조회
- 완료 상태 수정
- 삭제
- 404 응답
- 빈 문자열 생성 거부

### Frontend E2E 테스트

로컬 Chrome을 사용할 때:

    cd task3/frontend
    npm install
    PLAYWRIGHT_USE_SYSTEM_CHROME=1 npm run test:e2e

E2E 테스트는 로컬에서 이미 사용 중일 수 있는 `8000` 포트를 피하기 위해 FastAPI를 `18080` 포트로 실행합니다.

CI처럼 Playwright 브라우저를 설치해 사용할 때:

    cd task3/frontend
    npm install
    npx playwright install chromium
    npm run test:e2e

검증 범위:

- Todo 목록 표시
- 생성 페이지 이동 및 Todo 생성
- 서버 검색
- 완료 필터
- 완료 Todo의 되돌리기 버튼 표시

## Chrome DevTools MCP 수동 QA

Playwright는 반복 가능한 자동화 테스트 파일로 남기고, Chrome DevTools MCP는 실제 브라우저 화면 검증과 스크린샷 캡처에 사용했습니다.

확인한 항목:

- task2 React/localStorage 화면 렌더링
- task3 Next.js/FastAPI 화면 렌더링
- task3 서버 데이터가 화면에 표시되는지 확인
- 전/후 스크린샷 저장

스크린샷:

- `task3/screenshots/before-task2-react.png`
- `task3/screenshots/after-task3-next-fastapi.png`
