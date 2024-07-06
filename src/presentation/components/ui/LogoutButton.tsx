'use client';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/services/user';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LogoutButton() {
  const handleLogout = async () => {
    logout();
    deleteCookie('jwt');
    await sleep(500);
  };

  return (
    <Link href={'/'}>
      <Button size={'sm'} className="body1Strong" variant={'outline'} onClick={handleLogout}>
        로그아웃
      </Button>
    </Link>
  );
}

function sleep(second: number) {
  return new Promise((res) => {
    setTimeout(res, second);
  });
}

export default LogoutButton;
