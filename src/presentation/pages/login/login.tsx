'use client';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols';
import { Input } from '@/presentation/components/ui/Input';
import { Button } from '@/presentation/components/ui/Button';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { loginState } from './components/atoms';
// import { currentAccountState } from '@/presentation/components';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: FC<Props> = ({ authentication, validation }) => {
  const router = useRouter();

  const [state, setState] = useRecoilState(loginState);
  const resetLoginState = useResetRecoilState(loginState);
  // const { setCurrentAccount } = useRecoilValue(currentAccountState);

  useEffect(() => resetLoginState(), []);
  useEffect(() => validate('id'), [state.memberId]);
  useEffect(() => validate('password'), [state.password]);

  const validate = (field: string): void => {
    const { memberId, password } = state;
    const formData = { memberId, password };
    setState((old) => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }));
    setState((old) => ({ ...old, isFormInvalid: !!old.memberIdError || !!old.passwordError }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState((old) => ({ ...old, isLoading: true }));
      const { memberId, password } = state;

      const res = await authentication.auth({ memberId, password });
      console.log({ res });
      router.push('/');
    } catch (error) {
      const e = error as unknown as { message: string };
      setState((old) => ({ ...old, isLoading: false, mainError: e.message }));
    }
  };

  return (
    <main className="text-center max-w-[450px] px-4">
      <div className="flex justify-center mt-20">
        <img src="/images/icons/main-icon.svg" alt="main-image" />
      </div>
      <div className="mt-5">
        <p className="body1">꿈꾸는 것, 도전하고 싶은 것</p>
        <p className="body2Strong">하나씩 이뤄가는 누군가의 버킷리스트</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mt-10 flex flex-col gap-3 justify-start">
          <Input
            name="memberId"
            value={state.memberId}
            autoComplete="off"
            variant="gray"
            className="h-12"
            placeholder="아이디"
            onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
          />
          <Input
            type="password"
            name="password"
            value={state.password}
            autoComplete="off"
            variant="gray"
            className="h-12"
            placeholder="비밀번호"
            onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="mt-5">
          <Button className="w-full">
            <span className="subTitle2">로그인</span>
          </Button>
          <Button onClick={() => router.push('/signup')} className="mt-3 w-full" variant={'outline'}>
            <span className="subTitle2">회원가입</span>
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
