import Image from 'next/image';

interface Props {
  variant?: 'primary' | 'secondary';
}
export default function MainLogo({ variant = 'primary' }: Props) {
  const image = {
    primary: 'main-icon.svg',
    secondary: 'main-icon-gray.svg'
  };
  return <Image width={90} height={20} src={`/images/icons/${image[variant]}`} alt="main-icon" />;
}
