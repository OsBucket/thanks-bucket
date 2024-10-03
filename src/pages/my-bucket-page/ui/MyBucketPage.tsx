'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import BottomModal from '@/presentation/components/ui/BottomModal';

import { Button } from '@/shared/ui/Button';
import { useDisclosure } from '@/shared/lib/hooks/useDisclosure';
import { ConfirmModal } from '@/presentation/components/ui';
import { deleteBucketById, updateBucketById } from '@/features/change-bucket/api/change-bucket';
import { Bucket } from '@/entities/bucket';
import { Divider } from '@/shared/ui/Divider';
import { MyBucketProfile } from './MyBucketProfile';
import { MyBucketSummary } from '@/pages/my-bucket-page/ui/MyBucketSummary';
import { MyBucketListEmpty } from '@/pages/my-bucket-page/ui/MyBucketListEmpty';
import BucketList from '@/presentation/pages/home/components/BucketList';
import { getBucketsByNicknameQuery } from '@/entities/bucket/api/get-bucket';
import { Snackbar } from '@/shared/ui/Snackbar';

function MyBucketPage({ nickname, accessToken }: { nickname: string; accessToken: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = getBucketsByNicknameQuery(nickname, accessToken);
  const bucketList = data?.content;

  const deleteMutation = useMutation({
    mutationFn: deleteBucketById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
    }
  });

  const router = useRouter();
  const [showClapping, setShowClapping] = useState<boolean>(false);
  const [selectedBucket, setSelectedBucket] = useState<Bucket | null>(null);
  const [selectedMoreBtn, setSelectedMoreBtn] = useState<Bucket | null>(null);

  const deleteModal = useDisclosure();
  const bottomModal = useDisclosure();

  const [showSucessSnackbar, setShowSucessSnackbar] = useState({ show: false, message: '' });

  const selectBucket = (bucket: Bucket) => {
    setSelectedBucket(bucket);
  };

  const doClapping = () => {
    setShowClapping(true);
    setTimeout(() => setShowClapping(false), 1000);
  };

  const clickMoreBtn = (bucket: Bucket) => {
    bottomModal.onOpen();
    setSelectedMoreBtn(bucket);
  };

  const deleteBucket = async () => {
    deleteMutation.mutate(Number(selectedMoreBtn?.id));
    setSelectedMoreBtn(null);
    deleteModal.onClose();
    setShowSucessSnackbar({ show: true, message: '버킷이 삭제되었어요' });
  };

  return (
    <>
      <div className="fixed z-40 h-[257px] w-full bg-white">
        <div className="flex h-[256px] flex-col">
          <div className="flex h-[248px] flex-col">
            <MyBucketProfile nickname={nickname}></MyBucketProfile>
            {bucketList && <MyBucketSummary myBuckets={bucketList} />}
          </div>
        </div>
        <Divider />
      </div>
      <section className="flex flex-col pt-[257px]">
        {bucketList && bucketList.length === 0 && <MyBucketListEmpty />}
        {bucketList && bucketList.length > 0 && (
          <BucketList
            selectBucket={selectBucket}
            clickMoreBtn={clickMoreBtn}
            doClapping={doClapping}
            bucketList={bucketList}
          />
        )}
      </section>
      <div className="flex flex-col gap-2 bg-gray-200"></div>
      <div className="fixed bottom-[66px] left-1/2 -translate-x-1/2">
        <Button onClick={() => router.push('/buckets/new')}>
          <Image width={16} height={16} src="/images/icons/write.svg" alt="write" />
          <span className="subTitle2 ml-1">버킷 만들기</span>
        </Button>
      </div>
      {showClapping ? (
        <Image
          width={300}
          height={524}
          unoptimized
          className="fixed bottom-24 left-1/2 -translate-x-1/2"
          src="/images/clapping.gif"
          alt="clappingGif"
        />
      ) : null}
      {/*{selectedBucket && (*/}
      {/*  <DetailOverlay*/}
      {/*    bucket={selectedBucket!}*/}
      {/*    changeBucketStatusMutation={changeBucketStatusMutation}*/}
      {/*    changeTodoStatusMutation={changeTodoStatusMutation}*/}
      {/*    closeOverlay={() => setSelectedBucket(null)}*/}
      {/*  />*/}
      {/*)}*/}
      {deleteModal.isOpen && (
        <ConfirmModal closeModal={deleteModal.onClose}>
          <div className="text-center">
            <p className="subTitle1">{`'${selectedMoreBtn?.title}'`}</p>
            <p className="subTitle1">버킷을 지우시겠어요?</p>
            <p className="body1 mt-1">버킷을 지우면 다시 복구할 수 없어요</p>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={deleteModal.onClose} className="mr-2 w-full" variant={'outline'}>
              닫기
            </Button>
            <Button onClick={deleteBucket} className="w-full">
              지우기
            </Button>
          </div>
        </ConfirmModal>
      )}
      <BottomModal
        bucket={selectedMoreBtn!}
        show={bottomModal.isOpen}
        closeModal={() => {
          bottomModal.onClose();
          setSelectedMoreBtn(null);
        }}
      >
        <ul className="body2Strong mb-12">
          <li
            onClick={() => router.push(`/buckets/update/${selectedMoreBtn?.id}`)}
            className="flex h-14 cursor-pointer items-center"
          >
            버킷 수정
          </li>
          <li
            onClick={() => {
              deleteModal.onOpen();
              bottomModal.onClose();
            }}
            className="flex h-14 cursor-pointer items-center"
          >
            버킷 지우기
          </li>
        </ul>
      </BottomModal>
      {/*</main>*/}
      <Snackbar
        message={showSucessSnackbar.message}
        show={showSucessSnackbar.show}
        closeSnackbar={() => setShowSucessSnackbar({ show: false, message: '' })}
      />
    </>
  );
}

export default MyBucketPage;
