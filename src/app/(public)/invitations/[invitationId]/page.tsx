'use client';

import { getInvitationByIdQuery } from '@/entities/invitation/api/invitation.api';
import { useDisclosure } from '@/shared/lib/hooks/useDisclosure';
import { useEffect, useRef } from 'react';
import { InvitationPage1 } from '@/widgets/invitations';
import { CreateBucketModal } from '@/features/invitation/ui/CreateBucketModal';
import { ShareInvitationFooter } from '@/features/invitation/ui/ShareInvitationFooter';
import { InvitationPage2 } from '@/widgets/invitations/ui/InvitationPage2';

interface Props {
  params: {
    invitationId: string;
  };
}

export default function InvitationDetailPage({ params }: Props) {
  const createBucketModal = useDisclosure();
  const invitationId = params.invitationId;
  const { data: invitation } = getInvitationByIdQuery(Number(invitationId));
  const ref = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    ref.current = setInterval(() => {
      createBucketModal.onOpen();
    }, 5000);

    return () => {
      clearTimeout(ref.current);
    };
  }, []);

  const isInvitationType1 = invitation?.invitationType === 1;
  const isInvitationType2 = invitation?.invitationType === 2;

  return (
    <>
      {invitation && isInvitationType1 && (
        <InvitationPage1 invitation={invitation}>
          {createBucketModal.isOpen && <CreateBucketModal createBucketModal={createBucketModal} />}
          <ShareInvitationFooter />
        </InvitationPage1>
      )}
      {invitation && isInvitationType2 && (
        <InvitationPage2 invitation={invitation}>
          {createBucketModal.isOpen && <CreateBucketModal createBucketModal={createBucketModal} />}
          <ShareInvitationFooter />
        </InvitationPage2>
      )}
    </>
  );
}
