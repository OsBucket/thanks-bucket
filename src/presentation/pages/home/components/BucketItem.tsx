import { Button } from '@/shared/ui/Button';
import Image from 'next/image';
import { FC } from 'react';
import { Bucket, Todo } from '@/entities/bucket';
import { Divider } from '@/shared/ui/Divider';
import { useChangeBucketStatus, useChangeTodoStatus } from '@/features/change-bucket/api/change-bucket';
import Checkbox from '@/presentation/components/ui/Checkbox';

interface BucketItemProps {
  bucket: Bucket;
  doClapping: () => void;
  selectBucket: (bucket: Bucket) => void;
  clickMoreBtn: (bucket: Bucket) => void;
}

const BucketItem: FC<BucketItemProps> = ({ bucket, selectBucket, doClapping, clickMoreBtn }) => {
  const { mutate: changeBucketStatusMutate } = useChangeBucketStatus();
  const { mutate: changeTodoStatusMutate } = useChangeTodoStatus();

  const onClickChangeBucketStatus = (bucket: Bucket) => {
    if (bucket.bucketStatus === 'START') {
      doClapping();
    }
    changeBucketStatusMutate({
      bucketId: bucket.id,
      status: bucket.bucketStatus === 'FINISH' ? 'START' : 'FINISH'
    });
  };

  const onClickChangeTodoStatus = (bucketId: number, todo: Todo) => {
    changeTodoStatusMutate({
      bucketId: bucketId,
      bucketTodoId: todo.id,
      status: todo.todoStatus === 'FINISH' ? 'START' : 'FINISH'
    });
  };

  const onClickMoreBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clickMoreBtn(bucket);
  };

  const isBucketComplete = (bucket: Bucket) => bucket.bucketStatus === 'FINISH';
  const isTodoComplete = (todo: Todo) => todo.todoStatus === 'FINISH';

  return (
    <li key={bucket.id} className="relative flex-1 rounded-2xl border-x-4 border-y-2 border-white p-4">
      <div className="flex flex-1 flex-col items-start gap-3">
        <div className="flex flex-1 items-start justify-center gap-1">
          <div className="flex w-12 items-center justify-center">
            <Image width={36} height={36} src="/images/icons/default-profile-image.svg" alt="" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline justify-start gap-0.5">
              <p className="caption1Strong">{bucket.member.nickname}</p>
              <Image width={43} height={12} src="/images/icons/home-main.svg" alt="" />
            </div>
            <div className="flex gap-1">
              {bucket.bucketTopics.map((topic) => (
                <p key={topic.id} className="caption2Strong text-gray-500">
                  {topic.content}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex flex-col gap-1">
            {isBucketComplete(bucket) ? (
              <div className="items-center justify-center rounded-3xl bg-gray-900 px-1 py-0.5">
                <p className="caption2Strong text-white">{bucket.goalDate}에 달성 완료</p>
              </div>
            ) : (
              <div className="items-center justify-center rounded-3xl bg-gray-200 px-1 py-0.5">
                <p className="caption2Strong text-gray-900">{bucket.goalDate}까지 달성 예정</p>
              </div>
            )}
            <p className={`body2Strong`}>{bucket.title}</p>
          </div>
          <div className="flex w-full flex-1 flex-col gap-2">
            <div className="flex items-baseline gap-0.5">
              <p className="caption2Strong">TO DO LIST</p>
              <span className="caption2Strong text-purple-300">{bucket.bucketTodos.length}</span>
            </div>
            <ul className="flex flex-1 flex-col gap-2">
              {bucket.bucketTodos.map((todo) => (
                <li key={todo.id} className="flex gap-1">
                  <Checkbox
                    checked={isTodoComplete(todo)}
                    label={todo.content}
                    onClick={() => onClickChangeTodoStatus(bucket.id, todo)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-1">
          <Divider />
          <Button
            variant={'basic'}
            className="flex flex-1 items-center justify-center gap-1"
            onClick={() => onClickChangeBucketStatus(bucket)}
          >
            {isBucketComplete(bucket) ? (
              <>
                <Image width={12} height={12} src="/images/icons/uncheck.svg" alt="uncheck-btn" />
                <span className="body1Strong text-gray-500">버킷 달성 완료</span>
              </>
            ) : (
              <>
                <Image width={12} height={12} src="/images/icons/check.svg" alt="check-btn" />
                <span className="body1Strong">버킷 달성 완료</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center">
        <Button size={'basic'} variant={'basic'} onClick={onClickMoreBtn}>
          <Image width={12} height={12} src="/images/icons/more-btn.svg" alt="more-btn" />
        </Button>
      </div>
    </li>
  );
};

export default BucketItem;
