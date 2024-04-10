import { cn } from '@/presentation/utils';

interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => <div className={cn(className, `w-full h-[1px] bg-gray-200`)} />;

export default Divider;
