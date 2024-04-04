import { Button } from '@/presentation/components/ui/Button';
import { ModalWrapper } from '@/presentation/components/ui/ConfirmModal';
import { Input } from '@/presentation/components/ui/Input';
import { FC, useEffect, useRef, useState } from 'react';

interface BucketNameOverlayProps {
  show: boolean;
  title?: string;
  closeModal: () => void;
  onSubmit?: (name: string) => void;
}

const BucketNameOverlay: FC<BucketNameOverlayProps> = ({ onSubmit, show, closeModal, title }) => {
  const [name, setName] = useState<string>(title ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

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
            <img src="/back.svg" />
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
        <section className="px-4">
          <div className="my-2">
            <Input
              ref={inputRef}
              clearBtn
              maxLength={30}
              onClearText={() => setName('')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="body2Strong"
              variant={'underline'}
              placeholder="버킷 이름"
            />
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
};

export default BucketNameOverlay;
