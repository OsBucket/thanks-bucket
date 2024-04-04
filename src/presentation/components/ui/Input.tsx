'use client';
import React from 'react';
import Image from 'next/image';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/presentation/lib/utils';
import { Button } from './Button';

const inputVariants = cva('w-full rounded-5xl py-[5px] px-4 focus:outline-none', {
  variants: {
    variant: {
      default: 'border-2 border-black',
      gray: 'border-2 border-text-gray-400',
      underline: 'rounded-none p-0 py-2 border-b-2 border-text-gray-400'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  clearBtn?: boolean;
  onClearText?: () => void;
  value?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, variant, clearBtn, onClearText, onClick, ...props }, ref) => {
    if (clearBtn) {
      return (
        <div className="relative">
          <input className={cn(inputVariants({ variant, className }))} ref={ref} {...props}>
            {children}
          </input>

          {props.value && (
            <Button onClick={onClearText} variant={'basic'} className="p-0 h-0 top-1/2 absolute right-0">
              <Image src="/clearBtn.svg" alt="clear-btn" />
            </Button>
          )}
        </div>
      );
    }
    return (
      <input ref={ref} onClick={onClick} {...props} className={cn(inputVariants({ variant, className }))}>
        {children}
      </input>
    );
  }
);

Input.displayName = 'Input';
