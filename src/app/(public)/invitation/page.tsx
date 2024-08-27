import { FullHeightPage } from '@/presentation/components/common';
import Image from 'next/image';
import Link from 'next/link';

function InvitationPage() {
  return (
    <FullHeightPage className="flex justify-center bg-red-100 ">
      <div className="flex flex-col items-center justify-center h-[144px] gap-[10px]">
        <h1 className="text-lg font-bold text-center">
          친구/가족/연인과
          <br /> 함께 하고 싶은 거 있으신가요?
        </h1>
        <h3 className="text-3xl font-bold text-center">초대장을 보내보세요</h3>
      </div>
      <div className="flex flex-col items-center gap-[20px] h-[314px]">
        <Link href="/invitation/1">
          <Image
            className="shadow-custom rounded"
            width={280}
            height={148}
            src={'/images/invitation/invitation1.jpeg'}
            alt={'1'}
          />
        </Link>
        <Link href="/invitation/2">
          <Image
            className="shadow-custom rounded"
            width={280}
            height={148}
            src={'/images/invitation/invitation2.jpeg'}
            alt={'2'}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center h-[90px]">
        <h2 className="text-3xl font-bold">초대장을 고르세요</h2>
      </div>
    </FullHeightPage>
  );
}

export default InvitationPage;
