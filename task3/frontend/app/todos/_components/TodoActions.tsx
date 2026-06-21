"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Todo } from "../../types";

type TodoActionsProps = {
  todo: Todo;
};

export default function TodoActions({ todo }: TodoActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const runRequest = (request: () => Promise<Response>) => {
    setError("");
    startTransition(() => {
      void (async () => {
        let response: Response;

        try {
          response = await request();
        } catch {
          setError("서버에 연결하지 못했습니다.");
          return;
        }

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as { message?: string } | null;
          setError(body?.message ?? "요청 처리에 실패했습니다.");
          return;
        }

        router.refresh();
      })();
    });
  };

  const handleToggle = () => {
    runRequest(() =>
      fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      }),
    );
  };

  const handleDelete = () => {
    runRequest(() => fetch(`/api/todos/${todo.id}`, { method: "DELETE" }));
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className="rounded-lg px-2 py-1.5 text-xs font-bold text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {todo.completed ? "되돌리기" : "완료"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg px-2 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          삭제
        </button>
      </div>
      {error && <p className="max-w-40 text-right text-[0.7rem] font-semibold text-red-500">{error}</p>}
    </div>
  );
}
