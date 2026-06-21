import Link from "next/link";
import { createTodo } from "../../actions";
import {
  getMondayOfDateString,
  getSingleParam,
  parseDateParam,
  parseOptionalDateParam,
} from "../../lib/date";
import { buildTodosHref, type TodoUrlState } from "../../lib/url";
import { normalizeTodoFilter } from "../../lib/api";
import type { RawSearchParams } from "../../types";
import TodoEditorForm from "../_components/TodoEditorForm";

type NewTodoPageProps = {
  searchParams: Promise<RawSearchParams>;
};

function buildState(params: RawSearchParams): TodoUrlState {
  const date = parseDateParam(params.date);
  return {
    date,
    weekStartDate: parseOptionalDateParam(params.weekStart) ?? getMondayOfDateString(date),
    filter: normalizeTodoFilter(getSingleParam(params.filter)),
    search: getSingleParam(params.search)?.trim() ?? "",
  };
}

export default async function NewTodoPage({ searchParams }: NewTodoPageProps) {
  const params = await searchParams;
  const state = buildState(params);
  const error = getSingleParam(params.error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-light px-4 py-10">
      <main className="w-full max-w-lg rounded-3xl border border-black/5 bg-card-light p-7 shadow-lg">
        <Link
          href={buildTodosHref(state)}
          className="mb-6 inline-flex text-sm font-bold text-primary transition hover:text-primary-hover"
        >
          ← 목록으로
        </Link>
        <h1 className="mb-2 text-2xl font-extrabold text-text-primary">새 Todo 만들기</h1>
        <p className="mb-6 text-sm text-text-secondary">
          선택한 날짜에 저장할 할 일을 입력하세요.
        </p>
        <TodoEditorForm
          action={createTodo}
          state={state}
          submitLabel="Todo 추가"
          error={error}
        />
      </main>
    </div>
  );
}
