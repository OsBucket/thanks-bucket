'use client';

import { cn } from '@/shared/lib/TailwindMerge';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'h-12 py-3 px-4 border border-black active:scale-95 inline-flex items-center justify-center rounded-4xl text-sm font-medium transition-colors  disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        outline: 'bg-white text-black border border-gray-300',
        basic: 'bg-transparent border-none text-black'
      },
      size: {
        basic: 'h-0 p-0',
        default: 'h-12 py-3 px-4',
        sm: 'py-[6px] px-[12px] h-[34px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} disabled={isLoading} {...props}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
