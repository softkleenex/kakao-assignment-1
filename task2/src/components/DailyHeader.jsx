import React from 'react';

const KOREAN_DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default function DailyHeader({ selectedDate, onNavigateDay, onGoToToday }) {
  const formatDateToKoreanString = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = KOREAN_DAY_NAMES[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  return (
    <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
      <button
        onClick={() => onNavigateDay(-1)}
        className="p-1.5 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
        aria-label="이전 날짜"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
        <span className="text-base font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight">
          {formatDateToKoreanString(selectedDate)}
        </span>
        <button
          onClick={onGoToToday}
          className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white dark:bg-dark-primary-light dark:text-dark-primary dark:hover:bg-dark-primary dark:hover:text-bg-dark transition-all duration-200 cursor-pointer"
        >
          오늘로 이동
        </button>
      </div>

      <button
        onClick={() => onNavigateDay(1)}
        className="p-1.5 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
        aria-label="다음 날짜"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
