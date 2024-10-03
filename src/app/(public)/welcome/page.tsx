import MainLogo from '@/shared/ui/MainLogo';
import Image from 'next/image';
import { BottomNavigation } from '@/widgets/bottom-navigation/ui/BottomNavigation';
import { WelcomeLoginButton } from '../../../features/login';
import { FullHeightPage } from '@/widgets/full-height-page';
import { HeaderLogo } from '@/widgets/header/ui/HeaderLogo';

export default function WelcomePage() {
  return (
    <FullHeightPage>
      <HeaderLogo />
      <main className="flex flex-1 flex-col overflow-scroll overflow-x-hidden py-[54px]">
        <div className="w-screen">
          <div className="relative flex h-[300px] w-full justify-center">
            <div className="absolute bottom-0 h-[256px] w-[256px]">
              <Image fill src="/images/landing-basket.png" alt="basket" />
            </div>
            <div className="absolute left-[-24px] top-[196px] h-[100px] w-[160px]">
              <Image fill src="/images/landing-left-cloud.png" alt="landing-left-cloud" />
            </div>
            <div className="absolute right-[-24px] top-[156px] h-[88px] w-[140px]">
              <Image fill src="/images/landing-right-cloud.png" alt="landing-right-cloud" />
            </div>
            <div className="absolute left-[64px] top-[-12px] h-[168px] w-[104px]">
              <Image fill src="/images/landing-tennis.png" alt="welcome" />
            </div>
            <div className="absolute left-[64px] top-[40px] h-[168px] w-[104px]">
              <Image fill src="/images/landing-money.png" alt="welcome" />
            </div>
            <div className="absolute right-[64px] h-[134px] w-[180px]">
              <Image fill src="/images/landing-pallete.png" alt="welcome" />
            </div>
          </div>
          <div className="flex h-[138px] w-full flex-col items-center justify-center text-center">
            <MainLogo />
            <h2 className="subTitle1 pt-[10px]">
              작심삼일은 이제 그만, <br /> 올해 버킷리스트 이젠 이뤄보세요!
            </h2>
          </div>

          <div className="mb-24 flex flex-col gap-[64px]">
            <div className="flex w-full flex-col items-center gap-[24px]">
              <Image width={160} height={160} src={'/images/note.png'} alt={'note'} />
              <div className="flex flex-col gap-1 text-center">
                <p className="caption1">다이어리, 수첩에 세웠던 내 목표들...</p>
                <p className="body2Strong">
                  매년 열심히 세운 버킷리스트, <br />잘 달성한 적 있으신가요?
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-4">
              <div className="text-center">
                <p className="subTitle1">
                  2024년 버킷리스트는 <br />
                  땡스버킷과 함께 이뤄보세요!
                </p>
              </div>
              <Image width={160} height={160} src={'/images/plan.png'} alt={'note'} />
              <div className="flex flex-col gap-1 text-center">
                <p className="body2Strong">
                  언제나 세운 계획을 보고 <br />
                  달성 체크할 수 있는 땡스버킷
                </p>
                <p className="caption1">세운 목표를 자주 보고 기억할수록 잘 달성할 수 있어요</p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-4">
              <Image width={160} height={160} src={'/images/remind.png'} alt={'note'} />
              <div className="flex flex-col gap-1 text-center">
                <p className="body2Strong">
                  잘 달성할 수 있도록 <br />
                  목표를 리마인드 해드릴게요
                </p>
                <p className="caption1">3월 중 출시 예정이에요</p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-4">
              <Image width={160} height={160} src={'/images/team.png'} alt={'note'} />
              <div className="flex flex-col gap-1 text-center">
                <p className="body2Strong">
                  당신의 버킷리스트를 이뤄지도록 <br />
                  신기능을 추가해나갈 예정이에요
                </p>
                <p className="caption1">이루다 팀 목표는 당신의 버킷리스트 달성!</p>
              </div>
            </div>
            <div className="text-center">
              <p className="subTitle1">
                시작이 반!
                <br />
                우선 버킷리스트부터 만들어볼까요?
              </p>
            </div>
          </div>
          <div className="fixed bottom-[66px] left-1/2 -translate-x-1/2">
            <WelcomeLoginButton />
          </div>
        </div>
      </main>
      <BottomNavigation />
    </FullHeightPage>
  );
}
