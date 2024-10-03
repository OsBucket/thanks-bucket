import { FC, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { Portal } from '@/presentation/components/ui';
import { SearchInput } from '@/presentation/components/common';
import { BucketTemplate } from '@/services/bucket';
import { Divider } from '@/shared/ui/Divider';
import BucketTemplates from '@/entities/buckettemplate/ui/BucketTemplates';
import { Button } from '@/shared/ui/Button';
import MobileHeader from '@/widgets/full-height-page/ui/mobile-header';
import Image from 'next/image';

interface BucketNameOverlayProps {
  show: boolean;
  title?: string;
  showTemplate?: boolean;
  closeModal: () => void;
  onSubmit: (name: string, bucketTemplate?: BucketTemplate) => void;
}

const BucketNameOverlay: FC<BucketNameOverlayProps> = ({ onSubmit, show, closeModal, title, showTemplate }) => {
  const [name, setName] = useState<string>(title ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectTemplate = useCallback(
    (bucketTemplate: BucketTemplate) => {
      onSubmit(name, bucketTemplate);
    },
    [name, onSubmit]
  );

  const handleComplete = () => {
    if (name.trim().length === 0) return;
    onSubmit?.(name);
  };

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  return (
    <Portal>
      <div
        className={`${
          show ? 'fixed left-1/2 top-0 z-50 h-screen w-screen -translate-x-1/2 opacity-100' : 'h-0 w-0 opacity-0'
        } bg-white duration-200`}
      >
        <MobileHeader
          headerLeft={
            <Button size={'basic'} variant={'basic'} onClick={closeModal}>
              <Image width={20} height={20} src={'/images/icons/back-icon.svg'} alt={'back'} />
            </Button>
          }
          headerRight={
            <Button onClick={handleComplete} className="p-0" variant={'basic'}>
              <span
                className={`body2 ${
                  name.trim().length === 0 ? 'cursor-default text-gray-500' : 'body2Strong text-blue-400'
                }`}
              >
                완료
              </span>
            </Button>
          }
          title="버킷 이름"
        />
        <section className="flex h-full flex-col pt-[56px]">
          <div className="px-4">
            <SearchInput
              maxLength={30}
              ref={inputRef}
              onSearch={setName}
              defaultValue={name}
              searchAsYouType
              placeholder="버킷 이름"
              className="body2Strong"
            />
          </div>

          <div className="flex grow flex-col overflow-y-auto pt-6">
            <Divider />
            {showTemplate && (
              <div className="flex grow flex-col px-4">
                <div className="flex h-[44px] items-center">
                  <h2 className="body1Strong text-gray-500">추천 버킷 리스트에서 찾아보세요 👀</h2>
                </div>
                <Suspense fallback={<div>Loading ...</div>}>
                  <BucketTemplates onSelect={handleSelectTemplate} />
                </Suspense>
              </div>
            )}
          </div>
        </section>
      </div>
    </Portal>
  );
};

export default BucketNameOverlay;
