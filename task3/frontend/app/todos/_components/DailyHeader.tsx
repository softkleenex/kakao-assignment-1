import Link from "next/link";
import {
  addDaysToDateString,
  formatDateToKoreanString,
  getMondayOfDateString,
  getTodayString,
} from "../../lib/date";
import { buildTodosHref, type TodoUrlState } from "../../lib/url";

type DailyHeaderProps = {
  state: TodoUrlState;
};

export default function DailyHeader({ state }: DailyHeaderProps) {
  const previousDate = addDaysToDateString(state.date, -1);
  const nextDate = addDaysToDateString(state.date, 1);
  const today = getTodayString();

  return (
    <div className="flex items-center justify-between border-b border-black/5 pb-4">
      <Link
        href={buildTodosHref(state, {
          date: previousDate,
          weekStartDate: getMondayOfDateString(previousDate),
        })}
        className="rounded-lg p-2 text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
        aria-label="이전 날짜"
      >
        ←
      </Link>

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <span className="text-base font-bold tracking-tight text-text-primary">
          {formatDateToKoreanString(state.date)}
        </span>
        <Link
          href={buildTodosHref(state, {
            date: today,
            weekStartDate: getMondayOfDateString(today),
          })}
          className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          오늘로 이동
        </Link>
      </div>

      <Link
        href={buildTodosHref(state, {
          date: nextDate,
          weekStartDate: getMondayOfDateString(nextDate),
        })}
        className="rounded-lg p-2 text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
        aria-label="다음 날짜"
      >
        →
      </Link>
    </div>
  );
}
