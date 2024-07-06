'use client';
import { useRouter } from 'next/navigation';

import { makeUpdateBucket } from '@/main/factories/pages/update-bucket-factory';
import { FullHeightDialog } from '@/presentation/components/common';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/user';

interface Props {
  params: {
    bucketId: number;
  };
}

export default function UpdateBucketPage({ params }: Props) {
  const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  });

  const handleGoBack = () => {
    if (profile !== undefined) {
      router.push(`/buckets/${profile.nickname}`);
    }
  };

  return (
    <FullHeightDialog title="버킷 수정" onGoback={handleGoBack}>
      {makeUpdateBucket(params.bucketId)}
    </FullHeightDialog>
  );
}
