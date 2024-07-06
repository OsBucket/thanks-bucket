'use client';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/services/user';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    deleteCookie('jwt');
    await sleep(500);
    router.push('/');
  };

  return (
    <Button size={'sm'} className="body1Strong" variant={'outline'} onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

function sleep(second: number) {
  return new Promise((res) => {
    setTimeout(res, second);
  });
}

export default LogoutButton;
