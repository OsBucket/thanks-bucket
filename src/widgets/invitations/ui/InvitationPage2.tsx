'use client';

import { FullHeightPage } from '@/widgets/full-height-page';
import Image from 'next/image';
import { Invitation } from '@/entities/invitation/api/invitation.type';

interface Props {
  invitation?: Invitation;
  children?: React.ReactNode;
}

export const InvitationPage2 = ({ invitation, children }: Props) => {
  return (
    <FullHeightPage className="flex items-center justify-center gap-[20px]">
      <Image layout="fill" objectFit="cover" src={'/images/invitation/invitation2-1.png'} alt={'banner2'} />

      <div className="z-0 flex flex-col items-center justify-center gap-4 px-[20px]">
        <span className="text-center font-serif text-4xl font-bold">
          {invitation?.invitationWho && (
            <>
              {invitation?.invitationWho},
              <hr />
            </>
          )}
          당신을 초대합니다
        </span>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <Image width={16} height={16} src={'/images/icons/flower.svg'} alt={'flower'}></Image>
            <span className="font-serif text-sm font-bold">일시</span>
            <span className="font-serif text-sm font-bold">{invitation?.invitationWhen}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image width={16} height={16} src={'/images/icons/flower.svg'} alt={'flower'}></Image>
            <span className="font-serif text-sm font-bold">장소</span>
            <span className="font-serif text-sm font-bold">{invitation?.invitationWhere}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image width={16} height={16} src={'/images/icons/flower.svg'} alt={'flower'}></Image>
            <span className="font-serif text-sm font-bold">함께 할 일</span>
            <span className="font-serif text-sm font-bold">{invitation?.invitationWhat}</span>
          </div>
        </div>
      </div>

      {children}
    </FullHeightPage>
  );
};
