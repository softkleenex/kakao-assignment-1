# 2차 과제 - React로 Todo 앱 만들기

- **한 줄 소개** : Vanilla JS로 제작한 Todo 앱을 React Function Component 구조로 변환하는 과제예요.
- **최종 프로젝트 바로가기** : [GitHub Repo](https://github.com/elice-ai-training/kakaotech.campus_assignment2)
- **과제 목표** :
    - 컴포넌트 단위로 UI를 분리하고, props와 state의 역할을 이해하기
    - AI를 활용해 마이그레이션하고, 생성된 코드를 직접 읽고 수정하기
    - 에러 메시지를 AI와 함께 분석하고 해결하는 디버깅 흐름을 익히기
    - Vanilla JS와 React 개발 방식의 차이 이해하기
- **제출 일정** : 6/10(수) 23:59까지

---

# 개발 가이드

### 활용 스택
- React (v18+), Vite (v5.x), Tailwind CSS(v4.x), JavaScript
- Web Storage API (localStorage)

### 과제 준비
- 과제를 하며 사용할 AI 도구(Claude, ChatGPT 등) 계정이 필요해요. 어떤 툴을 사용하더라도 상관없습니다.

### 과제 진행 순서
모든 기능은 아래 흐름으로 진행해요. 
1. Vite와 Tailwind를 직접 세팅해요.
2. AI에게 기능 단위로 React로의 마이그레이션을 요청해요.
3. 브라우저에서 직접 열어 의도한 대로 동작하는지 확인해요.
4. 원하는 대로 동작하지 않거나 개선하고 싶은 부분은 AI에게 추가로 요청해요.
5. 다음 문서를 확인하고, **Issue 템플릿에 맞추어** 기능 단위 별로 진행한 태스크를 기록하며 진행해요.
   👉 **Issue 템플릿 확인하러 가기**

---

# 기본 미션
이번 과제에서 **반드시** 진행해야 하는 항목이예요. 아래의 순서대로 하나씩 진행해봅시다.

### 0. 전체 구조 잡기
- Vite로 React 프로젝트를 생성하고, Tailwind CSS (v4)를 설치해요.
- 파일 구조를 `src/components/` 기준으로 직접 생성해요.
- AI에게 1차 과제 코드와 마이그레이션 맥락을 전달해요.
  - 포맷을 참고하고 싶다면, 1차 과제를 확인해보세요!

> 💡 **시작 전 생각해보기**
> 1차 과제의 `app.js`에서 어떤 기능들이 있었는지 먼저 정리해보세요. AI에게 전달할 때 내가 구현할 기능의 범위를 직접 설명할 수 있어야 해요.

### 1. 프로젝트 세팅하기
Vite를 사용해 간단히 React 프로젝트를 구성하고, `localhost:5173`에 접속하여 화면을 확인해봅니다.

* **`Vite`로 프로젝트 생성 시 옵션 확인하기**
  터미널에 아래의 커맨드를 입력한 후, 프로젝트 구성 옵션을 차근차근 선택해봅니다.
  ```bash
  # 1. Vite로 React 프로젝트 생성
  npm create vite@latest assignment-2 -- --template react
  
  # 2. 프로젝트 폴더로 이동
  cd my-project
  
  # 3. 의존성 설치
  npm install
  
  # 4. 개발 서버 실행
  npm run dev
  # → 브라우저에서 localhost(ex. http://localhost:5173) 접속
  ```

> 🔎 **확인 포인트**
> - `localhost:5173`에 접속했을때 화면이 보인다면 성공입니다!
> - 터미널에서 프로젝트 폴더로 이동한 후 `npm run dev` 커맨드를 실행해도 위와 동일한 화면을 확인할 수 있어요.

### 2. Todo CRUD (Create, Read, Update, Delete) 기능 마이그레이션하기

> 💡 **시작 전 생각해보기**
> 1차 과제에서 `prompt()`로 처리했던 수정 기능을 React에서는 어떻게 구현할 수 있을지 먼저 생각해보세요.

- 텍스트 입력창과 추가 버튼으로 새로운 Todo를 생성할 수 있어요.
- 입력값이 비어있는 경우 Todo가 생성되지 않고, 사용자에게 안내 메시지를 표시해요.
- 생성된 Todo는 목록 형태로 화면에 표시돼요.
- 각 Todo 항목은 수정 / 완료 처리 / 삭제가 가능해요.
- 완료 처리된 Todo는 시각적으로 구분돼요 (ex. 텍스트에 취소선 표시).
- `prompt()` 대신 인라인 입력창으로 수정 UI를 구현해요.

> 🔎 **확인 포인트**
> Todo 생성 → 수정 → 완료 → 삭제 전체 흐름이 순서대로 잘 동작하는지 확인해보세요.
> - `isEditing` 상태가 바뀌면 화면이 어떻게 달라지나요?
>   - 여러분이 작성한 코드에 따라 변수명은 `isEditing`과 다를 수 있어요!
> - `useState`가 어디에 선언되어 있고, 어떤 값을 관리하고 있나요?

> 📝 **1차 과제와 비교해보세요**
> Vanilla JS에서는 `prompt()`로 팝업을 띄웠지만, React에서는 `isEditing` 상태 하나로 UI가 자동으로 전환돼요.

### 3. 상태별 필터링 기능 마이그레이션하기

> 💡 **시작 전 생각해보기**
> 1차 과제에서 필터링은 DOM을 직접 숨기고 보여주는 방식이었어요. React에서는 어떤 방식으로 같은 결과를 만들 수 있을지 생각해보세요.

- 전체 / 진행 중 / 완료 필터 탭을 통해 원하는 Todo만 볼 수 있어요.
- 현재 선택된 필터 탭은 시각적으로 구분돼요.
- 필터 상태는 `useState`로 관리하고, 탭 전환 후 새 Todo를 추가해도 필터가 유지돼요.

> 🔎 **확인 포인트**
> 각 탭을 클릭했을 때 해당 상태의 Todo만 표시되는지, 탭 전환 후 새 Todo를 추가했을 때도 필터가 유지되는지 확인해요.
> - 필터 상태가 바뀌면 TodoList는 어떻게 다시 그려지나요?

> 📝 **1차 과제와 비교해보세요**
> Vanilla JS에서는 `querySelectorAll`로 DOM을 직접 찾아 숨기고 보여줬어요. React에서는 필터 상태만 바꾸면 목록이 자동으로 다시 그려요.

### 4. Todo 일간 뷰 마이그레이션하기

> 💡 **시작 전 생각해보기**
> 선택된 날짜가 바뀌면 Todo 목록도 함께 바뀌어야 해요. 이 두 가지가 어떻게 연결되어야 할지 생각해보세요.

- 화면에 오늘 날짜가 표시되고, 이전 / 다음 날짜로 이동할 수 있어요.
- 선택된 날짜에 해당하는 Todo만 표시돼요.
- Todo를 생성하면 현재 선택된 날짜가 자동으로 저장돼요.
- 선택된 날짜 상태는 `useState`로 관리해요.

> 🔎 **확인 포인트**
> 날짜를 이동했을 때 해당 날짜의 Todo만 표시되는지, 다른 날짜에 Todo를 추가한 뒤 날짜를 이동해도 각각 따로 관리되는지 확인해요.
> - Todo에 날짜가 어떤 형태로 저장되어 있나요?

### 5. 로컬 스토리지 연동 마이그레이션하기

> 💡 **시작 전 생각해보기**
> 1차 과제에서는 추가, 수정, 삭제 함수마다 저장 로직을 직접 호출했어요. React에서는 이걸 어떻게 한 곳에서 처리할 수 있을지 생각해보세요.

- Todo의 변경사항은 항상 로컬스토리지에 저장돼요.
- 새로고침 후에도 기존 데이터가 유지돼요.
- 데이터는 JSON 형태로 저장하고 불러와요 (`JSON.stringify` / `JSON.parse`).
- `useEffect`를 활용해 todos 변경 시 자동으로 저장해요.

> 🔎 **확인 포인트**
> Todo를 추가한 뒤 새로고침해서 데이터가 유지되는지 확인해요. 브라우저 개발자 도구(F12) → Application → Local Storage 에서 데이터가 실제로 저장되어 있는지도 눈으로 직접 확인해봅니다.
> - `useEffect`의 의존성 배열에 무엇이 들어있나요? 왜 그 값이 들어가야 하나요?

> 📝 **1차 과제와 비교해보세요**
> Vanilla JS에서는 추가, 삭제, 수정 함수마다 `localStorage.setItem()`을 직접 호출했어요. React에서는 `useEffect` 하나로 todos가 바뀔 때마다 자동으로 저장돼요.

---

# 도전 미션
필수 미션을 모두 클리어했다면, 조금 더 심화된 미션을 진행해봅니다. 도전 미션은 진행하지 않아도 괜찮습니다.

### 1. Todo 주간 뷰 마이그레이션하기

> 💡 **시작 전 생각해보기**
> 주간 뷰에서 날짜를 클릭하면 일간 뷰의 선택된 날짜와 연결되어야 해요. 두 상태가 어떻게 연결될 수 있을지 먼저 생각해보세요.

- 이번 주 날짜 목록을 표시하고, 날짜를 선택하면 해당 날짜의 Todo만 볼 수 있어요.
- 이전 주차 / 다음 주차로 넘길 수 있는 버튼이 있어요.
- 각 날짜 아래에 해당 날짜의 Todo 개수를 표시해요.
- 오늘 날짜는 시각적으로 구분되는 스타일을 적용해요.
- 주간 뷰 상태(`weekStartDate`)는 `useState`로 관리하고, 새로고침 후에도 유지돼요.
  - 여러분이 작성한 코드에 따라 변수명은 `weekStartDate`과 다를 수 있어요!

> 🔎 **확인 포인트**
> 주간 뷰에서 날짜를 클릭했을 때 일간 뷰와 동일하게 해당 날짜의 Todo만 표시되는지, 주차를 이동했을 때 날짜 목록과 Todo 개수가 올바르게 업데이트되는지 확인해요.
> - 새로고침 후에도 선택한 주차가 유지되나요?

---

# 트러블 슈팅
트러블 슈팅이란 개발 중 발생하는 오류나 예상치 못한 동작의 원인을 찾고 해결하는 과정이에요. 코드를 작성하다 보면 에러가 발생하거나 의도한 대로 동작하지 않는 상황은 매우 자연스러운 일이에요. 중요한 건 당황하지 않고 원인을 찾아가는 과정을 경험하는 거예요.

### React에서 자주 발생하는 에러

**① Tailwind 라이브러리가 적용되지 않는 경우**
Tailwind가 설치되지 않았을 수 있어요. Tailwind를 설치한 후 VSCode를 새로고침해보세요!

* **Tailwind 설치 및 설정하기**
  ```bash
  # 아래의 커맨드를 활용해 Tailwind CSS v4와 Vite 플러그인 설치해주세요
  npm install -D tailwindcss @tailwindcss/vite
  ```

  ```javascript
  // vite.config.js
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  
  export default defineConfig({
    plugins: [
      tailwindcss(),
      react(),
    ],
  });
  ```

  ```css
  /* src/index.css */
  @import "tailwindcss";
  ```

**② Each child in a list should have a unique "key" prop**

> ⚠️ Warning: Each child in a list should have a unique "key" prop.

위와 같은 에러는 `map()`으로 리스트를 렌더링할 때 각 항목에 고유한 `key` prop이 없으면 발생해요. React가 어떤 항목이 변경됐는지 추적하지 못해요.
```jsx
{todos.map(todo => (
  // index 대신 고유한 id를 key로 사용해요
  <TodoItem key={todo.id} todo={todo} />
))}
```

**③ Too many re-renders**

> ⚠️ Too many re-renders. React limits the number of renders to prevent an infinite loop.

이벤트 핸들러에 함수를 즉시 호출하면 렌더링 중에 상태가 변경되어 무한 루프가 발생해요.
```jsx
// ❌ 잘못된 방법 — 렌더링 시 즉시 실행됨
<button onClick={handleDelete(todo.id)}>삭제</button>

// ✅ 올바른 방법 — 클릭 시에만 실행됨
<button onClick={() => handleDelete(todo.id)}>삭제</button>
```

**④ 새로고침하면 데이터가 사라져요**
`useEffect`의 의존성 배열이 잘못 설정되어 있거나, 초기값을 `localStorage`에서 불러오지 않고 있는 경우예요.
```jsx
// 초기값을 localStorage에서 불러오기
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});

// todos가 바뀔 때마다 자동 저장
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]); // 의존성 배열에 todos 추가
```

> 💡 **함수형 초기화 방식에 대해서 알아보고 넘어갑시다!**
> `useState(초기값)`과 같이 바로 값을 전달하는 형태가 아닌, `useState(() => 초기값)`처럼 함수를 전달하는 방식이에요.
> ```jsx
> // 일반 초기화 - 렌더링마다 localStorage.getItem() 실행됨
> const [todos, setTodos] = useState(localStorage.getItem('todos'));
> 
> // 함수형 초기화 - 최초 마운트 시 딱 한 번만 실행됨
> const [todos, setTodos] = useState(() => {
>   const saved = localStorage.getItem('todos');
>   return saved ? JSON.parse(saved) : [];
> });
> ```
> `localStorage` 접근이나 JSON 파싱처럼 **비용이 큰 작업**을 초기값으로 쓸 때, 일반 초기화는 리렌더링마다 불필요하게 실행되지만 함수형 초기화는 **컴포넌트가 처음 생성될 때만 실행**되어 성능상 유리합니다.

**⑤ Cannot read properties of undefined**

> ⚠️ TypeError: Cannot read properties of undefined (reading 'map')

props로 전달받은 값이 `undefined`인 상태에서 사용하려 할 때 발생해요. 주로 상위 컴포넌트에서 props를 빠뜨렸거나 초기값이 설정되지 않은 경우예요.
```jsx
// props 기본값 설정
function TodoList({ todos = [] }) { ... }

// 또는 상위 컴포넌트에서 props 전달 확인
<TodoList todos={todos} /> // todos가 빠져있지 않은지 확인
```

### AI와 함께 디버깅하는 방법
에러가 발생했을 때 AI에게 막연하게 "안 돼요"라고 하면 정확한 답을 받기 어려워요. 아래 단계를 따라 AI에게 정확한 맥락을 전달해보세요.

1. **브라우저 콘솔에서 에러 메시지 확인하기**
   브라우저에서 마우스 우클릭 → 검사 → Console 탭을 확인해요. 빨간색 에러 메시지 전체를 복사해두세요. 에러 메시지 오른쪽의 파일명과 줄 번호도 함께 확인해요.
2. **에러가 발생한 파일 확인하기**
   에러 메시지의 파일명과 줄 번호를 참고해 해당 코드를 찾아요. 에러가 발생한 컴포넌트 파일 전체를 복사해두세요.
3. **AI에게 에러 메시지 + 코드를 함께 전달하기**
   에러 메시지만 전달하면 AI가 코드를 모르는 상태에서 일반적인 답변만 해줘요. 반드시 에러 메시지와 관련된 코드를 함께 전달하세요.
4. **AI의 답변을 이해하고 직접 수정하기**
   AI가 수정된 코드를 제시하더라도 바로 붙여넣지 말고, 왜 그렇게 수정해야 하는지 이해한 뒤에 적용해요. 이해가 되지 않으면 AI에게 추가로 설명을 요청하세요.

> 💬 **AI 디버깅 템플릿**
> ```jsx
> 아래 에러가 발생했어. 현재 코드를 보고 원인과 해결 방법을 알려줘.
> 
> [에러 메시지]
> 에러 메시지 붙여넣기
> 
> [에러 발생 파일 - 파일명.jsx]
> 코드 붙여넣기
> 
> [현재 상황]
> 어떤 동작을 했을 때 에러가 발생하는지 설명하기
> ```

---

# 제출 전 최종 체크리스트
최종 제출 전에, 다음 체크리스트를 활용하여 빠진 것은 없는지 확인해봅시다.

### 기능 구현
- [ ] 필수 기능이 모두 구현되어 있다
- [ ] 필요에 따라, README.md에 구현한 기능에 대한 설명을 작성했다
- [ ] 예외 상황에서도 오류 없이 동작한다 (ex. 빈 입력값 제출, 데이터 없는 상태 등)
- [ ] 새로고침 후에도 데이터가 유지되거나 의도한 대로 초기화된다

### 코드 품질
- [ ] 불필요한 `console.log`, 주석 처리된 사용하지 않는 코드가 제거되어 있다
- [ ] 변수명과 함수명이 역할을 명확히 나타낸다
- [ ] 중복 코드가 없고, 반복되는 로직은 함수로 분리되어 있다
- [ ] 들여쓰기와 코드 포맷이 일관되게 유지되어 있다

### UI/UX
- [ ] 모든 기능이 UI 상에서 명확하게 인지 가능하다
- [ ] 빈 상태(데이터 없음)에 대한 화면 처리가 되어 있다

### 브라우저 검증
- [ ] 크롬 기준 콘솔에 에러가 없다
- [ ] 주요 기능을 직접 클릭하며 E2E 흐름을 확인했다

### 프로젝트 구조
- [ ] 파일과 폴더 구조가 정리되어 있다
- [ ] 불필요한 파일이 포함되어 있지 않다 (ex. node_modules, .DS_Store 등)
