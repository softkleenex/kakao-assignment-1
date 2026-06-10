import React from 'react';

export default function FilterTabs({ selectedFilter, onSelectFilter }) {
  const tabs = [
    { key: 'all', label: '전체' },
    { key: 'active', label: '진행 중' },
    { key: 'completed', label: '완료' }
  ];

  return (
    <div className="flex bg-bg-light dark:bg-bg-dark p-1 rounded-xl w-full sm:w-auto self-start border border-black/5 dark:border-white/5">
      {tabs.map((tab) => {
        const isActive = selectedFilter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onSelectFilter(tab.key)}
            className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-card-light dark:bg-card-dark text-primary dark:text-dark-primary shadow-sm font-bold border border-black/[0.03] dark:border-white/[0.03]'
                : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
