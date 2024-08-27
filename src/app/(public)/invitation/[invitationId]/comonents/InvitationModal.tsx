'use client';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { Close } from '@/presentation/components/common/vectors';
import { Button, Input, Portal } from '@/presentation/components/ui';
import { cn } from '@/presentation/utils';

interface Props {
  onClose: VoidFunction;
}

interface InvitationFormValues {
  receiver: string;
  when: string;
  what: string;
  where: string;
}

const InvitationModal = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InvitationFormValues>({
    mode: 'onBlur'
  });

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<InvitationFormValues> = (data) => {
    console.log(data);
    shareToReceiver(data);
  };

  const shareToReceiver = async (data: InvitationFormValues) => {
    const { Kakao, location } = window;
    await Kakao.Share.createDefaultButton({
      objectType: 'feed',
      container: '#sharing-btn',
      // serverCallbackArgs: data,
      content: {
        title: `${data.receiver}님께 초대장이 도착했어요 ✉️`,
        description: '초대장을 열어 내용을 확인해보세요.',
        imageUrl: '/images/invitation/invitation1.jpeg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      },
      buttons: [
        {
          title: '초대장 확인하기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com'
          }
        }
      ]
    });
  };

  return (
    <Portal>
      <div
        onClick={backdropClick}
        className="bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
      >
        <div
          className="z-50 absolute top-1/2 -translate-y-1/2 left-1/2
       -translate-x-1/2 rounded-3xl bg-white p-5 min-w-[300px]
       border-2 border-black"
        >
          <div className="text-end">
            <Button onClick={onClose} className="p-0 w-2 h-2" variant={'basic'}>
              <Close />
            </Button>
          </div>
          <div className="mb-4">
            <h1 className="title3">초대장 상세 내용</h1>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id={'receiver'}
              label={'누구에게 보내나요?'}
              register={register}
              placeholder="홍길동, 우리 엄마"
              errors={errors.receiver?.message}
            />
            <InputField
              id={'when'}
              label={'언제 혹은 언제까지 할까요?'}
              register={register}
              placeholder="내 생일, 올해 안에"
              errors={errors.when?.message}
            />
            <InputField
              id={'where'}
              label={'어디서 할까요?'}
              register={register}
              placeholder="우리집, 유럽"
              errors={errors.where?.message}
            />
            <InputField
              id={'what'}
              label={'무엇을 할까요?'}
              register={register}
              placeholder="파자마 파티, 여행"
              errors={errors.what?.message}
            />
            <Button id={'sharing-btn'} type={'submit'} className="w-full">
              카톡으로 초대하기
            </Button>
          </form>
        </div>
      </div>
    </Portal>
  );
};
interface InputFieldProps {
  label: string;
  id: keyof InvitationFormValues;
  register: UseFormRegister<InvitationFormValues>;
  errors?: string;
  placeholder?: string;
}
const InputField = ({ label, id, register, errors, placeholder }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="body1Strong">{label}</label>
      <Input
        id={id}
        variant={'gray'}
        placeholder={placeholder}
        className={cn('h-11', { 'border-red-500': errors })}
        {...register(id, { required: '이 필드는 필수입니다' })}
      />
      {errors && <p className={`caption1Strong text-red-500`}>{errors}</p>}
    </div>
  );
};

export default InvitationModal;
