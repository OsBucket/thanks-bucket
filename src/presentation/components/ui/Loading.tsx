'use client';

import Image from 'next/image';
import { FC } from 'react';
import { createPortal } from 'react-dom';

interface LoadingProps {
  show: boolean;
}

const Loading: FC<LoadingProps> = ({ show }) => {
  return (
    <div>
      {show && (
        <div>
          {createPortal(
            <div className="bg-white bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
              <Image
                fill
                unoptimized
                className="absolute left-1/2 top-1/2-translate-x-1/2 -translate-y-1/2 w-20 h-20"
                src="/loading.gif"
                alt="loading"
              />
            </div>,
            document.body
          )}
        </div>
      )}
    </div>
  );
};

export default Loading;
