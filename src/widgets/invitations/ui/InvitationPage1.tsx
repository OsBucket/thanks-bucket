'use client';

import { FullHeightPage } from '@/widgets/full-height-page';
import Image from 'next/image';
import { Invitation } from '@/entities/invitation/api/invitation.type';

interface Props {
  invitation?: Invitation;
  children?: React.ReactNode;
}

export const InvitationPage1 = ({ invitation, children }: Props) => {
  return (
    <FullHeightPage className="flex justify-center gap-[20px] bg-custom-gradient">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 116 }}
        src={'/images/invitation/invitation1-1.jpeg'}
        alt={'banner1'}
      />

      <div className="flex flex-col gap-4 px-[20px]">
        <span className="text-xl font-bold">① 언제 : {invitation?.invitationWhen}</span>
        <span className="text-xl font-bold">(2) 어디서 : {invitation?.invitationWhere}</span>
        <span className="text-xl font-bold">(2) 무엇을 : {invitation?.invitationWhat}</span>
        <span className="text-xl font-bold">3. 참여자 : {invitation?.invitationWho}</span>
      </div>

      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 186 }}
        src={'/images/invitation/invitation1-2.jpeg'}
        alt={'banner1'}
      />
      {children}
    </FullHeightPage>
  );
};

export default InvitationPage1;
