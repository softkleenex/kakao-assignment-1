import type { TodoUrlState } from "../../lib/url";

type TodoEditorFormProps = {
  action: (formData: FormData) => Promise<void>;
  state: TodoUrlState;
  submitLabel: string;
  defaultText?: string;
  defaultDate?: string;
  todoId?: number;
  error?: string;
  returnTo?: string;
};

export default function TodoEditorForm({
  action,
  state,
  submitLabel,
  defaultText = "",
  defaultDate = state.date,
  todoId,
  error,
  returnTo,
}: TodoEditorFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {todoId !== undefined && <input type="hidden" name="todoId" value={todoId} />}
      <input type="hidden" name="filter" value={state.filter} />
      <input type="hidden" name="search" value={state.search} />
      <input type="hidden" name="weekStart" value={state.weekStartDate} />
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}

      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold text-text-primary">할 일</span>
        <input
          name="text"
          type="text"
          defaultValue={defaultText}
          placeholder="할 일을 입력하세요"
          className={`rounded-xl border bg-bg-light px-4 py-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            error ? "border-red-500 ring-2 ring-red-500/10" : "border-black/10"
          }`}
          autoComplete="off"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold text-text-primary">날짜</span>
        <input
          name="date"
          type="date"
          defaultValue={defaultDate}
          className="rounded-xl border border-black/10 bg-bg-light px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

      <button
        type="submit"
        className="rounded-xl bg-primary px-5 py-3 font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary-hover"
      >
        {submitLabel}
      </button>
    </form>
  );
}
