'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols';
import { Input } from '@/presentation/components/ui/Input';
import { Button } from '@/presentation/components/ui/Button';
import ConfirmModal from '@/presentation/components/ui/ConfirmModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InvalidCredentialsError } from '@/domain/errors';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

interface ILoginInput {
  memberId: string;
  password: string;
}

enum LoginError {
  AUTH_ERROR,
  INPUT_ERROR
}

const Login: FC<Props> = ({ authentication }) => {
  const router = useRouter();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errMsg, setErrMsg] = useState<LoginError>();
  const { register, handleSubmit } = useForm<ILoginInput>();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      await authentication.auth(data);

      router.push('/');
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        setErrMsg(LoginError.AUTH_ERROR);
        setShowErrorModal(true);
      }
    }
  };

  const onError = () => {
    setErrMsg(LoginError.INPUT_ERROR);
    setShowErrorModal(true);
  };

  return (
    <main className="text-center max-w-[450px] px-4">
      <div className="flex justify-center mt-20">
        <Image width={162} height={36} src="images/icons/main-icon.svg" alt="main-icon" />
      </div>
      <div className="mt-5">
        <p className="body1">꿈꾸는 것, 도전하고 싶은 것</p>
        <p className="body2Strong">하나씩 이뤄가는 누군가의 버킷리스트</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mt-10 flex flex-col justify-start">
          <Input
            autoComplete="off"
            variant={'gray'}
            className="h-12"
            placeholder="아이디"
            {...register('memberId', { required: true })}
          />
          <Input
            type="password"
            autoComplete="off"
            variant={'gray'}
            className="mt-3 h-12"
            placeholder="비밀번호"
            {...register('password', { required: true })}
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
      {showErrorModal && (
        <>
          <ConfirmModal
            hasCancelBtn={false}
            closeModal={() => {
              setShowErrorModal(false);
            }}
            modalMessage="존재하는 계정이 없거나 잘못된 비밀번호에요"
          >
            <div className="text-center subTitle1">
              {errMsg === LoginError.AUTH_ERROR ? (
                <>
                  <p>존재하는 계정이 없거나</p>
                  <p>잘못된 비밀번호에요</p>
                </>
              ) : (
                <>
                  <p>아이디와 비밀번호를 </p>
                  <p>모두 입력해주세요</p>
                </>
              )}
            </div>
            <Button onClick={() => setShowErrorModal(false)} className="mt-4 w-full">
              <p className="subTitle2">확인</p>
            </Button>
          </ConfirmModal>
        </>
      )}
    </main>
  );
};

export default Login;
