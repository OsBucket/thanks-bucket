import { ReactNode } from 'react';
import { FullHeightPage } from '@/widgets/full-height-page';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button';
import MobileHeader from '@/widgets/full-height-page/ui/mobile-header';

interface FullHeightDialogProps {
  title?: string;
  children: ReactNode;
  onGoback?: VoidFunction;
}

export const FullHeightDialog = ({ title, children, onGoback }: FullHeightDialogProps) => {
  return (
    <FullHeightPage>
      <MobileHeader
        title={title}
        headerLeft={
          <Button size={'basic'} variant={'basic'}>
            <Image width={20} height={20} src={'/images/icons/back-icon.svg'} alt={'back'} onClick={onGoback} />
          </Button>
        }
      />
      <div className="pt-[60px]">{children}</div>
    </FullHeightPage>
  );
};
