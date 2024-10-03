'use client';

import { useRouter } from 'next/navigation';
import { getMe } from '@/entities/auth';
import { FullHeightDialog } from '@/widgets/full-height-page/ui/FullHeightDialog';
import NewBucket from '@/pages/new-bucket/new-bucket';

export default function NewBucketPage() {
  const me = getMe();
  const router = useRouter();

  return (
    <FullHeightDialog title="버킷리스트 만들기" onGoback={() => router.push(`${me?.NICKNAME}`)}>
      <NewBucket />
    </FullHeightDialog>
  );
}
