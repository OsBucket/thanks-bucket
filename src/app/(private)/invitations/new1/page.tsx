'use client';

import CreateInvitationFooter from '@/features/invitation/ui/CreateInvitationFooter';
import { useDisclosure } from '@/shared/lib/hooks/useDisclosure';
import { CreateBucketModal } from '@/features/invitation/ui/CreateBucketModal';
import { InvitationPage1 } from '@/widgets/invitations';

export default function NewInvitationPage1() {
  const createBucketModal = useDisclosure();

  return (
    <InvitationPage1>
      <CreateInvitationFooter onOpenCreateBucketModal={createBucketModal.onOpen} invitationType={1} />
      {createBucketModal.isOpen && <CreateBucketModal createBucketModal={createBucketModal} />}
    </InvitationPage1>
  );
}
