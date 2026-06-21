import type { TodoFilter } from "../../types";

type EmptyStateProps = {
  filter: TodoFilter;
  totalCountForDate: number;
  search: string;
};

export default function EmptyState({ filter, totalCountForDate, search }: EmptyStateProps) {
  const message = (() => {
    if (search) {
      return `"${search}"에 일치하는 할 일이 없습니다.`;
    }

    if (totalCountForDate === 0) {
      return "이 날짜에 계획된 할 일이 없습니다. 새로운 계획을 추가해보세요.";
    }

    if (filter === "active") {
      return "이 날짜의 진행 중인 할 일이 없습니다. 전부 끝냈어요!";
    }

    if (filter === "completed") {
      return "이 날짜에 완료된 할 일이 없습니다.";
    }

    return "조건에 일치하는 할 일이 없습니다.";
  })();

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-2xl">
        ✓
      </div>
      <p className="max-w-sm text-sm font-semibold leading-relaxed text-text-secondary">{message}</p>
    </div>
  );
}
