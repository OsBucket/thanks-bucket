import { loginUser, signupUser } from '@/services/user';
import { Button } from '@/presentation/components/ui/Button';
import Checkbox from '@/presentation/components/ui/Checkbox';
import ConfirmModal from '@/presentation/components/ui/ConfirmModal';
import { Input } from '@/presentation/components/ui/Input';
import { FC, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import OccupationSelect from './components/OccupationSelect';
import Image from 'next/image';

interface IInputLabelProps {
  id: string;
  label: string;
}

const InputLabel = ({ id, label }: IInputLabelProps) => {
  return (
    <label className="body2Strong" htmlFor={id}>
      {label}
    </label>
  );
};

interface ISignupInput {
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  occupationId: string;
}

const Signup: FC = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [year, setYear] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid }
  } = useForm<ISignupInput>({
    mode: 'onBlur'
  });

  const [agree, setAgree] = useState<{ [key: string]: boolean }>({
    all: false,
    agreement: false
  });
  const [idDuplicationErr, setIdDuplicationErr] = useState(false);

  watch();

  useEffect(() => {
    const value = year;
    if (value?.match(/[^0-9]/i)) {
      setYear(value.replace(/[^0-9]/i, ''));
    }
    if (value?.length && value.length > 4) {
      setYear(year?.slice(0, 4));
    }
  }, [year]);

  const onChangeAgree = (id: string, checked: boolean) => {
    if (id === 'all') {
      setAgree((prev) => {
        return {
          ...prev,
          all: checked,
          age: checked,
          agreement: checked
        };
      });
      return;
    }
    setAgree((prev) => {
      return {
        ...prev,
        [id]: checked
      };
    });
  };

  const onSubmit: SubmitHandler<ISignupInput> = (data) => {
    signupUser({
      memberId: data.id,
      password: data.password,
      nickname: data.nickname,
      occupationId: data.occupationId,
      birthday: year ? `${year}-01-01` : undefined
    })
      .then(() => {
        return loginUser(data.id, data.password);
      })
      .then(() => router.push('/new'))
      .catch((e) => {
        if (e.response?.data.message === '이미 존재하는 회원입니다.') {
          setIdDuplicationErr(true);
        }
      });
  };
  const onError = () => {
    // console.log('error');
  };
  const isPasswordSame = watch('password') === watch('passwordConfirm');

  const isAgreed = () => agree.agreement;

  return (
    <main className="max-w-[450px] px-4">
      <h1 className="title3 py-5"> 시작이 반, 계정 만들기</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <InputLabel id="id" label="아이디" />
          <div className="py-2">
            <Input
              {...register('id', {
                required: true,
                pattern: /^[a-z0-9]{2,10}$/i
              })}
              maxLength={10}
              id="id"
              variant={'gray'}
              type="text"
              className="h-12"
              placeholder="아이디"
            />
          </div>
          <p className={`caption1Strong ${errors.id ? 'text-error' : 'text-[#9E9E9E]'}`}>
            영어 소문자, 숫자로 최대 10자까지 가능해요.
          </p>
        </div>
        <div className="mt-8">
          <InputLabel id="password" label="비밀번호" />
          <div className="pt-2">
            <Input
              {...register('password', {
                minLength: 8,
                required: true
              })}
              id="password"
              variant={'gray'}
              type="password"
              className="h-12"
              placeholder="비밀번호"
            />
          </div>
          <div className="py-2">
            <Input
              {...register('passwordConfirm', {
                required: true,
                minLength: 8
              })}
              id="passwordConfirm"
              variant={'gray'}
              type="password"
              className="h-12"
              placeholder="비밀번호 확인"
            />
          </div>
          {getValues('password') && (
            <p className={`caption1Strong ${isPasswordSame && !errors.password ? 'text-[#00C400]' : 'text-error'}`}>
              {!isPasswordSame
                ? '입력하신 두 비밀번호가 달라요'
                : errors.password
                ? '비밀번호는 최소 8자 이상 입력해주세요'
                : '입력한 두 비밀번호가 일치해요.'}
            </p>
          )}
        </div>
        <div className="mt-8">
          <InputLabel id="name" label="누구의 버킷 리스트인가요?" />
          <div ref={rowRef} className="py-2 flex">
            <div className="grow">
              <Input
                {...register('nickname', {
                  required: true,
                  pattern: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,8}$/i
                })}
                id="name"
                maxLength={8}
                variant={'gray'}
                type="text"
                className="h-12"
                placeholder="닉네임 혹은 이름"
              />
            </div>
            <Image src="/images/icons/signupIcon.svg" className="ml-2" alt="sign-up" />
          </div>
          <p className={`caption1Strong ${errors.nickname ? 'text-error' : 'text-[#9E9E9E]'}`}>
            한글, 영어, 숫자로 2~8자까지 가능해요.
          </p>
        </div>
        <div className="mt-8">
          <InputLabel id="year" label="태어난 연도가 어떻게 되세요? (선택)" />
          <div className="pt-2 flex">
            <Input
              value={year ?? ''}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              min={1900}
              max={2024}
              inputMode="numeric"
              variant={'gray'}
              className={`h-12 flex-grow bg-white text-start flex justify-start`}
              placeholder="2000"
            />
          </div>
        </div>
        <div className="mt-8">
          <InputLabel id="job" label="직무가 어떻게 되세요? (선택)" />
          <div className="pt-2">
            <OccupationSelect selectedOccupation={getValues('occupationId')} {...register('occupationId')} />
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="pb-3 border-b">
            <Checkbox checked={agree.all} onChange={onChangeAgree} id="all" label="전체동의" textClass="body2Strong" />
          </div>
          <div className="pt-3">
            <div className="mt-3">
              <Checkbox
                checked={agree.agreement}
                onChange={onChangeAgree}
                id="agreement"
                label="이용약관 및 개인정보 수집이용 동의"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button disabled={!isValid || !isAgreed()} className="w-full mb-2">
            계정 만들기
          </Button>
        </div>
      </form>

      {idDuplicationErr && (
        <ConfirmModal
          closeModal={() => {
            setIdDuplicationErr(false);
          }}
        >
          <div className="text-center py-3">
            <p className="subTitle1 mb-4">이미 사용중인 아이디에요</p>
            <Button
              className="w-full"
              onClick={() => {
                setIdDuplicationErr(false);
              }}
            >
              확인
            </Button>
          </div>
        </ConfirmModal>
      )}
    </main>
  );
};

export default Signup;
