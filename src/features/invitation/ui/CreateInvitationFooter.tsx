'use client';

import Link from 'next/link';
import { useState } from 'react';
import InvitationModal from './InvitationModal';
import { Button } from '@/shared/ui/Button';

interface Props {
  onOpenCreateBucketModal: VoidFunction;
  invitationType: 1 | 2;
}

const CreateInvitationFooter = ({ onOpenCreateBucketModal, invitationType }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="absolute bottom-0 flex h-[88px] w-full items-center justify-center gap-[12px] px-[20px]">
      <Button variant={'outline'} className="flex-1">
        <Link href={'/invitations/new'}>다시 고르기</Link>
      </Button>
      <Button className="flex-1" onClick={openModal}>
        초대장 내용 작성
      </Button>
      {isOpen ? (
        <InvitationModal
          onClose={closeModal}
          onOpenCreateBucketModal={onOpenCreateBucketModal}
          invitationType={invitationType}
        />
      ) : null}
    </div>
  );
};

export default CreateInvitationFooter;
