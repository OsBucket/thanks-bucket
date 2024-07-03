import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';
import LogoutButton from '@/presentation/components/ui/LogoutButton';
import Home from '@/presentation/pages/home/home';
import { cookies } from 'next/headers';

interface Props {
  params: {
    nickname: string;
  };
}

export default async function MyBucketPage({ params }: Props) {
  const { nickname } = params;

  return (
    <BottomTabLayout headerLeft={<MainLogo />} headerRight={<LogoutButton />}>
      <Home nickname={nickname} accessToken={cookies().get('jwt')?.value} />
    </BottomTabLayout>
  );
}
