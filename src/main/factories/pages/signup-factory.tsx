import dynamic from 'next/dynamic';

const Signup = dynamic(() => import('@/presentation/pages/signup/signup'), { ssr: false });
export const makeSignup = () => {
  return <Signup />;
};
