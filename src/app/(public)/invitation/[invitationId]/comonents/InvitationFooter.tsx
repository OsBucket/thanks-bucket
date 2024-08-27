'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/presentation/components/ui';
import InvitationModal from './InvitationModal';

const InvitationFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="absolute bottom-0 flex justify-center items-center h-[88px] w-full gap-[12px] px-[20px]">
      <Button variant={'outline'} className="flex-1">
        <Link href={'/invitation'}>다시 고르기</Link>
      </Button>
      <Button className="flex-1" onClick={openModal}>
        초대장 내용 작성
      </Button>
      {isOpen ? <InvitationModal onClose={closeModal} /> : null}
    </div>
  );
};

export default InvitationFooter;
