import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';
import { Button } from '@/presentation/components/ui';
import Welcome from '@/presentation/pages/home/components/welcom';
import Link from 'next/link';

export default function HomePage() {
  return (
    <BottomTabLayout
      headerLeft={<MainLogo />}
      headerRight={
        <Link href={'/auth/login'}>
          <Button size={'sm'} className="body1Strong" variant={'outline'}>
            로그인
          </Button>
        </Link>
      }
    >
      <Welcome />
    </BottomTabLayout>
  );
}
