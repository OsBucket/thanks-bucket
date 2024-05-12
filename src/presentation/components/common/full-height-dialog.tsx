import { ReactNode } from 'react';
import { Close } from './vectors';
import FullHeightPage from './full-height-page';
import MobileHeader from './mobile-header';

interface FullHeightDialogProps {
  title?: string;
  children: ReactNode;
  onGoback?: VoidFunction;
}

export default function DialogLagout({ title, children, onGoback }: FullHeightDialogProps) {
  return (
    <FullHeightPage>
      <MobileHeader title={title} headerLeft={<Close onClick={onGoback} />} />
      <div className="pt-[56px]">{children}</div>
    </FullHeightPage>
  );
}
