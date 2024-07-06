'use client';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/services/user';
import { Button } from './Button';
import Link from 'next/link';

function LogoutButton() {
  const handleLogout = () => {
    logout();
    deleteCookie('jwt');
    window.location.href = '/';
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
