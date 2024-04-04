import { FC, useState } from 'react';
import Checkbox from './ui/Checkbox';
import { Input } from './ui/Input';
import { Todo } from '@/domain/models/bucket-model';

interface TodoListProps {
  todoList: Todo[];
  setTodoList?: React.Dispatch<React.SetStateAction<Todo[]>>;
  newTodo?: string;
  setNewTodo?: React.Dispatch<React.SetStateAction<string>>;
  toggleChecked?: (id: string, checked: boolean) => void;
  inputDisabled?: boolean;
}

const TodoList: FC<TodoListProps> = ({
  todoList,
  setTodoList,
  newTodo,
  setNewTodo,
  toggleChecked,
  inputDisabled = false
}) => {
  const [canDelete, setCanDelete] = useState(false);
  return (
    <div className="min-h-[112px]">
      {todoList?.map((todo, index) => {
        return (
          <div className="flex" key={index}>
            <Checkbox
              id={todo.id.toString()}
              checked={todo.isDone}
              onChange={(id, checked) => {
                toggleChecked && toggleChecked(id, checked);
              }}
            />

            <Input
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setTodoList &&
                  setTodoList((prev) => {
                    const newTodoList = [...prev];
                    newTodoList[index].content = value;
                    return newTodoList;
                  });
              }}
              disabled={inputDisabled}
              value={todo.content}
              className={`${todo.isDone ? 'line-through' : ''} border-none border-l pl-1 bg-white`}
              placeholder="To-do"
            />
          </div>
        );
      })}
      {setNewTodo && (
        <div className="flex">
          <Checkbox id="todo" label="" checked={false} onChange={() => {}} />
          <Input
            onChange={(e) => {
              setNewTodo(e.target.value);
              setCanDelete(false);
            }}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;

                if (value.trim() === '') return;
                if (todoList.length > 8) return;
                setTodoList &&
                  setTodoList((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      content: value,
                      isDone: false
                    }
                  ]);
                setNewTodo('');
              }
              if (e.key === 'Backspace' && newTodo === '') {
                if (newTodo.trim() === '') setCanDelete(true);
                if (canDelete) {
                  setTodoList &&
                    setTodoList((prev) => {
                      const newTodoList = [...prev];
                      const lastTodo = newTodoList.pop();
                      setNewTodo(lastTodo?.content || '');
                      return newTodoList;
                    });
                }
              }
            }}
            value={newTodo}
            className="border-none border-l pl-1"
            placeholder="To-do"
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
