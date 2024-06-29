'use client';

import { useQuery } from '@tanstack/react-query';

import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';
import { getProfile } from '@/services/user';
import { Button } from '@/presentation/components/ui';
import Home from '@/presentation/pages/home/home';

export default function HomePage() {
  return (
    <BottomTabLayout
      headerLeft={<MainLogo />}
      headerRight={
        <Button size={'sm'} className="body1Strong" variant={'outline'}>
          로그아웃
        </Button>
      }
    >
      <AuthBucketList />
    </BottomTabLayout>
  );
}

function AuthBucketList() {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  return profile && <Home nickname={profile.nickname} />;
}
