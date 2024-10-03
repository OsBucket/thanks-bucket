import Image from 'next/image';
import { ArrowDown } from '@/shared/ui';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { FullHeightPage } from '@/widgets/full-height-page';
import { HomeLoginButton } from '@/features/login';
import { HeaderLogo } from '@/widgets/header';

function OnBoardingPage() {
  const sections = [
    { header1: '마음 속에 있던 버킷리스트', header2: '이제 시작해볼까?', image: 'vision-board.png' },
    { header1: '이루고 싶은', header2: '버킷 리스트를 만들고', image: 'on-boarding1.png' },
    { header1: '세부 TO DO LIST를 세워', header2: '체계적으로 이루는 버킷리스트', image: 'on-boarding2.png' },
    { header1: '잊혀지지 않게', header2: '언제 어디서나 모아보고', image: 'on-boarding3.png' },
    { header1: '친구, 가족, 연인과', header2: '함께 이루는 쉐어 버킷 리스트', image: 'on-boarding4.gif' }
  ];
  return (
    <FullHeightPage>
      <HeaderLogo />
      <main className="relative flex w-full grow flex-col pt-[54px]">
        <footer className="fixed bottom-0 z-10 h-[148px] w-full bg-gradient-to-b from-transparent to-white">
          <div className="flex flex-col items-center gap-1 px-4">
            <Button variant={'basic'} className="p-0">
              <ArrowDown />
            </Button>
            <HomeLoginButton />
            <Link href={'/welcome'} className="w-full">
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
    <section className="flex shrink-0 flex-col" style={{ height: 'calc(100dvh - 54px)' }}>
      <div className="flex h-[136px] items-center justify-center">
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
