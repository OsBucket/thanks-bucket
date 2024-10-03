import { BottomNavigation } from '@/widgets/bottom-navigation/ui/BottomNavigation';
import { HeaderLogo } from '@/widgets/header';
import { FullHeightPage } from '@/widgets/full-height-page';
import MyBucketPage from '@/widgets/my-bucket/ui/MyBucketPage';

interface Props {
  params: {
    nickname: string;
  };
}

export default function MyBucket({ params }: Props) {
  const { nickname } = params;

  return (
    <>
      <FullHeightPage>
        <HeaderLogo />
        <main className="relative flex w-full flex-col pb-[100px] pt-[54px]">
          <MyBucketPage nickname={nickname} />
        </main>
        <BottomNavigation />
      </FullHeightPage>
    </>
  );
}
