import Link from "next/link";
import { buildTodosHref, type TodoUrlState } from "../../lib/url";

type SearchFormProps = {
  state: TodoUrlState;
};

export default function SearchForm({ state }: SearchFormProps) {
  return (
    <form action="/todos" method="get" className="flex w-full flex-col gap-2 sm:flex-row">
      <input type="hidden" name="date" value={state.date} />
      <input type="hidden" name="weekStart" value={state.weekStartDate} />
      {state.filter !== "all" && <input type="hidden" name="filter" value={state.filter} />}

      <input
        type="search"
        name="search"
        defaultValue={state.search}
        placeholder="서버에서 Todo 검색..."
        className="min-w-0 flex-1 rounded-xl border border-black/10 bg-bg-light px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary-hover"
        >
          검색
        </button>
        {state.search && (
          <Link
            href={buildTodosHref(state, { search: "" })}
            className="rounded-xl border border-black/10 px-4 py-3 text-sm font-bold text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
          >
            초기화
          </Link>
        )}
      </div>
    </form>
  );
}
