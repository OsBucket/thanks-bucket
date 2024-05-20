import { cn } from '@/presentation/utils';

interface FullHeightPageProps {
  className?: string;
  children: React.ReactNode;
}

export default function FullHeightPage({ children, className }: FullHeightPageProps) {
  return <div className={cn(className, 'relative h-full flex flex-col')}>{children}</div>;
}
