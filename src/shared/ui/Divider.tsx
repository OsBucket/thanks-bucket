import { cn } from '@/shared/lib/TailwindMerge';

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => <div className={cn(`h-[1px] w-full bg-gray-200`, className)} />;
