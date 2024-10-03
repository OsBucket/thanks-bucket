'use client';

import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

export const ShareInvitationFooter = () => {
  return (
    <div className="absolute bottom-0 flex h-[88px] w-full items-center justify-center gap-[12px] px-[20px]">
      <Button variant={'outline'} className="flex-1">
        <Link href={'/invitations/new'}>
          <span className={'subTitle2'}>나도 초대장 보내기</span>
        </Link>
      </Button>
    </div>
  );
};
