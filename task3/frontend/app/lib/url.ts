import type { TodoFilter } from "../types";

export type TodoUrlState = {
  date: string;
  weekStartDate: string;
  filter: TodoFilter;
  search: string;
};

export function buildTodosHref(
  state: TodoUrlState,
  overrides: Partial<TodoUrlState> = {},
) {
  const nextState = { ...state, ...overrides };
  const params = new URLSearchParams();

  params.set("date", nextState.date);
  params.set("weekStart", nextState.weekStartDate);

  if (nextState.filter !== "all") {
    params.set("filter", nextState.filter);
  }

  if (nextState.search.trim()) {
    params.set("search", nextState.search.trim());
  }

  const query = params.toString();
  return query ? `/todos?${query}` : "/todos";
}

export function buildNewTodoHref(state: TodoUrlState) {
  const params = new URLSearchParams(buildTodosHref(state).split("?")[1]);
  return `/todos/new?${params.toString()}`;
}

export function buildEditTodoHref(todoId: number, state: TodoUrlState) {
  const params = new URLSearchParams();
  params.set("date", state.date);
  params.set("weekStart", state.weekStartDate);
  params.set("returnTo", buildTodosHref(state));

  if (state.filter !== "all") {
    params.set("filter", state.filter);
  }

  if (state.search.trim()) {
    params.set("search", state.search.trim());
  }

  return `/todos/${todoId}?${params.toString()}`;
}

export function isSafeTodosPath(value: string) {
  return value.startsWith("/todos") && !value.startsWith("//");
}
