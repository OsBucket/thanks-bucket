import { makeLoginValidation } from '@/main/factories/validation';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/presentation/pages/login/login'), { ssr: false });
export const makeLogin = () => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />;
};
