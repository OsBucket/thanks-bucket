'use client';

import { FC } from 'react';
import { Portal, Button } from '.';

interface ConfirmModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  onConfirm?: () => void;
  modalMessage?: string;
  headerMessage?: string;
  isLoading?: boolean;
  hasCancelBtn?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
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
    <Portal>
      <div
        onClick={backdropClick}
        className="bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
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
    </Portal>
  );
};
