import { Button } from '@/shared/ui/Button';
import { Kakao } from '@/shared/ui';
import { KAKAO_LOGIN_URL } from '@/features/login';
import Link from 'next/link';

export const HomeLoginButton = () => {
  return (
    <Link href={KAKAO_LOGIN_URL} className="w-full">
      <Button
        variant={'basic'}
        className="body2Strong relative flex h-[48px] w-full items-center justify-center rounded-3xl bg-yellow-500 px-[20px]"
      >
        <Kakao className="absolute left-[20px]" />
        카카오로 계속하기
      </Button>
    </Link>
  );
};
