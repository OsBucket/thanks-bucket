import { FC, useEffect } from 'react';
import { Portal } from '.';

interface SnackbarProps {
  children?: React.ReactNode;
  show: boolean;
  delay?: number;
  closeSnackbar: () => void;
  message?: string;
}

export const Snackbar: FC<SnackbarProps> = ({ show, closeSnackbar, delay = 1500, message, children }) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        closeSnackbar();
      }, delay);
    }
  }, [show, closeSnackbar, delay]);

  return (
    show && (
      <Portal>
        <div className={`${show ? 'opacity-100' : 'opacity-0'} fixed bottom-24 left-1/2  w-full -translate-x-1/2`}>
          <div className="flex items-center justify-between  bg-black rounded-xl p-3 mx-4">
            <p className="body1 text-white">{message ? message : '내 버킷리스트에 추가되었어요'}</p>
            {children && children}
          </div>
        </div>
      </Portal>
    )
  );
};
