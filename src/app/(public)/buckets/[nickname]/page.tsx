import MyBucketPage from '@/pages/my-bucket-page/ui/MyBucketPage';
import { cookies } from 'next/headers';
import { BottomNavigation } from '@/widgets/bottom-navigation/ui/BottomNavigation';
import { HeaderLogo } from '@/widgets/header';
import { FullHeightPage } from '@/widgets/full-height-page';

interface Props {
  params: {
    nickname: string;
  };
}

export default function MyBucket({ params }: Props) {
  const { nickname } = params;
  const accessToken = cookies().get('jwt')?.value;

  return (
    <>
      <FullHeightPage>
        <HeaderLogo />
        <main className="relative flex w-full flex-col pb-[100px] pt-[54px]">
          <MyBucketPage nickname={nickname} accessToken={accessToken} />
        </main>
        <BottomNavigation />
      </FullHeightPage>
    </>
  );
}
