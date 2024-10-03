import { Button } from '@/shared/ui/Button';
import { KAKAO_LOGIN_URL } from '@/features/login';
import Link from 'next/link';

export const WelcomeLoginButton = () => {
  return (
    <Link href={KAKAO_LOGIN_URL} className="w-full">
      <Button className="w-[224px]">
        <span className="subTitle2">계정 만들고 버킷리스트 작성</span>
      </Button>
    </Link>
  );
};