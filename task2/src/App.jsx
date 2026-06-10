import { useState, useEffect } from 'react';
import WeeklyCalendar from './components/WeeklyCalendar';
import DailyHeader from './components/DailyHeader';
import FilterTabs from './components/FilterTabs';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import EmptyState from './components/EmptyState';

function getMondayOfDate(date) {
  const targetDate = new Date(date);
  const dayIndex = targetDate.getDay(); // 0(Sun) to 6(Sat)
  const diffDays = targetDate.getDate() - dayIndex + (dayIndex === 0 ? -6 : 1);
  return new Date(targetDate.getFullYear(), targetDate.getMonth(), diffDays);
}

function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function App() {
  // 1. Theme State (Dark mode)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('THEME');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // 2. Todos State
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('MINIMAL_TODOS');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 3. Date Selection & Navigation State
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // 4. Week Start Date State (Monday of the visible week)
  const [weekStartDate, setWeekStartDate] = useState(() => {
    const saved = localStorage.getItem('WEEK_START_DATE');
    return saved ? new Date(saved) : getMondayOfDate(new Date());
  });

  // 5. Filter State
  const [selectedFilter, setSelectedFilter] = useState('all');

  // 6. Inline editing item state
  const [editingTodoId, setEditingTodoId] = useState(null);

  // 7. Validation Error State
  const [validationError, setValidationError] = useState('');

  // Apply dark mode theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('THEME', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('THEME', 'light');
    }
  }, [darkMode]);

  // Persist todos state
  useEffect(() => {
    localStorage.setItem('MINIMAL_TODOS', JSON.stringify(todos));
  }, [todos]);

  // Persist weekStartDate state (Challenge Mission)
  useEffect(() => {
    localStorage.setItem('WEEK_START_DATE', weekStartDate.toISOString());
  }, [weekStartDate]);

  // Sync selectedDate with weekStartDate if selected date goes out of bounds,
  // or simply when manually changing selected date
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setWeekStartDate(getMondayOfDate(date));
    setEditingTodoId(null);
    setValidationError('');
  };

  const handleNavigateDay = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + offset);
    setSelectedDate(newDate);
    setWeekStartDate(getMondayOfDate(newDate));
    setEditingTodoId(null);
    setValidationError('');
  };

  const handleGoToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setWeekStartDate(getMondayOfDate(today));
    setEditingTodoId(null);
    setValidationError('');
  };

  const handleNavigateWeek = (daysOffset) => {
    const newMonday = new Date(weekStartDate);
    newMonday.setDate(weekStartDate.getDate() + daysOffset);
    setWeekStartDate(newMonday);
  };

  // CRUD handlers
  const handleAddTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setValidationError('할 일을 입력해주세요.');
      return false;
    }
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      date: formatDateToString(selectedDate)
    };
    setTodos((prev) => [...prev, newTodo]);
    setValidationError('');
    return true;
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
    if (editingTodoId === todoId) {
      setEditingTodoId(null);
    }
  };

  const handleToggleComplete = (todoId) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleStartEdit = (todoId) => {
    setEditingTodoId(todoId);
    setValidationError('');
  };

  const handleSaveEdit = (todoId, updatedText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, text: updatedText } : t))
    );
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  // Filter computation
  const selectedDateStr = formatDateToString(selectedDate);
  const dateSpecificTodos = todos.filter((todo) => todo.date === selectedDateStr);

  const filteredTodos = dateSpecificTodos.filter((todo) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return !todo.completed;
    if (selectedFilter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col justify-center items-center py-10 px-4 transition-colors duration-300">
      <div className="w-full max-w-[580px] flex flex-col gap-5">
        {/* App Header */}
        <header className="flex justify-between items-center mb-1 px-1">
          <div>
            <h1 className="text-3xl font-extrabold text-text-light-primary dark:text-text-dark-primary tracking-tight">
              Minimalist Tasks
            </h1>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">
              오늘의 할 일을 깔끔하게 관리해보세요.
            </p>
          </div>
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-card-light dark:bg-card-dark text-text-light-secondary dark:text-text-dark-secondary hover:bg-primary-light hover:text-primary dark:hover:bg-dark-primary-light dark:hover:text-dark-primary transition-all duration-200 shadow-sm border border-black/5 dark:border-white/5 cursor-pointer"
            aria-label={darkMode ? '라이트 모드로 변경' : '다크 모드로 변경'}
          >
            {darkMode ? (
              // Sun icon
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.25 5.25l1.59 1.59m10.32 10.32 1.59 1.59M3 12h2.25m13.5 0H21M5.25 18.75l1.59-1.59m10.32-10.32 1.59-1.59M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
              </svg>
            ) : (
              // Moon icon
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </header>

        {/* Weekly View Panel */}
        <WeeklyCalendar
          currentWeekMonday={weekStartDate}
          selectedDate={selectedDate}
          todos={todos}
          onSelectDate={handleSelectDate}
          onNavigateWeek={handleNavigateWeek}
        />

        {/* Main Todo Card Container */}
        <main className="bg-card-light dark:bg-card-dark rounded-3xl p-6 md:p-7 shadow-lg border border-black/5 dark:border-white/5 transition-all duration-300 flex flex-col gap-5">
          <DailyHeader
            selectedDate={selectedDate}
            onNavigateDay={handleNavigateDay}
            onGoToToday={handleGoToToday}
          />

          <div className="flex flex-col gap-4">
            <FilterTabs
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
            />

            <TodoForm
              onAddTodo={handleAddTodo}
              validationError={validationError}
              onClearValidationError={() => setValidationError('')}
            />
          </div>

          {filteredTodos.length > 0 ? (
            <TodoList
              filteredTodos={filteredTodos}
              editingTodoId={editingTodoId}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          ) : (
            <EmptyState
              selectedFilter={selectedFilter}
              totalCountForDate={dateSpecificTodos.length}
            />
          )}
        </main>
      </div>
    </div>
  );
}
