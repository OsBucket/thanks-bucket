'use client';
import { makeLogin } from '@/main/factories/pages/login-factory';
import BottomTabLayout from '@/presentation/components/common/bottom-tab-layout';
import MainLogo from '@/presentation/components/common/main-logo';

export default function LoginPage() {
  return <BottomTabLayout headerLeft={<MainLogo />}>{makeLogin()}</BottomTabLayout>;
}
