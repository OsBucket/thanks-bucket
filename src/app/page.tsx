'use client';

import { useRouter } from 'next/navigation';

import { makeHome } from '@/main/factories/pages/home-factory';
import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';
import { Button } from '@/presentation/components/ui/Button';
import { logout } from '@/services/user';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <BottomTabLayout
      headerLeft={<MainLogo />}
      headerRight={
        <Button size={'sm'} onClick={handleLogout} className="body1Strong" variant={'outline'}>
          로그아웃
        </Button>
      }
    >
      {makeHome()}
    </BottomTabLayout>
  );
}
