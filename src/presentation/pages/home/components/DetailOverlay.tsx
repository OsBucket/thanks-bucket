'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import { Bucket, Todo } from '@/domain/models/bucket-model';
import usePreventScroll from '@/presentation/hooks/usePreventScroll';
import { UpdateBucketValue } from '@/services/bucket';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/presentation/components/ui/Button';
import { ModalWrapper } from '@/presentation/components/ui/ConfirmModal';
import TodoList from '@/presentation/components/TodoList';

interface DetailOverlayProps {
  bucket: Bucket;
  closeOverlay: () => void;
  updateMutation: UseMutationResult<AxiosResponse, Error, UpdateBucketValue, unknown>;
}

const DetailOverlay: FC<DetailOverlayProps> = ({ bucket, closeOverlay, updateMutation }) => {
  const router = useRouter();
  const [todoList, setTodoList] = useState<Todo[]>(bucket.bucketTodos ?? []);
  const [showClapping, setShowClapping] = useState<boolean>(false);

  usePreventScroll();

  const isBucketComplete = () => {
    if (bucket.isDone) return true;
    if (!todoList.length) return false;
    return todoList?.every((todo) => todo.isDone);
  };

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeOverlay();
    }
  };

  const onToggleChecked = async (id: string, checked: boolean) => {
    const newTodos = [...todoList];
    const index = newTodos.findIndex((todo) => todo.id === Number(id));
    newTodos[index].isDone = checked;

    const isBucketComplete = newTodos.every((todo) => todo.isDone);

    updateMutation.mutate({
      ...bucket,
      isDone: isBucketComplete,
      topicIds: bucket.bucketTopics?.map((item) => item.id),
      bucketTodos: newTodos
    });
    if (isBucketComplete) {
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
    return Math.floor((todoList.filter((todo) => todo.isDone).length / todoList.length) * 100);
  };

  const getTodoComments = () => {
    const completedTodoList = todoList.filter((todo) => todo.isDone).length;
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
    const newTodos = [...todoList];
    newTodos.forEach((todo) => {
      todo.isDone = true;
    });

    updateMutation.mutate({
      ...bucket,
      isDone: true,
      topicIds: bucket.bucketTopics?.map((item) => item.id),
      bucketTodos: newTodos
    });

    setTodoList(newTodos);
    showGifImage();
  };

  return (
    <ModalWrapper>
      <div
        onClick={backdropClick}
        className="bg-[#2f2f2f] bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
      >
        <div
          className="z-50 absolute top-1/2 -translate-y-1/2 left-1/2
       -translate-x-1/2 rounded-3xl bg-white p-5 min-w-[300px]
       border-2 border-black"
        >
          <div className="text-end mb-2">
            <Button onClick={closeOverlay} className="p-0 h-0" variant={'basic'}>
              <Image width={20} height={20} src="/images/icons/close.svg" alt="close-btn" />
            </Button>
          </div>
          <div className="text-center max-h-[200px] overflow-y-scroll">
            <p className="body2Strong text-[#9E9E9E] mb-1">{`${
              bucket.goalDate ? bucket.goalDate.replace(/-/gi, '.') : ''
            }까지`}</p>
            <p className="title3">{bucket.title}</p>
          </div>
          <div className="mt-4">
            <p className="caption1Strong">{getTodoComments()}</p>

            <div className="mt-2 mb-6 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-black h-2.5 rounded-full" style={{ width: `${getCompletedTodoPercent()}%` }}></div>
            </div>
          </div>
          <div>
            <p className="mb-2 body1Strong">
              TO DO LIST <span>{todoList.length}</span>
            </p>
            {todoList.length > 0 ? (
              <TodoList todoList={todoList} toggleChecked={onToggleChecked} inputDisabled={true} />
            ) : (
              <div className="py-5 flex flex-col justify-center items-center mt-2 h-[112px]">
                <Image width={40} height={40} src="/check-list.svg" alt="check-list" />
                <p className="mt-2 caption1Strong text-text-textGray">상세 할 일을 정하지 않았어요</p>
              </div>
            )}
          </div>
          {showClapping ? (
            <Image
              width={300}
              height={524}
              unoptimized
              className="z-50 fixed left-[0%] bottom-28 h-full w-full"
              src="/images/clapping.gif"
              alt="clapping"
            />
          ) : null}
          <div className="mt-4 mb-3">
            <Button
              onClick={() => {
                router.push(`/update/${bucket.id}`);
              }}
              size={'sm'}
              variant={'outline'}
              className="w-full mb-2"
            >
              <span className="body1Strong">버킷 수정</span>
            </Button>
            <Button onClick={onBucketComplete} disabled={isBucketComplete()} size={'sm'} className="w-full">
              <span className="body1Strong">버킷을 이뤘어요</span>
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DetailOverlay;
