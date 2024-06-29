'use client';

import { makeSignup } from '@/main/factories/pages/signup-factory';
import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';

export default function SignupPage() {
  return <BottomTabLayout headerLeft={<MainLogo />}>{makeSignup()}</BottomTabLayout>;
}
