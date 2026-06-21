import Link from "next/link";
import type { Todo } from "../../types";
import { buildEditTodoHref, type TodoUrlState } from "../../lib/url";
import TodoActions from "./TodoActions";

type TodoListProps = {
  todos: Todo[];
  state: TodoUrlState;
};

export default function TodoList({ todos, state }: TodoListProps) {
  return (
    <ul className="flex w-full flex-col gap-2.5">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-card-light p-4 shadow-sm transition ${
            todo.completed ? "bg-bg-light/60 opacity-75" : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  todo.completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-black/15 text-transparent"
                }`}
                aria-hidden="true"
              >
                ✓
              </span>
              <span
                className={`truncate text-sm font-semibold text-text-primary ${
                  todo.completed ? "font-normal text-text-muted line-through" : ""
                }`}
                title={todo.text}
              >
                {todo.text}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 pl-8">
              <span className="text-xs font-medium text-text-muted">{todo.date}</span>
              <Link
                href={buildEditTodoHref(todo.id, state)}
                className="text-xs font-bold text-primary transition hover:text-primary-hover"
              >
                수정
              </Link>
            </div>
          </div>

          <TodoActions todo={todo} />
        </li>
      ))}
    </ul>
  );
}
