import { Bucket } from '@/domain/models/bucket-model';
import { FC } from 'react';
import BucketItem from './BucketItem';

interface BucketListProps {
  bucketList: Bucket[];
  selectBucket: (bucket: Bucket) => void;
  toggleComplete: (id: string, checked: boolean) => void;
  clickMoreBtn: (bucket: Bucket) => void;
}

const BucketList: FC<BucketListProps> = ({ bucketList, toggleComplete, selectBucket, clickMoreBtn }) => {
  return (
    <ul
      className={`
      ${bucketList.length > 4 ? 'min-h-[100vh] pb-[150px]' : ''}
      `}
    >
      {bucketList.map((bucket) => (
        <BucketItem
          selectBucket={selectBucket}
          key={bucket.id}
          bucket={bucket}
          toggleComplete={toggleComplete}
          clickMoreBtn={clickMoreBtn}
        />
      ))}
    </ul>
  );
};

export default BucketList;
