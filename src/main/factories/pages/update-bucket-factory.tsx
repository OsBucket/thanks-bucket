import UpdateBucket from '@/presentation/pages/update-bucket/update-bucket';

export const makeUpdateBucket = (bucketId: number) => {
  return <UpdateBucket bucketId={bucketId} />;
};
