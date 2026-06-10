import { useState, useEffect, useRef } from 'react';

export default function TodoItem({
  todo,
  isEditing,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) {
  const [editText, setEditText] = useState(todo.text);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef(null);

  // Focus input and position cursor at the end when editing begins
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);


  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setLocalError('할 일 내용은 비어 둘 수 없습니다.');
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    onSaveEdit(todo.id, trimmed);
    setLocalError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <li className={`flex items-center justify-between p-4 rounded-xl border border-black/5 dark:border-white/5 bg-card-light dark:bg-card-dark transition-all duration-300 shadow-sm ${
      todo.completed ? 'opacity-75 bg-bg-light/40 dark:bg-bg-dark/40' : ''
    }`}>
      {/* Left side: Checkbox + Text */}
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        {isEditing ? (
          <div className="flex flex-col gap-1 w-full">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                if (e.target.value.trim()) setLocalError('');
              }}
              onKeyDown={handleKeyDown}
              className={`w-full px-3 py-1.5 rounded-lg bg-bg-light dark:bg-bg-dark border text-sm text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 focus:border-primary dark:focus:border-dark-primary transition-all duration-200 ${
                localError ? 'border-red-500 ring-2 ring-red-500/10' : 'border-black/10 dark:border-white/10'
              }`}
            />
            {localError && (
              <span className="text-[10px] text-red-500 font-semibold px-0.5 animate-fade-in">
                {localError}
              </span>
            )}
          </div>
        ) : (
          <>
            <label className="relative flex items-center justify-center cursor-pointer select-none shrink-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
                className="sr-only peer"
              />
              <span className="w-5 h-5 rounded-full border-2 border-black/15 dark:border-white/15 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all duration-200 flex items-center justify-center text-white">
                <svg className="w-3.5 h-3.5 stroke-[3.5] opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </span>
            </label>
            <span
              className={`text-sm font-semibold text-text-light-primary dark:text-text-dark-primary break-words truncate w-full ${
                todo.completed
                  ? 'line-through text-text-light-muted dark:text-text-dark-muted font-normal'
                  : ''
              }`}
              title={todo.text}
            >
              {todo.text}
            </span>
          </>
        )}
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 cursor-pointer"
              aria-label="저장"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
            <button
              onClick={onCancelEdit}
              className="p-1.5 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
              aria-label="취소"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onStartEdit(todo.id)}
              className="p-1.5 rounded-lg text-text-light-secondary hover:text-primary dark:text-text-dark-secondary dark:hover:text-dark-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
              aria-label="수정"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.013a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-text-light-secondary hover:text-red-500 dark:text-text-dark-secondary dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
              aria-label="삭제"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
