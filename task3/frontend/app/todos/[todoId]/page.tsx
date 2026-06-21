import Link from "next/link";
import { notFound } from "next/navigation";
import { updateTodo } from "../../actions";
import { BackendRequestError, getTodo, normalizeTodoFilter } from "../../lib/api";
import {
  getMondayOfDateString,
  getSingleParam,
  parseDateParam,
  parseOptionalDateParam,
} from "../../lib/date";
import { buildTodosHref, isSafeTodosPath, type TodoUrlState } from "../../lib/url";
import type { RawSearchParams } from "../../types";
import TodoEditorForm from "../_components/TodoEditorForm";

type EditTodoPageProps = {
  params: Promise<{ todoId: string }>;
  searchParams: Promise<RawSearchParams>;
};

function buildState(params: RawSearchParams, fallbackDate: string): TodoUrlState {
  const date = parseDateParam(params.date ?? fallbackDate);
  return {
    date,
    weekStartDate: parseOptionalDateParam(params.weekStart) ?? getMondayOfDateString(date),
    filter: normalizeTodoFilter(getSingleParam(params.filter)),
    search: getSingleParam(params.search)?.trim() ?? "",
  };
}

export default async function EditTodoPage({ params, searchParams }: EditTodoPageProps) {
  const todoId = Number((await params).todoId);

  if (!Number.isInteger(todoId)) {
    notFound();
  }

  let todo;
  try {
    todo = await getTodo(todoId);
  } catch (error) {
    if (error instanceof BackendRequestError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const rawParams = await searchParams;
  const state = buildState(rawParams, todo.date);
  const error = getSingleParam(rawParams.error);
  const returnToParam = getSingleParam(rawParams.returnTo);
  const returnTo = returnToParam && isSafeTodosPath(returnToParam) ? returnToParam : buildTodosHref(state);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-light px-4 py-10">
      <main className="w-full max-w-lg rounded-3xl border border-black/5 bg-card-light p-7 shadow-lg">
        <Link
          href={returnTo}
          className="mb-6 inline-flex text-sm font-bold text-primary transition hover:text-primary-hover"
        >
          ← 목록으로
        </Link>
        <h1 className="mb-2 text-2xl font-extrabold text-text-primary">Todo 수정하기</h1>
        <p className="mb-6 text-sm text-text-secondary">
          내용이나 날짜를 바꾸면 서버 DB에 바로 반영됩니다.
        </p>
        <TodoEditorForm
          action={updateTodo}
          state={state}
          submitLabel="수정 저장"
          defaultText={todo.text}
          defaultDate={todo.date}
          todoId={todo.id}
          error={error}
          returnTo={returnTo}
        />
      </main>
    </div>
  );
}
