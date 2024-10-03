'use client';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { Close } from '@/shared/ui';
import { Portal } from '@/presentation/components/ui';
import { cn } from '@/shared/lib/TailwindMerge';
import { Button } from '@/shared/ui/Button';
import { LegacyInput } from '@/shared/ui/LegacyInput';
import { useMutation } from '@tanstack/react-query';
import { createInvitation, CreateInvitationValue } from '@/entities/invitation/api/invitation.api';

interface Props {
  onClose: VoidFunction;
  onOpenCreateBucketModal: VoidFunction;
  invitationType: 1 | 2;
}

const InvitationModal = ({ onClose, onOpenCreateBucketModal, invitationType }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateInvitationValue>({
    mode: 'onBlur'
  });

  const useCreateInvitation = useMutation({
    mutationFn: createInvitation,
    onSuccess: () => {
      onClose();
    }
  });

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const shareKakao = (invitationId: number) => {
    if (invitationType === 1) {
      window.Kakao.Share.sendCustom({
        templateId: process.env.KAKAO_SHARE_INVITATION_1_TEMPLATE_ID,
        templateArgs: {
          invitationId: invitationId
        }
      });
    }
    if (invitationType === 2) {
      window.Kakao.Share.sendCustom({
        templateId: process.env.KAKAO_SHARE_INVITATION_2_TEMPLATE_ID,
        templateArgs: {
          invitationId: invitationId
        }
      });
    }
  };

  const onSubmit: SubmitHandler<CreateInvitationValue> = async (data) => {
    data.invitationType = invitationType;
    const invitationId = await useCreateInvitation.mutateAsync(data);
    shareKakao(invitationId);
    onOpenCreateBucketModal();
  };

  return (
    <Portal>
      <div
        onClick={backdropClick}
        className="fixed left-0 right-0 top-0 z-50 h-[calc(100%)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 md:inset-0"
      >
        <div className="absolute left-1/2 top-1/2 z-50 min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-black bg-white p-5">
          <div className="text-end">
            <Button className="h-2 w-2 p-0" variant={'basic'}>
              <Close onClick={onClose} />
            </Button>
          </div>
          <div className="mb-4">
            <h1 className="title3">초대장 상세 내용</h1>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id={'invitationWho'}
              label={'누구에게 보내나요?'}
              register={register}
              placeholder="홍길동, 우리 엄마"
              errors={errors.invitationWho?.message}
            />
            <InputField
              id={'invitationWhen'}
              label={'언제 혹은 언제까지 할까요?'}
              register={register}
              placeholder="내 생일, 올해 안에"
              errors={errors.invitationWhen?.message}
            />
            <InputField
              id={'invitationWhere'}
              label={'어디서 할까요?'}
              register={register}
              placeholder="우리집, 유럽"
              errors={errors.invitationWhere?.message}
            />
            <InputField
              id={'invitationWhat'}
              label={'무엇을 할까요?'}
              register={register}
              placeholder="파자마 파티, 여행"
              errors={errors.invitationWhat?.message}
            />
            <Button id="kakaotal-sharing-btn" type={'submit'} className="w-full">
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
  id: keyof CreateInvitationValue;
  register: UseFormRegister<CreateInvitationValue>;
  errors?: string;
  placeholder?: string;
}

const InputField = ({ label, id, register, errors, placeholder }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="body1Strong">{label}</label>
      <LegacyInput
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
