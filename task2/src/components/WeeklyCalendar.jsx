import React from 'react';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeeklyCalendar({
  currentWeekMonday,
  selectedDate,
  todos,
  onSelectDate,
  onNavigateWeek
}) {
  const getDaysOfWeek = () => {
    const days = [];
    const mondayPointer = new Date(currentWeekMonday);
    for (let i = 0; i < 7; i++) {
      const day = new Date(mondayPointer);
      day.setDate(mondayPointer.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getWeekTitle = () => {
    const year = currentWeekMonday.getFullYear();
    const month = currentWeekMonday.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  const days = getDaysOfWeek();
  const todayStr = formatDateToString(new Date());
  const selectedDateStr = formatDateToString(selectedDate);

  return (
    <section className="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-md border border-black/5 dark:border-white/5 transition-all duration-300">
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          onClick={() => onNavigateWeek(-7)}
          className="p-2 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-primary-light hover:text-primary dark:hover:bg-dark-primary-light dark:hover:text-dark-primary transition-all duration-200 cursor-pointer"
          aria-label="이전 주"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="text-base font-bold text-text-light-primary dark:text-text-dark-primary tracking-wide">
          {getWeekTitle()}
        </span>
        <button
          onClick={() => onNavigateWeek(7)}
          className="p-2 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-primary-light hover:text-primary dark:hover:bg-dark-primary-light dark:hover:text-dark-primary transition-all duration-200 cursor-pointer"
          aria-label="다음 주"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dayDate, index) => {
          const dateStr = formatDateToString(dayDate);
          const isSelected = dateStr === selectedDateStr;
          const isToday = dateStr === todayStr;
          const dayOfWeek = dayDate.getDay(); // 0 is Sunday, 6 is Saturday
          const taskCount = todos.filter((todo) => todo.date === dateStr).length;

          // Color for Saturday/Sunday names when not selected
          let dayNameColorClass = 'text-text-light-secondary dark:text-text-dark-secondary';
          if (!isSelected) {
            if (dayOfWeek === 6) dayNameColorClass = 'text-blue-500 dark:text-blue-400';
            if (dayOfWeek === 0) dayNameColorClass = 'text-red-500 dark:text-red-400';
          }

          return (
            <div
              key={dateStr}
              onClick={() => onSelectDate(dayDate)}
              className={`flex flex-col items-center py-3 px-1 rounded-xl cursor-pointer transition-all duration-200 select-none relative gap-1 aspect-[4/5] justify-center ${
                isSelected
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 dark:bg-dark-primary dark:text-bg-dark font-medium'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-text-light-primary dark:text-text-dark-primary'
              } ${isToday && !isSelected ? 'border border-primary/40 dark:border-dark-primary/40' : ''}`}
            >
              <span className={`text-[0.7rem] font-semibold tracking-wider ${dayNameColorClass} ${isSelected ? 'text-white/80 dark:text-bg-dark/80' : ''}`}>
                {DAY_NAMES[dayOfWeek]}
              </span>
              <span className="text-sm font-bold">
                {dayDate.getDate()}
              </span>
              <span
                className={`text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full transition-all duration-200 mt-0.5 ${
                  taskCount > 0
                    ? isSelected
                      ? 'bg-white/20 text-white dark:bg-black/10 dark:text-bg-dark'
                      : 'bg-primary-light text-primary dark:bg-dark-primary-light dark:text-dark-primary'
                    : isSelected
                    ? 'bg-white/10 text-white/50 dark:bg-black/5 dark:text-bg-dark/40'
                    : 'bg-black/5 dark:bg-white/5 text-text-light-muted dark:text-text-dark-muted'
                }`}
              >
                {taskCount}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
