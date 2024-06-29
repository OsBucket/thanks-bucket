'use client';

import Image from 'next/image';
import { FC } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  show: boolean;
}

export const LoadingOverlay: FC<Props> = ({ show }) => {
  return (
    show &&
    createPortal(
      <div className="flex bg-white bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <Image
          width={100}
          height={100}
          unoptimized
          className="absolute left-1/2 top-1/2-translate-x-1/2 -translate-y-1/2 w-20 h-20"
          src="/loading.gif"
          alt="loading"
        />
      </div>,
      document.body
    )
  );
};
