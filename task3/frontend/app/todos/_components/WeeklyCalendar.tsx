import Link from "next/link";
import type { Todo } from "../../types";
import {
  addDaysToDateString,
  dateStringToDate,
  formatWeekTitle,
  getDayName,
  getMondayOfDateString,
  getTodayString,
  getWeekDays,
} from "../../lib/date";
import { buildTodosHref, type TodoUrlState } from "../../lib/url";

type WeeklyCalendarProps = {
  state: TodoUrlState;
  todos: Todo[];
};

export default function WeeklyCalendar({ state, todos }: WeeklyCalendarProps) {
  const days = getWeekDays(state.weekStartDate);
  const today = getTodayString();
  const previousWeekStart = addDaysToDateString(state.weekStartDate, -7);
  const nextWeekStart = addDaysToDateString(state.weekStartDate, 7);

  return (
    <section className="rounded-2xl border border-black/5 bg-card-light p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between px-1">
        <Link
          href={buildTodosHref(state, {
            date: previousWeekStart,
            weekStartDate: previousWeekStart,
          })}
          className="rounded-lg p-2 text-text-secondary transition hover:bg-primary-light hover:text-primary"
          aria-label="이전 주"
        >
          ←
        </Link>
        <span className="text-base font-bold tracking-wide text-text-primary">
          {formatWeekTitle(state.weekStartDate)}
        </span>
        <Link
          href={buildTodosHref(state, {
            date: nextWeekStart,
            weekStartDate: nextWeekStart,
          })}
          className="rounded-lg p-2 text-text-secondary transition hover:bg-primary-light hover:text-primary"
          aria-label="다음 주"
        >
          →
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dateString) => {
          const taskCount = todos.filter((todo) => todo.date === dateString).length;
          const isSelected = dateString === state.date;
          const isToday = dateString === today;
          const dayIndex = dateStringToDate(dateString).getDay();
          const dayNameColor =
            !isSelected && dayIndex === 6
              ? "text-blue-500"
              : !isSelected && dayIndex === 0
                ? "text-red-500"
                : isSelected
                  ? "text-white/80"
                  : "text-text-secondary";

          return (
            <Link
              key={dateString}
              href={buildTodosHref(state, {
                date: dateString,
                weekStartDate: getMondayOfDateString(dateString),
              })}
              className={`relative flex aspect-[4/5] select-none flex-col items-center justify-center gap-1 rounded-xl px-1 py-3 transition ${
                isSelected
                  ? "bg-primary font-medium text-white shadow-lg shadow-primary/25"
                  : "text-text-primary hover:bg-black/5"
              } ${isToday && !isSelected ? "border border-primary/40" : ""}`}
            >
              <span className={`text-[0.7rem] font-semibold tracking-wider ${dayNameColor}`}>
                {getDayName(dateString)}
              </span>
              <span className="text-sm font-bold">{dateStringToDate(dateString).getDate()}</span>
              <span
                className={`mt-0.5 rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${
                  taskCount > 0
                    ? isSelected
                      ? "bg-white/20 text-white"
                      : "bg-primary-light text-primary"
                    : isSelected
                      ? "bg-white/10 text-white/50"
                      : "bg-black/5 text-text-muted"
                }`}
              >
                {taskCount}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
