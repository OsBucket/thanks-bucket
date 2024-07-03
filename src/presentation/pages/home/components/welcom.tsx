import MainLogo from '@/presentation/components/common/main-logo';
import { Button } from '@/presentation/components/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Welcome() {
  return (
    <div className="w-screen">
      <div className="flex justify-center relative w-full h-[300px]">
        <div className="absolute bottom-0 w-[256px] h-[256px]">
          <Image fill src="/images/landing-basket.png" alt="basket" />
        </div>
        <div className="absolute w-[160px] h-[100px] top-[196px] left-[-24px]">
          <Image fill src="/images/landing-left-cloud.png" alt="landing-left-cloud" />
        </div>
        <div className="absolute w-[140px] h-[88px] top-[156px] right-[-24px]">
          <Image fill src="/images/landing-right-cloud.png" alt="landing-right-cloud" />
        </div>
        <div className="absolute w-[104px] h-[168px] top-[-12px] left-[64px]">
          <Image fill src="/images/landing-tennis.png" alt="welcome" />
        </div>
        <div className="absolute w-[104px] h-[168px] top-[40px] left-[64px]">
          <Image fill src="/images/landing-money.png" alt="welcome" />
        </div>
        <div className="absolute w-[180px] h-[134px] right-[64px]">
          <Image fill src="/images/landing-pallete.png" alt="welcome" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center w-full h-[138px]">
        <MainLogo />
        <h2 className="subTitle1 pt-[10px]">
          작심삼일은 이제 그만, <br /> 올해 버킷리스트 이젠 이뤄보세요!
        </h2>
      </div>

      <div className="flex flex-col gap-[64px] mb-24">
        <div className="flex flex-col items-center w-full gap-[24px]">
          <Image width={160} height={160} src={'/images/note.png'} alt={'note'} />
          <div className="flex flex-col text-center gap-1">
            <p className="caption1">다이어리, 수첩에 세웠던 내 목표들...</p>
            <p className="body2Strong">
              매년 열심히 세운 버킷리스트, <br />잘 달성한 적 있으신가요?
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <div className="text-center">
            <p className="subTitle1">
              2024년 버킷리스트는 <br />
              땡스버킷과 함께 이뤄보세요!
            </p>
          </div>
          <Image width={160} height={160} src={'/images/plan.png'} alt={'note'} />
          <div className="flex flex-col text-center gap-1">
            <p className="body2Strong">
              언제나 세운 계획을 보고 <br />
              달성 체크할 수 있는 땡스버킷
            </p>
            <p className="caption1">세운 목표를 자주 보고 기억할수록 잘 달성할 수 있어요</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <Image width={160} height={160} src={'/images/remind.png'} alt={'note'} />
          <div className="flex flex-col text-center gap-1">
            <p className="body2Strong">
              잘 달성할 수 있도록 <br />
              목표를 리마인드 해드릴게요
            </p>
            <p className="caption1">3월 중 출시 예정이에요</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <Image width={160} height={160} src={'/images/team.png'} alt={'note'} />
          <div className="flex flex-col text-center gap-1">
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
        <Link href={'/auth/login'}>
          <Button className="w-[224px]">
            <span className="subTitle2">계정 만들고 버킷리스트 작성</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
