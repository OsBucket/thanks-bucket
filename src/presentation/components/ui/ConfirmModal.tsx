import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

interface ModalWrapperProps {
  children: React.ReactNode;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children }) => {
  if (window === undefined) return null;
  return <>{createPortal(children, document.body)}</>;
};

interface ConfirmModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  onConfirm?: () => void;
  modalMessage?: string;
  headerMessage?: string;
  isLoading?: boolean;
  hasCancelBtn?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  headerMessage,
  modalMessage,
  closeModal,
  onConfirm,
  isLoading,
  hasCancelBtn = false,
  children
}) => {
  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <ModalWrapper>
      <div
        onClick={backdropClick}
        className="bg-[#2f2f2f] bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-3xl bg-white p-5 min-w-[300px]">
          {children ? (
            children
          ) : (
            <>
              {headerMessage && (
                <div className="border-b pb-2">
                  <p className="text-xl">{headerMessage}</p>
                </div>
              )}

              <p className="subTitle1 mt-5">{modalMessage}</p>
              <div className="mt-10 flex justify-end">
                {hasCancelBtn && (
                  <Button onClick={() => closeModal()} className="mr-3">
                    취소
                  </Button>
                )}
                <Button
                  isLoading={isLoading}
                  onClick={() => {
                    onConfirm && onConfirm();
                  }}
                >
                  확인
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
