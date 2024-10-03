import { FC } from 'react';
import CheckboxLegacy from '@/presentation/components/ui/CheckboxLegacy';
import { Todo } from '@/domain/models';
import { LegacyInput } from '@/shared/ui/LegacyInput';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (order: string, checked: boolean) => void;
  inputDisabled?: boolean;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, inputDisabled = true }) => {
  const isFinished = (todo: Todo) => {
    return todo.todoStatus === 'FINISH';
  };

  return (
    <div>
      <div className="flex" key={todo.id.toString()}>
        <CheckboxLegacy id={todo.id.toString()} checked={isFinished(todo)} onChange={onToggle} />

        <LegacyInput
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            const newTodo = { ...todo };
            newTodo.content = value;
            // setTodo && setTodo(newTodo);
          }}
          disabled={inputDisabled}
          value={todo.content}
          className={`${isFinished(todo) ? 'line-through' : ''} border-l border-none bg-white pl-1`}
          placeholder="To-do"
        />
      </div>
    </div>
  );
};

export default TodoItem;
