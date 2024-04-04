import dynamic from 'next/dynamic';

const UpdateBucket = dynamic(() => import('@/presentation/pages/update-bucket/update-bucket'), { ssr: false });
export const makeUpdateBucket = (bucketId: number) => {
  return <UpdateBucket bucketId={bucketId} />;
};
