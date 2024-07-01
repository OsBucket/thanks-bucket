import { cn } from '@/presentation/utils';

interface FullHeightPageProps {
  className?: string;
  children: React.ReactNode;
}

export default function FullHeightPage({ children, className }: FullHeightPageProps) {
  return <div className={cn(className, 'relative h-dvh flex flex-col')}>{children}</div>;
}
