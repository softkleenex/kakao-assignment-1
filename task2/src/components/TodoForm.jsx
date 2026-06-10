import React, { useState } from 'react';

export default function TodoForm({ onAddTodo, validationError, onClearValidationError }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = onAddTodo(text);
    if (isSuccess) {
      setText('');
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);
    if (val.trim().length > 0) {
      onClearValidationError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2" novalidate>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="이 날짜에 할 일을 입력하세요..."
          className={`flex-1 min-w-0 px-4 py-3 rounded-xl bg-bg-light dark:bg-bg-dark border text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:focus:ring-dark-primary/30 dark:focus:border-dark-primary transition-all duration-200 ${
            validationError
              ? 'border-red-500 ring-2 ring-red-500/10'
              : 'border-black/10 dark:border-white/10'
          }`}
          autoComplete="off"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md shadow-primary/20 dark:bg-dark-primary dark:text-bg-dark dark:hover:bg-dark-primary-hover dark:shadow-dark-primary/15"
        >
          <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="hidden sm:inline">추가</span>
        </button>
      </div>
      {validationError && (
        <p className="text-xs text-red-500 font-semibold px-1 animate-fade-in">
          {validationError}
        </p>
      )}
    </form>
  );
}
