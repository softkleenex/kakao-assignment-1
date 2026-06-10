import React from 'react';

export default function EmptyState({ selectedFilter, totalCountForDate }) {
  const getMessage = () => {
    if (totalCountForDate === 0) {
      return '이 날짜에 계획된 할 일이 없습니다. 새로운 계획을 추가해보세요!';
    } else if (selectedFilter === 'active') {
      return '이 날짜에 계획한 모든 할 일을 성공적으로 끝마쳤습니다! 🎉';
    } else if (selectedFilter === 'completed') {
      return '이 날짜에 완료된 할 일이 존재하지 않습니다.';
    } else {
      return '해당 필터에 일치하는 할 일이 존재하지 않습니다.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <svg
        className="w-14 h-14 text-text-light-muted/50 dark:text-text-dark-muted/50 mb-3 stroke-[1.2]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M8.25 21h8.25g-8.25 0a1.5 1.5 0 0 1-1.5-1.5V3.75A1.5 1.5 0 0 1 8.25 2h8.25a1.5 1.5 0 0 1 1.5 1.5v15.75a1.5 1.5 0 0 1-1.5 1.5M8.25 21a1.5 1.5 0 0 0 1.5 1.5h8.25a1.5 1.5 0 0 0 1.5-1.5V3.75A1.5 1.5 0 0 0 16.5 2H8.25"
        />
      </svg>
      <p className="text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary max-w-sm leading-relaxed">
        {getMessage()}
      </p>
    </div>
  );
}
