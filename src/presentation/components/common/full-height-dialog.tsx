import { ReactNode } from 'react';
import { Close } from './vectors';
import FullHeightPage from './full-height-page';
import MobileHeader from './mobile-header';
import { Button } from '../ui';

interface FullHeightDialogProps {
  title?: string;
  children: ReactNode;
  onGoback?: VoidFunction;
}

export default function DialogLagout({ title, children, onGoback }: FullHeightDialogProps) {
  return (
    <FullHeightPage>
      <MobileHeader
        title={title}
        headerLeft={
          <Button size={'basic'} variant={'basic'}>
            <Close onClick={onGoback} />
          </Button>
        }
      />
      <div className="pt-[56px] px-4">{children}</div>
    </FullHeightPage>
  );
}
