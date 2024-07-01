'use client';

import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';

import { Button } from '@/presentation/components/ui';

import Welcome from '@/presentation/pages/home/components/welcom';

export default function HomePage() {
  return (
    <BottomTabLayout
      headerLeft={<MainLogo />}
      headerRight={
        <Button size={'sm'} className="body1Strong" variant={'outline'}>
          로그인
        </Button>
      }
    >
      <Welcome />
    </BottomTabLayout>
  );
}
