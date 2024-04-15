import { Bucket } from '@/domain/models/bucket-model';
import { Button } from '@/presentation/components/ui/Button';
import Checkbox from '@/presentation/components/ui/Checkbox';
import Image from 'next/image';
import { FC } from 'react';

interface BucketItemProps {
  bucket: Bucket;
  toggleComplete: (id: string, checked: boolean) => void;
  selectBucket: (bucket: Bucket) => void;
  clickMoreBtn: (bucket: Bucket) => void;
}

const BucketItem: FC<BucketItemProps> = ({ bucket, selectBucket, toggleComplete, clickMoreBtn }) => {
  const onClickMoreBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clickMoreBtn(bucket);
  };

  return (
    <li
      onClick={() => selectBucket(bucket)}
      key={bucket.id}
      className="flex items-center border-t-2 border-r-4 border-b-4 border-l-2 border-black p-3 mb-3 rounded-2xl"
    >
      <Checkbox
        checked={bucket.isDone}
        id={bucket.id.toString()}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(id, checked) => {
          toggleComplete(id, checked);
        }}
      />
      <div className="px-2 flex flex-col flex-grow">
        <p className="caption2Strong text-gray-500">{bucket.goalDate}</p>
        <p className={`${bucket.isDone ? 'line-through' : ''} body2Strong`}>{bucket.title}</p>
        <div className="caption2Strong flex mt-[2px]">
          <p className="mr-1">TO DO LIST</p>
          <span>{bucket.bucketTodos.length}</span>
        </div>
      </div>
      <div className=" min-w-5 flex items-center justify-center flex-grow-0">
        <Button size={'basic'} variant={'basic'} onClick={onClickMoreBtn}>
          <Image width={12} height={12} src="/images/icons/more-btn.svg" alt="more-btn" />
        </Button>
      </div>
    </li>
  );
};

export default BucketItem;
