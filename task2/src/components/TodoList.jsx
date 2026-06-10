import TodoItem from './TodoItem';

export default function TodoList({
  filteredTodos,
  editingTodoId,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) {
  return (
    <ul className="flex flex-col gap-2.5 w-full">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={`${todo.id}-${editingTodoId === todo.id}`}
          todo={todo}
          isEditing={editingTodoId === todo.id}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}

