'use client';

import { makeSignup } from '@/main/factories/pages/signup-factory';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { FullHeightPage } from '@/widgets/full-height-page';

export default function SignupPage() {
  return (
    <FullHeightPage>
      {makeSignup()}
      <BottomNavigation />
    </FullHeightPage>
  );
};
