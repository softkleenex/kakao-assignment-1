# ⚡ Kakao Tech Campus — Todo Web App Refactoring Journey

> **Vanilla JS ➔ React ➔ Next.js**로 점진적으로 고도화되는 3주간의 생산성 Todo 애플리케이션 개발 여정입니다.

---

## 📅 과제 대시보드 (Assignment Dashboard)

| 주차 | 주제 | 적용 기술 | 진행 상태 | 주요 링크 |
| :--- | :--- | :--- | :---: | :--- |
| **Week 1** | **Vanilla JS Todo** | HTML, CSS, JS, LocalStorage, Vite | 🟢 **완료 (제출 완료)** | [📁 코드 보기](./task1/) • [🌿 브랜치](https://github.com/softkleenex/kakao-assignment-1/tree/week-01-softkleenex) • [💬 제출 이슈](https://github.com/softkleenex/kakao-assignment-1/issues/1) |
| **Week 2** | **React Refactoring** | React, CSS Modules, State Management | 🟡 *대기 중* | — |
| **Week 3** | **Next.js Fullstack** | Next.js, Server Components, API | 🔴 *대기 중* | — |

---

## 🎨 기술 스택의 진화 (Tech Stack Evolution)

```mermaid
graph LR
    A[Week 1: Vanilla JS] --> B[Week 2: React]
    B --> C[Week 3: Next.js]
    
    style A fill:#f1e05a,stroke:#333,stroke-width:2px,color:#000
    style B fill:#61dafb,stroke:#333,stroke-width:2px,color:#000
    style C fill:#000,stroke:#fff,stroke-width:2px,color:#fff
```

---

## 📂 프로젝트 구조 (Project Folder Structure)

```markdown
kakao-assignment-1/
├── .gitignore               # 프로젝트 전역 Git 제외 파일 설정
├── README.md                # 전체 리포지토리 대시보드 (현재 파일)
└── task1/                   # [Week 1] Vanilla JS Todo 앱
    ├── index.html           # 앱 레이아웃 및 뼈대 구조
    ├── style.css            # 미니멀 보랏빛 테마 CSS 스타일시트
    ├── app.js               # 일간/주간 뷰 및 CRUD 비즈니스 로직
    ├── package.json         # Vite 빌드 도구 및 스크립트 정의
    └── .gitignore           # task1 전용 빌드 파일 제외 설정
```

---

## 🛠️ 실행 및 개발 방법 (Getting Started)

각 주차별 과제는 독립된 서브디렉토리 내에서 Vite 빌드 환경으로 구성되어 있습니다.

### 1. 저장소 클론 및 폴더 이동
```bash
git clone https://github.com/softkleenex/kakao-assignment-1.git
cd kakao-assignment-1/task1  # 실행하려는 주차 폴더로 이동
```

### 2. 패키지 설치 및 로컬 서버 실행
```bash
npm install
npm run dev
```
로컬 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속하여 결과를 확인하실 수 있습니다.

---

## 💜 Developer Profile

- **Developer**: softkleenex (isangjae)
- **Goal**: 단순히 동작하는 코드를 넘어, 사용자 중심의 뛰어난 인터랙션과 유지보수가 용이한 아키텍처를 설계하는 프론트엔드 엔지니어로 성장하기
