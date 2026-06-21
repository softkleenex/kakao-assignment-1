import Link from "next/link";
import type { TodoFilter } from "../../types";
import { buildTodosHref, type TodoUrlState } from "../../lib/url";

type FilterTabsProps = {
  state: TodoUrlState;
};

const tabs: { key: TodoFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행 중" },
  { key: "completed", label: "완료" },
];

export default function FilterTabs({ state }: FilterTabsProps) {
  return (
    <div className="flex w-full self-start rounded-xl border border-black/5 bg-bg-light p-1 sm:w-auto">
      {tabs.map((tab) => {
        const isActive = state.filter === tab.key;

        return (
          <Link
            key={tab.key}
            href={buildTodosHref(state, { filter: tab.key })}
            className={`flex-1 rounded-lg px-5 py-2 text-center text-xs font-semibold transition sm:flex-initial ${
              isActive
                ? "border border-black/[0.03] bg-card-light font-bold text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
