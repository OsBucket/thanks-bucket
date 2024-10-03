import Image from 'next/image';
import { Button } from '@/shared/ui/Button';
import { FC } from 'react';

interface MyBucketProfileProps {
  nickname: string;
}

export const MyBucketProfile: FC<MyBucketProfileProps> = ({ nickname }) => {
  const shareKakao = (nickName: string) => {
    window.Kakao.Share.sendCustom({
      templateId: process.env.KAKAO_SHARE_MY_BUCKET_TEMPLATE_ID,
      templateArgs: {
        NICK_NAME: nickName
      }
    });
  };

  return (
    <>
      <div className="h-[182px]">
        <div className="flex h-[124px] flex-col gap-3 px-4 py-3">
          <div className="flex h-[48px] items-center gap-3">
            <Image width={48} height={48} src={'/images/icons/default-profile-image.svg'} alt="" />
            <div className="right-0 h-[28px] w-[283px] gap-0.5">
              <div className="flex h-[28px] w-[151px] flex-row items-center gap-1">
                <div className="title3">{nickname}</div>
                <Image width={75} height={20} src="/images/icons/home-main.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="body1 min-h-[40px] overflow-hidden">{'안녕하세요!'}</div>
        </div>
        <div className="h-[58px] gap-2 px-4 py-3">
          <div className="flex h-[34px] items-center justify-center gap-2">
            <Button
              variant={'outline'}
              size={'sm'}
              className={'body1Strong flex basis-1/2 items-center justify-center'}
            >
              <Image width={16} height={16} src={'/images/icons/pencil-icon.svg'} alt={''} />
              프로필 수정
            </Button>
            <Button
              id="my-bucket-share-btn"
              onClick={() => shareKakao(nickname)}
              variant={'outline'}
              size={'sm'}
              className={'body1Strong flex basis-1/2 items-center justify-center'}
            >
              <Image width={16} height={16} src={'/images/icons/share-icon.svg'} alt={''} />내 버킷 공유
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
