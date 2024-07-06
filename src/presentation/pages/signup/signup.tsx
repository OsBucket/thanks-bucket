import { signupUser } from '@/services/user';
import { Input, Button, ConfirmModal } from '@/presentation/components/ui';
import Checkbox from '@/presentation/components/ui/Checkbox';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getOccupations } from '@/services/bucket';

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
  nickname: string;
  occupationId: string;
}

const Signup: FC = () => {
  const router = useRouter();
  const [year, setYear] = useState<string | undefined>(undefined);

  const params = useSearchParams();
  const accessToken = params.get('access_token');

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid }
  } = useForm<ISignupInput>({
    mode: 'onBlur'
  });

  const { data: occupations } = useQuery({
    queryKey: ['occupations'],
    queryFn: () =>
      getOccupations({
        headers: { Authorization: accessToken }
      })
  });

  const [agree, setAgree] = useState<{ [key: string]: boolean }>({
    all: false,
    agreement: false
  });
  const [idDuplicationErr, setIdDuplicationErr] = useState(false);

  watch();

  const onChangeAgree = (id: string, checked: boolean) => {
    if (id === 'all') {
      setAgree((prev) => {
        return { ...prev, all: checked, age: checked, agreement: checked };
      });
    } else {
      setAgree((prev) => {
        return { ...prev, [id]: checked };
      });
    }
  };

  const onSubmit: SubmitHandler<ISignupInput> = (data) => {
    signupUser(
      {
        memberId: data.id,
        nickname: data.nickname,
        occupationId: data.occupationId,
        birthday: year ? `${year}-01-01` : undefined
      },
      { headers: { Authorization: accessToken } }
    )
      .then((responseAccessToekn) => {
        console.log(responseAccessToekn);
        setCookie('jwt', responseAccessToekn);
        router.push(`/buckets/${data.nickname}`);
      })
      .catch((e) => {
        if (e.response?.data.message === '이미 존재하는 회원입니다.') {
          setIdDuplicationErr(true);
        }
      });
  };

  const onError = () => {
    // console.log('error');
  };

  const isAgreed = () => agree.agreement;

  useEffect(() => {
    const value = year;
    if (value?.match(/[^0-9]/i)) {
      setYear(value.replace(/[^0-9]/i, ''));
    }
    if (value?.length && value.length > 4) {
      setYear(year?.slice(0, 4));
    }
  }, [year]);

  return (
    <main className="px-4">
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
          <p className={`caption1Strong ${errors.id ? 'text-red-500' : 'text-gray-500'}`}>
            영어 소문자, 숫자로 최대 10자까지 가능해요.
          </p>
        </div>

        <div className="mt-8">
          <InputLabel id="name" label="누구의 버킷 리스트인가요?" />
          <div className="py-2 flex">
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
            <Image width={90} height={24} src="/images/icons/signupIcon.svg" className="ml-2" alt="sign-up" />
          </div>
          <p className={`caption1Strong ${errors.nickname ? 'text-red-500' : 'text-gray-500'}`}>
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
            <select
              {...register('occupationId')}
              className={`w-full bg-white h-12 rounded-5xl py-[5px] appearance-none px-4 focus:outline-none border-2 border-text-gray-400
                  ${!getValues('occupationId') ? 'text-gray-400' : ''}
              `}
            >
              <option value="">직무</option>
              {occupations?.map((occupation) => {
                return (
                  <option className="text-black" key={occupation.id} value={occupation.id}>
                    {occupation.name}
                  </option>
                );
              })}
            </select>
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
