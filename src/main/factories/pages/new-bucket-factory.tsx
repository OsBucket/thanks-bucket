import dynamic from 'next/dynamic';

const NewBucket = dynamic(() => import('@/presentation/pages/new-bucket/new-bucket'), { ssr: false });
export const makeNewBucket = () => {
  return <NewBucket />;
};
