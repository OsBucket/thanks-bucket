'use client';

import CreateInvitationFooter from '@/features/invitation/ui/CreateInvitationFooter';
import { useDisclosure } from '@/shared/lib/hooks/useDisclosure';
import { CreateBucketModal } from '@/features/invitation/ui/CreateBucketModal';
import { InvitationPage2 } from '@/widgets/invitations/ui/InvitationPage2';

export default function NewInvitationPage2() {
  const createBucketModal = useDisclosure();

  return (
    <InvitationPage2>
      <CreateInvitationFooter onOpenCreateBucketModal={createBucketModal.onOpen} invitationType={2} />
      {createBucketModal.isOpen && <CreateBucketModal createBucketModal={createBucketModal} />}
    </InvitationPage2>
  );
}
