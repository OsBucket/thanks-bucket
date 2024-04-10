import Image from 'next/image';
import { FC, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/presentation/components/ui/Button';
import { ModalWrapper } from '@/presentation/components/ui/ConfirmModal';
import { Divider, SearchInput } from '@/presentation/components/ui';
import BucketTemplates from '@/presentation/components/BucketTemplates';
import { LoadBucketTemplateList } from '@/domain/usecases';

interface BucketNameOverlayProps {
  show: boolean;
  title?: string;
  closeModal: () => void;
  onSubmit: (name: string, bucketTemplate?: LoadBucketTemplateList.Model) => void;
}

const BucketNameOverlay: FC<BucketNameOverlayProps> = ({ onSubmit, show, closeModal, title }) => {
  const [name, setName] = useState<string>(title ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectTemplate = useCallback(
    (bucketTemplate: LoadBucketTemplateList.Model) => {
      onSubmit(name, bucketTemplate);
    },
    [name, onSubmit]
  );

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  return (
    <ModalWrapper>
      <div
        className={`${
          show
            ? 'fixed top-0 left-1/2 -translate-x-1/2 z-50 w-screen h-screen max-w-[450px] opacity-100'
            : 'w-0 h-0 opacity-0'
        } bg-white duration-200`}
      >
        <header className="h-[54px] px-2 flex justify-between items-center">
          <Button onClick={closeModal} className="p-0 h-[36px] w-[36px]" variant={'basic'}>
            <Image src="/back.svg" alt="back" width={20} height={20} />
          </Button>
          <p className="body2Strong">버킷 이름</p>
          <Button
            onClick={() => {
              if (name.trim().length === 0) return;
              onSubmit && onSubmit(name);
            }}
            className="p-0"
            variant={'basic'}
          >
            <span
              className={`body2 ${
                name.trim().length === 0 ? 'text-gray-500 cursor-default' : 'body2Strong text-blue-400'
              }`}
            >
              완료
            </span>
          </Button>
        </header>
        <section className="flex flex-col h-full">
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
            <div className="grow flex flex-col px-4">
              <div className="h-[44px] flex items-center">
                <h2 className="text-gray-500 body1Strong">추천 버킷 리스트에서 찾아보세요 👀</h2>
              </div>
              {name.length > 0 && (
                <Suspense fallback={<div>Loading ...</div>}>
                  <BucketTemplates bucketName={name} onSelect={handleSelectTemplate} />
                </Suspense>
              )}
            </div>
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
};

export default BucketNameOverlay;
