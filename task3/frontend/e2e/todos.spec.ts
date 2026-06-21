import { expect, request as playwrightRequest, test } from "@playwright/test";

const apiBaseURL = "http://127.0.0.1:18080";

async function resetTodos() {
  const api = await playwrightRequest.newContext({ baseURL: apiBaseURL });

  try {
    const todosResponse = await api.get("/todos");
    expect(todosResponse.ok()).toBeTruthy();

    const todos = (await todosResponse.json()) as { id: number }[];
    for (const todo of todos) {
      await api.delete(`/todos/${todo.id}`);
    }

    const first = await api.post("/todos", {
      data: { text: "Next.js E2E 화면 확인하기", date: "2026-06-21" },
    });
    expect(first.status()).toBe(201);

    const second = await api.post("/todos", {
      data: { text: "FastAPI 검색 결과 검증하기", date: "2026-06-21" },
    });
    expect(second.status()).toBe(201);
    const secondTodo = (await second.json()) as { id: number };

    const completed = await api.put(`/todos/${secondTodo.id}`, {
      data: { completed: true },
    });
    expect(completed.ok()).toBeTruthy();
  } finally {
    await api.dispose();
  }
}

test.beforeEach(async () => {
  await resetTodos();
});

test("can view, create, search, and filter todos through the UI", async ({ page }) => {
  await page.goto("/todos?date=2026-06-21&weekStart=2026-06-15");

  await expect(page.getByRole("heading", { name: "Minimalist Tasks" })).toBeVisible();
  await expect(page.getByText("Next.js E2E 화면 확인하기")).toBeVisible();
  await expect(page.getByText("FastAPI 검색 결과 검증하기")).toBeVisible();

  await page.getByRole("link", { name: "+ 추가" }).click();
  await page.getByLabel("할 일").fill("Playwright로 생성한 Todo");
  await page.getByRole("button", { name: "Todo 추가" }).click();

  await expect(page).toHaveURL(/\/todos\?/);
  await expect(page.getByText("Playwright로 생성한 Todo")).toBeVisible();

  await page.getByPlaceholder("서버에서 Todo 검색...").fill("FastAPI");
  await page.getByRole("button", { name: "검색" }).click();

  await expect(page).toHaveURL(/search=FastAPI/);
  await expect(page.getByText("FastAPI 검색 결과 검증하기")).toBeVisible();
  await expect(page.getByText("Next.js E2E 화면 확인하기")).toBeHidden();

  await page.getByRole("link", { name: "완료" }).click();

  await expect(page).toHaveURL(/filter=completed/);
  await expect(page.getByText("FastAPI 검색 결과 검증하기")).toBeVisible();
  await expect(page.getByRole("button", { name: "되돌리기" })).toBeVisible();
});
