import { cn } from '@/shared/lib/TailwindMerge';

interface FullHeightPageProps {
  className?: string;
  children: React.ReactNode;
}

export function FullHeightPage({ children, className }: FullHeightPageProps) {
  return <div className={cn('relative flex w-full flex-col', className)}>{children}</div>;
}
