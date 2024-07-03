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
    <ul className="h-full">
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
