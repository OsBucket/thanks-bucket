'use client';

import { cn } from '@/presentation/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { Button } from './Button';

const inputVariants = cva('w-full rounded-5xl py-[5px] px-4 focus:outline-none', {
  variants: {
    variant: {
      default: 'border-2 border-black',
      gray: 'border-2 border-text-gray-400',
      underline: 'rounded-none p-0 py-2 border-b-2 border-text-gray-400'
    }
    // size: {
    //   default: 'h-10 py-2 px-4',
    //   sm: 'h-9 px-2 rounded-md',
    //   lg: 'h-11 px-8 rounded-md',
    // },
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
              <img src="/clearBtn.svg" />
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
