import { FC, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { Button, Portal } from '@/presentation/components/ui';
import { Divider, SearchInput } from '@/presentation/components/common';
import BucketTemplates from '@/presentation/components/BucketTemplates';
import { LoadBucketTemplateList } from '@/domain/usecases';
import MobileHeader from './common/mobile-header';
import { Back } from './common/vectors';

interface BucketNameOverlayProps {
  show: boolean;
  title?: string;
  showTemplate?: boolean;
  closeModal: () => void;
  onSubmit: (name: string, bucketTemplate?: LoadBucketTemplateList.Model) => void;
}

const BucketNameOverlay: FC<BucketNameOverlayProps> = ({ onSubmit, show, closeModal, title, showTemplate }) => {
  const [name, setName] = useState<string>(title ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectTemplate = useCallback(
    (bucketTemplate: LoadBucketTemplateList.Model) => {
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
          show
            ? 'fixed top-0 left-1/2 -translate-x-1/2 z-50 w-screen h-screen max-w-[450px] opacity-100'
            : 'w-0 h-0 opacity-0'
        } bg-white duration-200`}
      >
        <MobileHeader
          headerLeft={<Back onClick={closeModal} />}
          headerRight={
            <Button onClick={handleComplete} className="p-0" variant={'basic'}>
              <span
                className={`body2 ${
                  name.trim().length === 0 ? 'text-gray-500 cursor-default' : 'body2Strong text-blue-400'
                }`}
              >
                완료
              </span>
            </Button>
          }
          title="버킷 이름"
        />
        <section className="pt-[56px] flex flex-col h-full">
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

          <div className="flex flex-col grow pt-6 overflow-y-auto">
            <Divider />
            {showTemplate && (
              <div className="grow flex flex-col px-4">
                <div className="h-[44px] flex items-center">
                  <h2 className="text-gray-500 body1Strong">추천 버킷 리스트에서 찾아보세요 👀</h2>
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
