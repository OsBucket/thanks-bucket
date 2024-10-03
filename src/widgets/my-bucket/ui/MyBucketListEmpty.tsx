import Image from 'next/image';

export const MyBucketListEmpty = () => {
  return (
    <div className="flex h-[224px] flex-col items-center justify-center gap-3 px-4 py-[60px]">
      <Image src="/images/icons/my-bucket-empty.svg" width={48} height={48} alt="" />
      <p className="body2Strong text-gray-500">
        살면서 꼭 이루고 싶은 <br />
        버킷을 만들어 볼까요?
      </p>
    </div>
  );
};
