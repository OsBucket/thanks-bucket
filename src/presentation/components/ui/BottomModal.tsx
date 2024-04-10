import { FC } from 'react';
import { ModalWrapper } from './ConfirmModal';
import { Bucket } from '@/domain/models/bucket-model';

interface BottomModalProps {
  show: boolean;
  closeModal: () => void;
  bucket: Bucket;
  children: React.ReactNode;
}

const BottomModal: FC<BottomModalProps> = ({ show, closeModal, children }) => {
  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <ModalWrapper>
      <div
        onClick={backdropClick}
        className={`${
          show ? '' : 'hidden'
        } bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}
      >
        <div className="absolute bottom-0 rounded-t-3xl animate-[bottom-sheet-up_200ms_ease-in-out] bg-white w-screen">
          <div className="mt-3 px-4">{children}</div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BottomModal;
