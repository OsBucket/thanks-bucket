import { FullHeightDialog } from '@/presentation/components/common';
import NewBucket from '@/presentation/pages/new-bucket/new-bucket';

export default function NewBucketPage() {
  return (
    <FullHeightDialog title="버킷 생성">
      <NewBucket />
    </FullHeightDialog>
  );
}
