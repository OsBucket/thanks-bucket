'use client';

import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';
import { Button } from '@/presentation/components/ui';
import Home from '@/presentation/pages/home/home';

interface Props {
  params: {
    nickname: string;
  };
}

export default function MyBucketPage({ params }: Props) {
  const { nickname } = params;
  return (
    <BottomTabLayout
      headerLeft={<MainLogo />}
      headerRight={
        <Button size={'sm'} className="body1Strong" variant={'outline'}>
          로그아웃
        </Button>
      }
    >
      <Home nickname={nickname} />
    </BottomTabLayout>
  );
}
