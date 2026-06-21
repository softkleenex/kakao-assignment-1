# 3차 과제 트러블슈팅

## 1. FastAPI TestClient가 `httpx2`를 요구함

### 상황

백엔드 CRUD를 검증하기 위해 `fastapi.testclient.TestClient`를 사용하려 했지만 다음 오류가 발생했습니다.

```text
RuntimeError: The starlette.testclient module requires the httpx2 package to be installed.
```

### 원인

현재 설치된 최신 FastAPI/Starlette 조합에서 테스트 클라이언트가 별도 `httpx2` 패키지를 요구했습니다.

### 해결

과제 실행에 꼭 필요한 런타임 의존성을 늘리지 않기 위해 `httpx2`를 추가하지 않았습니다. 대신 Uvicorn으로 실제 FastAPI 서버를 띄우고, HTTP 요청으로 생성, 조회, 수정, 삭제, 필터, 검색 흐름을 검증했습니다.

## 2. Next.js 16 생성기의 기본 import alias

### 상황

과제 가이드에서는 `import alias → No` 옵션을 제시했지만, 최신 `create-next-app@16.2.9`는 기본으로 `@/*` alias를 생성했습니다.

### 해결

`tsconfig.json`의 `paths` 설정을 제거하고, 구현 코드에서는 상대 경로 import를 사용했습니다.

## 3. 백엔드 URL 하드코딩 방지

### 상황

프론트 코드에 `http://localhost:8000`을 직접 넣으면 개발/배포 환경이 달라질 때 수정 지점이 늘어납니다.

### 해결

`frontend/.env.local`의 `BACKEND_URL`을 사용하도록 분리했고, 커밋용으로는 `frontend/.env.example`만 남겼습니다.

## 4. Next.js 내부 PostCSS audit 경고

### 상황

`npm audit --omit=dev`에서 Next.js 내부 PostCSS 의존성 관련 moderate 취약점이 보고됐습니다.

### 원인

`next@16.2.9`의 하위 의존성에 취약한 PostCSS 버전 범위가 포함되어 있었습니다. `npm audit fix --force`는 Next.js를 오래된 major 버전으로 내리는 breaking change를 제안했습니다.

### 해결

강제 downgrade 대신 `package.json`의 `overrides`로 `postcss`를 안전한 patch 버전(`^8.5.10`) 이상으로 고정했습니다. 이후 `npm audit --omit=dev`, `npm run lint`, `npm run build`를 다시 실행해 모두 통과했습니다.
