import { signupUser } from '@/services/user';
import { ConfirmModal } from '@/presentation/components/ui';
import CheckboxLegacy from '@/presentation/components/ui/CheckboxLegacy';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getOccupations } from '@/services/bucket';
import { LegacyInput } from '@/shared/ui/LegacyInput';
import { Button } from '@/shared/ui/Button';

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
  nickname: string;
  birthday?: string;
  occupationId?: string;
  discoveryPath?: string;
}

const Signup: FC = () => {
  const router = useRouter();
  const [year, setYear] = useState<string | undefined>(undefined);

  const params = useSearchParams();
  const accessToken = params?.get('access_token');

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
        nickname: data.nickname,
        occupationId: data.occupationId,
        birthday: year ? `${year}-01-01` : undefined,
        discoveryPath: data.discoveryPath
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
        <div className="mt-8">
          <InputLabel id="nickname" label="누구의 버킷 리스트인가요?" />
          <div className="flex py-2">
            <div className="grow">
              <LegacyInput
                {...register('nickname', {
                  required: true,
                  pattern: /^[a-zA-Z0-9]{2,8}$/i
                })}
                id="nickname"
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
            영어, 숫자로 2~8자까지 가능해요.
          </p>
        </div>
        <div className="mt-8">
          <InputLabel id="year" label="태어난 연도가 어떻게 되세요? (선택)" />
          <div className="flex pt-2">
            <LegacyInput
              value={year ?? ''}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              min={1900}
              max={2024}
              inputMode="numeric"
              variant={'gray'}
              className={`flex h-12 flex-grow justify-start bg-white text-start`}
              placeholder="2000"
            />
          </div>
        </div>
        <div className="mt-8">
          <InputLabel id="job" label="직무가 어떻게 되세요? (선택)" />
          <div className="pt-2">
            <select
              {...register('occupationId')}
              className={`border-text-gray-400 h-12 w-full appearance-none rounded-5xl border-2 bg-white px-4 py-[5px] focus:outline-none ${!getValues('occupationId') ? 'text-gray-400' : ''} `}
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
        <div className="mt-8">
          <div className={`flex items-center`}>
            <Image width={90} height={24} src="/images/icons/main-icon-gray.svg" className="mr-2" alt="0'sBucket" />
            <InputLabel id="discovery-path" label=" 을 어떻게 알게되셨나요? (선택)" />
          </div>
          <div className="flex pt-2">
            <LegacyInput
              {...register('discoveryPath')}
              id="discovery-path"
              maxLength={150}
              variant={'gray'}
              type="text"
              className="h-12"
              placeholder="친구 추천, 검색 등"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="border-b pb-3">
            <CheckboxLegacy
              checked={agree.all}
              onChange={onChangeAgree}
              id="all"
              label="전체동의"
              textClass="body2Strong"
            />
          </div>
          <div className="pt-3">
            <div className="mt-3">
              <CheckboxLegacy
                checked={agree.agreement}
                onChange={onChangeAgree}
                id="agreement"
                label="이용약관 및 개인정보 수집이용 동의"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button disabled={!isValid || !isAgreed()} className="mb-2 w-full">
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
          <div className="py-3 text-center">
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
