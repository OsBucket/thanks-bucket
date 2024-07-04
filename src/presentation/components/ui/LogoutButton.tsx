'use client';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/services/user';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    deleteCookie('jwt');
    await sleep1Second();
    router.push('/');
    await logout();
  };

  return (
    <Button size={'sm'} className="body1Strong" variant={'outline'} onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

function sleep1Second() {
  return new Promise((res) => {
    setTimeout(res, 1000);
  });
}

export default LogoutButton;
