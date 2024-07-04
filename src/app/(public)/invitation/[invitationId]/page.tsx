import { FullHeightPage } from '@/presentation/components/common';
import Image from 'next/image';

function InvitationDetailPage() {
  return (
    <FullHeightPage className="flex justify-center gap-[20px] bg-custom-gradient">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 116 }}
        src={'/images/invitation/invitation1.banner1.jpeg'}
        alt={'banner1'}
      />

      <div className="flex flex-col gap-4 px-[20px]">
        <span className="text-xl font-bold">① 언제 :</span>
        <span className="text-xl font-bold">(2) 어디서 :</span>
        <span className="text-xl font-bold">(2) 무엇을 :</span>
        <span className="text-xl font-bold">3. 참여자 :</span>
      </div>

      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 186 }}
        src={'/images/invitation/invitation1.banner2.jpeg'}
        alt={'banner1'}
      />
    </FullHeightPage>
  );
}

export default InvitationDetailPage;
