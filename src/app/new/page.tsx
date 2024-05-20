'use client';

import { makeNewBucket } from '@/main/factories/pages/new-bucket-factory';
import { FullHeightDialog } from '@/presentation/components/common';
import { useRouter } from 'next/navigation';

export default function NewBucketPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <FullHeightDialog title="버킷 생성" onGoback={handleGoBack}>
      {makeNewBucket()}
    </FullHeightDialog>
  );
}
