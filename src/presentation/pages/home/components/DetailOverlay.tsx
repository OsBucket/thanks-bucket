'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { Portal } from '@/presentation/components/ui';
import TodoList from '@/presentation/components/TodoList';
import { Close } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';
import { Bucket, Todo } from '@/entities/bucket';
import { ChangeBucketStatusValue, ChangeTodoStatusValue } from '@/features/change-bucket/api/change-bucket';

interface DetailOverlayProps {
  bucket: Bucket;
  closeOverlay: () => void;
  changeBucketStatusMutation: UseMutationResult<AxiosResponse, Error, ChangeBucketStatusValue, unknown>;
  changeTodoStatusMutation: UseMutationResult<AxiosResponse, Error, ChangeTodoStatusValue, unknown>;
}

const DetailOverlay: FC<DetailOverlayProps> = ({
  bucket,
  closeOverlay,
  changeBucketStatusMutation,
  changeTodoStatusMutation
}) => {
  const router = useRouter();
  const [todoList, setTodoList] = useState<Todo[]>(bucket.bucketTodos ?? []);
  const [showClapping, setShowClapping] = useState<boolean>(false);

  // usePreventScroll();

  const isBucketComplete = () => {
    return bucket.bucketStatus === 'FINISH';
  };

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeOverlay();
    }
  };

  const onToggleChecked = async (id: string, checked: boolean) => {
    const newTodos = [...todoList];
    const newTodo = newTodos.find((todo) => todo.id === Number(id));
    if (!newTodo) return;
    newTodo.todoStatus = checked ? 'FINISH' : 'START';

    changeTodoStatusMutation.mutate({
      bucketId: bucket.id,
      bucketTodoId: newTodo.id,
      status: newTodo.todoStatus
    });

    //TODO 정상동작 체크하기
    if (bucket.bucketStatus === 'FINISH') {
      showGifImage();
    }

    setTodoList(newTodos);
  };

  const showGifImage = () => {
    setShowClapping(true);
    setTimeout(() => {
      setShowClapping(false);
    }, 3000);
  };

  const getCompletedTodoPercent = () => {
    if (!todoList.length) return 0;
    return Math.floor((todoList.filter((todo) => todo.todoStatus === 'FINISH').length / todoList.length) * 100);
  };

  const getTodoComments = () => {
    const completedTodoList = todoList.filter((todo) => todo.todoStatus === 'FINISH').length;
    if (completedTodoList === 0) {
      return '열심히 달성해봐요 💪';
    }
    if (todoList.length === completedTodoList) {
      return '버킷을 이뤘어요 👏';
    }
    if (completedTodoList > 0) {
      return `달성까지 ${getCompletedTodoPercent()}% 남았어요 💪`;
    }
  };

  const onBucketComplete = () => {
    bucket.bucketStatus = 'FINISH';
    // const newTodos = [...todoList];
    // newTodos.forEach((todo) => {
    //   todo.isDone = true;
    // });

    changeBucketStatusMutation.mutate({
      bucketId: bucket.id,
      status: bucket.bucketStatus
    });

    setTodoList(bucket.bucketTodos ?? []);
    showGifImage();
  };

  return (
    <Portal>
      <div
        onClick={backdropClick}
        className="fixed left-0 right-0 top-0 z-50 h-[calc(100%)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 md:inset-0"
      >
        <div className="absolute left-1/2 top-1/2 z-50 min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-black bg-white p-5">
          <div className="mb-2 text-end">
            <Button onClick={closeOverlay} className="h-0 p-0" variant={'basic'}>
              <Close />
            </Button>
          </div>
          <div className="max-h-[200px] overflow-y-scroll text-center">
            <p className="body2Strong mb-1 text-gray-500">{`${
              bucket.goalDate ? bucket.goalDate.replace(/-/gi, '.') : ''
            }까지`}</p>
            <p className="title3">{bucket.title}</p>
          </div>
          <div className="mt-4">
            <p className="caption1Strong">{getTodoComments()}</p>

            <div className="mb-6 mt-2 h-2.5 w-full rounded-full bg-gray-200">
              <div className="h-2.5 rounded-full bg-black" style={{ width: `${getCompletedTodoPercent()}%` }}></div>
            </div>
          </div>
          <div>
            <p className="body1Strong mb-2">
              TO DO LIST <span>{todoList.length}</span>
            </p>
            {todoList.length > 0 ? (
              <TodoList todoList={todoList} setTodoList={setTodoList} toggleEnabled={true} inputEnabled={false} />
            ) : (
              <div className="mt-2 flex h-[112px] flex-col items-center justify-center py-5">
                <Image width={40} height={40} src="/check-list.svg" alt="check-list" />
                <p className="caption1Strong mt-2 text-gray-500">상세 할 일을 정하지 않았어요</p>
              </div>
            )}
          </div>
          {showClapping ? (
            <Image
              width={300}
              height={524}
              unoptimized
              className="fixed bottom-28 left-[0%] z-50 h-full w-full"
              src="/images/clapping.gif"
              alt="clapping"
            />
          ) : null}
          <div className="mb-3 mt-4">
            <Button
              onClick={() => {
                router.push(`/buckets/update/${bucket.id}`);
              }}
              size={'sm'}
              variant={'outline'}
              className="mb-2 w-full"
            >
              <span className="body1Strong">버킷 수정</span>
            </Button>
            <Button onClick={onBucketComplete} disabled={isBucketComplete()} size={'sm'} className="w-full">
              <span className="body1Strong">버킷을 이뤘어요</span>
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default DetailOverlay;
