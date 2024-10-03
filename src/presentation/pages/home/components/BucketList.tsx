import { FC } from 'react';
import BucketItem from './BucketItem';
import { Bucket } from '@/entities/bucket';

interface BucketListProps {
  bucketList: Bucket[];
  selectBucket: (bucket: Bucket) => void;
  doClapping: () => void;
  clickMoreBtn: (bucket: Bucket) => void;
}

const BucketList: FC<BucketListProps> = ({ bucketList, doClapping, selectBucket, clickMoreBtn }) => {
  return (
    <ul className="flex flex-1 flex-col justify-center gap-2">
      {bucketList.map((bucket) => (
        <BucketItem
          selectBucket={selectBucket}
          key={bucket.id}
          bucket={bucket}
          doClapping={doClapping}
          clickMoreBtn={clickMoreBtn}
        />
      ))}
    </ul>
  );
};

export default BucketList;
