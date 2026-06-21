# Repository Agent Guide

이 저장소는 카카오테크캠퍼스 Todo 과제 1, 2, 3차를 한 공개 저장소와 주차별 브랜치로 관리합니다.

## 작업 원칙

- 과제별 폴더(`task1`, `task2`, `task3`)의 경계를 지킵니다.
- 현재 3차 작업은 `week-03-softkleenex` 브랜치와 `task3/` 폴더를 기준으로 진행합니다.
- 기존 1, 2차 코드는 제출 이력이 있는 산출물이므로 요청 없이 수정하지 않습니다.
- 구현 전에 계획을 문서로 남기고, 구현 후 검증 결과를 README 또는 제출 문서에 남깁니다.
- `.env.local`, SQLite DB, 가상환경, 빌드 산출물은 커밋하지 않고 `.env.example`만 공유합니다.

## 3차 과제 구조

- `task3/frontend`: Next.js App Router, TypeScript, Tailwind CSS
- `task3/backend`: FastAPI, SQLAlchemy, SQLite, Pydantic
- 데이터 CRUD와 저장은 백엔드가 담당하고, UI 상태와 라우팅은 프론트엔드가 담당합니다.
- 필터, 검색, 날짜 선택처럼 공유 가능한 상태는 URL 파라미터로 관리합니다.

## 검증 기준

- 백엔드: FastAPI 앱 import, CRUD API 스모크 테스트
- 프론트엔드: ESLint, production build
- 기능: 생성, 조회, 수정, 완료 토글, 삭제, 날짜 이동, 필터, 검색 흐름 확인
