'use client';

import MainLogo from '@/shared/ui/MainLogo';
import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/presentation/components/ui';
import { useRouter } from 'next/navigation';

interface Props {
  createBucketModal: { isOpen: boolean; onClose: () => void };
}

export const CreateBucketModal = (props: Props) => {
  const router = useRouter();
  return (
    <ConfirmModal closeModal={props.createBucketModal.onClose}>
      <div className="flex flex-col items-center justify-center gap-10">
        <MainLogo></MainLogo>
        <div className="text-center">
          <p className="subTitle1">
            함께 하기로 한 것을
            <br />
            잊지 않고 하도록,
            <br />
            버킷 리스트에 추가해보세요
          </p>
        </div>
        <Button onClick={() => router.push('/')} className="w-full">
          버킷 리스트 만들기
        </Button>
      </div>
    </ConfirmModal>
  );
};
