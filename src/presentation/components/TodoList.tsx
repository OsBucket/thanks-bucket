import { FC, useState } from 'react';
import TodoItem from '@/presentation/components/TodoItem';
import { Todo } from '@/entities/bucket';

interface TodoListProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  toggleEnabled?: boolean;
  inputEnabled?: boolean;
}

const TodoList: FC<TodoListProps> = ({ todoList, setTodoList, toggleEnabled = false, inputEnabled = false }) => {
  const [canDelete, setCanDelete] = useState(false);

  const handleToggle = (index: string, checked: boolean) => {
    if (!toggleEnabled) return;
    const newTodoList = [...todoList];
    const todo = newTodoList[Number(index)];
    if (checked) {
      todo.todoStatus = 'FINISH';
    }
    if (!checked) {
      todo.todoStatus = 'START';
    }
    setTodoList && setTodoList(newTodoList);
  };

  return (
    <div className="min-h-[112px]">
      {todoList?.map((todo, index) => {
        return <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />;
      })}

      {/*<div className="flex">*/}
      {/*  <Checkbox id="todo" label="" checked={false} />*/}
      {/*  <Input*/}
      {/*    onChange={(e) => {*/}
      {/*      setNewTodo(e.target.value);*/}
      {/*      setCanDelete(false);*/}
      {/*    }}*/}
      {/*    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {*/}
      {/*      if (e.key === 'Enter') {*/}
      {/*        const value = (e.target as HTMLInputElement).value;*/}

      {/*        if (value.trim() === '') return;*/}
      {/*        if (todoList.length > 8) return;*/}
      {/*        setTodoList &&*/}
      {/*        setTodoList((prev) => [*/}
      {/*          ...prev,*/}
      {/*          {*/}
      {/*            id: Date.now(),*/}
      {/*            content: value,*/}
      {/*            isDone: false*/}
      {/*          }*/}
      {/*        ]);*/}
      {/*        setNewTodo('');*/}
      {/*      }*/}
      {/*      if (e.key === 'Backspace' &&) {*/}
      {/*        if (newTodo.trim() === '') setCanDelete(true);*/}
      {/*        if (canDelete) {*/}
      {/*          setTodoList &&*/}
      {/*          setTodoList((prev) => {*/}
      {/*            const newTodoList = [...prev];*/}
      {/*            const lastTodo = newTodoList.pop();*/}
      {/*            setNewTodo(lastTodo?.content || '');*/}
      {/*            return newTodoList;*/}
      {/*          });*/}
      {/*        }*/}
      {/*      }*/}
      {/*    }}*/}
      {/*    value={newTodo}*/}
      {/*    className="border-none border-l pl-1"*/}
      {/*    placeholder="To-do"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default TodoList;
