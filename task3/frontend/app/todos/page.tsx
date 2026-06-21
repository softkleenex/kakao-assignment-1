import Link from "next/link";
import { getTodos, normalizeTodoFilter } from "../lib/api";
import {
  getMondayOfDateString,
  getSingleParam,
  parseDateParam,
  parseOptionalDateParam,
} from "../lib/date";
import { buildNewTodoHref, type TodoUrlState } from "../lib/url";
import type { RawSearchParams } from "../types";
import DailyHeader from "./_components/DailyHeader";
import EmptyState from "./_components/EmptyState";
import FilterTabs from "./_components/FilterTabs";
import SearchForm from "./_components/SearchForm";
import TodoList from "./_components/TodoList";
import WeeklyCalendar from "./_components/WeeklyCalendar";

type TodosPageProps = {
  searchParams: Promise<RawSearchParams>;
};

function buildState(params: RawSearchParams): TodoUrlState {
  const date = parseDateParam(params.date);
  const weekStartDate = parseOptionalDateParam(params.weekStart) ?? getMondayOfDateString(date);
  const filter = normalizeTodoFilter(getSingleParam(params.filter));
  const search = getSingleParam(params.search)?.trim() ?? "";

  return { date, weekStartDate, filter, search };
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const state = buildState(await searchParams);
  const [todos, allTodos] = await Promise.all([
    getTodos({
      date: state.date,
      filter: state.filter,
      search: state.search,
    }),
    getTodos(),
  ]);
  const totalCountForDate = allTodos.filter((todo) => todo.date === state.date).length;

  return (
    <div className="min-h-screen bg-bg-light px-4 py-10">
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-5">
        <header className="flex items-start justify-between gap-4 px-1">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Week 3 · Next.js + FastAPI
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
              Minimalist Tasks
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              서버에 저장되는 오늘의 할 일을 관리해보세요.
            </p>
          </div>
          <Link
            href={buildNewTodoHref(state)}
            className="shrink-0 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary-hover"
          >
            + 추가
          </Link>
        </header>

        <WeeklyCalendar state={state} todos={allTodos} />

        <main className="flex flex-col gap-5 rounded-3xl border border-black/5 bg-card-light p-6 shadow-lg md:p-7">
          <DailyHeader state={state} />

          <div className="flex flex-col gap-4">
            <FilterTabs state={state} />
            <SearchForm state={state} />
          </div>

          {todos.length > 0 ? (
            <TodoList todos={todos} state={state} />
          ) : (
            <EmptyState
              filter={state.filter}
              totalCountForDate={totalCountForDate}
              search={state.search}
            />
          )}
        </main>
      </div>
    </div>
  );
}
