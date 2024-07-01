import Image from 'next/image';

import { FullHeightPage } from '@/presentation/components/common';
import MainLogo from '@/presentation/components/common/main-logo';
import MobileHeader from '@/presentation/components/common/mobile-header';
import { ArrowDown, Kakao } from '@/presentation/components/common/vectors';
import { Button } from '@/presentation/components/ui';
import Link from 'next/link';

function OnBoardingPage() {
  const sections = [
    { header1: '마음 속에 있던 버킷리스트', header2: '이제 시작해볼까?', image: 'vision-board.png' },
    { header1: '이루고 싶은', header2: '버킷 리스트를 만들고', image: 'on-boarding1.png' },
    { header1: '세부 TO DO LIST를 세워', header2: '체계적으로 이루는 버킷리스트', image: 'on-boarding2.png' },
    { header1: '잊혀지지 않게', header2: '언제 어디서나 모아보고', image: 'on-boarding3.png' },
    { header1: '친구, 가족, 연인과', header2: '함께 이루는 쉐어 버킷 시스트', image: 'on-boarding4.gif' }
  ];
  return (
    <FullHeightPage>
      <MobileHeader headerLeft={<MainLogo />} />
      <main className="relative flex flex-col w-full grow pt-[54px]">
        <footer className="z-10 fixed bottom-0 h-[148px] w-full bg-gradient-to-b from-transparent to-white">
          <div className="flex flex-col items-center gap-1 px-4">
            <Button variant={'basic'} className="p-0">
              <ArrowDown />
            </Button>
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`} className="w-full">
              <Button
                variant={'basic'}
                className="relative flex items-center justify-center w-full h-[48px] px-[20px] body2Strong rounded-3xl bg-yellow-500"
              >
                <Kakao className="absolute left-[20px]" />
                카카오로 계속하기
              </Button>
            </Link>
            <Link href={'/'} className="w-full">
              <Button size={'sm'} variant={'basic'} className="w-full">
                로그인없이 먼저 둘러보기
              </Button>
            </Link>
          </div>
        </footer>
        {sections.map(({ header1, header2, image }, index) => (
          <Section key={header1} first={index === 0} header1={header1} header2={header2} image={image} />
        ))}
      </main>
    </FullHeightPage>
  );
}

interface SectionProps {
  header1: string;
  header2: string;
  image: string;
  first: boolean;
}

function Section({ header1, header2, image, first }: SectionProps) {
  return (
    <section className="flex flex-col shrink-0" style={{ height: 'calc(100dvh - 54px)' }}>
      <div className="flex justify-center items-center h-[136px]">
        <h1 className="title3 text-center">
          {header1} <br /> {header2}
        </h1>
      </div>
      <div className={`relative grow justify-center`}>
        <Image
          fill
          alt={image}
          src={`/images/on-boarding/${image}`}
          style={{ padding: `0 ${first ? '16px' : '40px'}` }}
        />
      </div>
    </section>
  );
}

export default OnBoardingPage;
