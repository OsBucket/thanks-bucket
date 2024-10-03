import Image from 'next/image';
import { Bucket } from '@/entities/bucket';
import { FC } from 'react';
import { calculateFinishRate } from '../lib/calculateBucketFinishRate';

interface MyBucketSummaryProps {
  myBuckets: Bucket[];
}

export const MyBucketSummary: FC<MyBucketSummaryProps> = ({ myBuckets }) => {
  const getBucketEmoji = (myBuckets: Bucket[]) => {
    let rate = calculateFinishRate(myBuckets);
    if (rate < 20) return '0-20.svg';
    if (rate < 40) return '21-40.svg';
    if (rate < 60) return '41-60.svg';
    if (rate < 80) return '61-80.svg';
    if (rate < 90) return '81-90.svg';
    return '91-100.svg';
  };
  return (
    <div className="flex h-[66px] w-full items-center gap-5 p-4">
      <div className="flex h-[34px] w-full flex-col gap-[9px]">
        <div className="flex h-[20px] w-full justify-between">
          <div className="body1Strong">총 버킷 {myBuckets.length}개</div>
          <div className="flex">
            <div className="body1Strong"> {calculateFinishRate(myBuckets)}% 달성</div>
            <Image width={20} height={20} src={`/images/icons/bucket-rate/${getBucketEmoji(myBuckets)}`} alt="" />
          </div>
        </div>
        <div className="h-[5px]">
          <div className="h-[5px] w-full rounded-full bg-gray-200">
            <div
              className="h-[5px] rounded-full bg-black"
              style={{ width: `${calculateFinishRate(myBuckets)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
