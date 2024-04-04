import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/presentation/pages/home/home'), { ssr: false });
export const makeHome = () => {
  return <Home />;
};
