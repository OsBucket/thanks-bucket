'use client';

import { getMe } from '@/libs/core/common';
import { FullHeightDialog } from '@/presentation/components/common';
import NewBucket from '@/presentation/pages/new-bucket/new-bucket';
import { useRouter } from 'next/navigation';

export default function NewBucketPage() {
  const me = getMe();
  const router = useRouter();

  return (
    <FullHeightDialog title="버킷 생성" onGoback={() => router.push(`${me.NICKNAME}`)}>
      <NewBucket />
    </FullHeightDialog>
  );
}
