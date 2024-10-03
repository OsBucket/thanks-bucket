import { FullHeightPage } from '@/widgets/full-height-page';
import Link from 'next/link';
import Image from 'next/image';

export default function InvitationNewPage() {
  return (
    <FullHeightPage className="flex flex-col justify-center bg-red-100">
      <div className="flex h-[144px] flex-col items-center justify-center gap-[10px]">
        <h1 className="text-center text-lg font-bold">
          친구/가족/연인과
          <br /> 함께 하고 싶은 거 있으신가요?
        </h1>
        <h3 className="text-center text-3xl font-bold">초대장을 보내보세요</h3>
      </div>
      <div className="flex h-[314px] flex-col items-center justify-center gap-[20px]">
        <Link href="/invitations/new1">
          <Image
            className="rounded shadow-custom"
            width={280}
            height={148}
            src={'/images/invitation/invitation1-banner.jpeg'}
            alt={'1'}
          />
        </Link>
        <Link href="/invitations/new2">
          <Image
            className="rounded shadow-custom"
            width={280}
            height={148}
            src={'/images/invitation/invitation2-banner.jpeg'}
            alt={'2'}
          />
        </Link>
      </div>
      <div className="flex h-[90px] items-center justify-center">
        <h2 className="text-3xl font-bold">초대장을 고르세요</h2>
      </div>
    </FullHeightPage>
  );
}
