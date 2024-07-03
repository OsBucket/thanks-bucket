import BottomNavigation from './bottom-navigation';
import FullHeightPage from './full-height-page';
import MobileHeader from './mobile-header';

interface BottomTabLayoutProps {
  children: React.ReactNode;
  hasBackButton?: boolean;
  onGoBack?(): void;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export default function BottomTabLayout({ children, headerLeft, headerRight }: BottomTabLayoutProps) {
  return (
    <FullHeightPage>
      <MobileHeader headerLeft={headerLeft} headerRight={headerRight} />
      <main className="flex flex-col flex-1 py-[54px] overflow-scroll overflow-x-hidden">{children}</main>
      <BottomNavigation />
    </FullHeightPage>
  );
}
