import Signup from '@/presentation/pages/signup/signup';
import { Suspense } from 'react';

export const makeSignup = () => {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
};
