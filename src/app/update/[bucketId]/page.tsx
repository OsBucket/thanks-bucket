'use client';

import { makeUpdateBucket } from '@/main/factories/pages/update-bucket-factory';

interface UpdateBucketPageProps {
  params: {
    bucketId: number;
  };
}

export default function UpdateBucketPage({ params }: UpdateBucketPageProps) {
  return makeUpdateBucket(params.bucketId);
}
