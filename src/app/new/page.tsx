'use client';

import { makeNewBucket } from '@/main/factories/pages/new-bucket-factory';
import { FullHeightDialog } from '@/presentation/components/common';
import { getProfile } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function NewBucketPage() {
  const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  });

  const handleGoBack = () => {
    if (profile !== undefined) {
      router.push(`/${profile.nickname}`);
    }
  };

  return (
    <FullHeightDialog title="버킷 생성" onGoback={handleGoBack}>
      {makeNewBucket()}
    </FullHeightDialog>
  );
}
