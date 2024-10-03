import { FC } from 'react';
import { Portal } from '.';
import { Bucket } from '@/entities/bucket';

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
    <Portal>
      <div
        onClick={backdropClick}
        className={`${
          show ? '' : 'hidden'
        } fixed left-0 right-0 top-0 z-50 h-[calc(100%)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 md:inset-0`}
      >
        <div className="absolute bottom-0 w-screen animate-[bottom-sheet-up_200ms_ease-in-out] rounded-t-3xl bg-white">
          <div className="mt-3 px-4">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default BottomModal;
