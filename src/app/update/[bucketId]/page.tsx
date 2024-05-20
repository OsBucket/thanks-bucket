'use client';
import { useRouter } from 'next/navigation';

import { makeUpdateBucket } from '@/main/factories/pages/update-bucket-factory';
import { FullHeightDialog } from '@/presentation/components/common';

interface UpdateBucketPageProps {
  params: {
    bucketId: number;
  };
}

export default function UpdateBucketPage({ params }: UpdateBucketPageProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <FullHeightDialog title="버킷 수정" onGoback={handleGoBack}>
      {makeUpdateBucket(params.bucketId)}
    </FullHeightDialog>
  );
}
