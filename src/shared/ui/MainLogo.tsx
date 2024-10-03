import Image from 'next/image';

export interface LogoProps {
  variant?: 'primary' | 'secondary';
}
export default function MainLogo({ variant = 'primary' }: LogoProps) {
  const image = {
    primary: 'main-icon.svg',
    secondary: 'main-icon-gray.svg'
  };
  return <Image width={90} height={20} src={`/images/icons/${image[variant]}`} alt="main-icon" />;
}
