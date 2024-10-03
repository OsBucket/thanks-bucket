'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/user';
import { FullHeightDialog } from '@/widgets/full-height-page/ui/FullHeightDialog';
import UpdateBucket from '@/presentation/pages/update-bucket/update-bucket';
import { getMe } from '@/entities/auth';

interface Props {
  params: {
    bucketId: number;
  };
}

export default function UpdateBucketPage({ params }: Props) {
  const me = getMe();
  const router = useRouter();

  const handleGoBack = () => {
    if (me !== undefined) {
      router.push(`/buckets/${me.NICKNAME}`);
    }
  };

  return (
    <FullHeightDialog title="버킷 수정" onGoback={handleGoBack}>
      <UpdateBucket bucketId={params.bucketId} />
    </FullHeightDialog>
  );
}
