import MainLogo, { LogoProps } from '@/shared/ui/MainLogo';

export const HeaderLogo = ({ variant }: LogoProps) => {
  return (
    <header className="fixed left-0 top-0 z-30 flex h-[54px] w-full items-center bg-white px-4">
      <MainLogo variant={variant} />
    </header>
  );
};
