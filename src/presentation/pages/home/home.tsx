'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BottomModal from '@/presentation/components/ui/BottomModal';

import { Snackbar } from '@/presentation/components/ui/Snackbar';
import { Button } from '@/presentation/components/ui/Button';
import { deleteBucketById, getBuckets, updateBucketById } from '@/services/bucket';

import { Bucket } from '@/domain/models/bucket-model';
import DetailOverlay from './components/DetailOverlay';
import BucketList from './components/BucketList';
import { useDisclosure } from '@/presentation/hooks/use-disclosure';
import { LoadingOverlay, ConfirmModal } from '@/presentation/components/ui';

function Home({ nickname, accessToken }: { nickname: string; accessToken?: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['buckets'],
    queryFn: () => getBuckets({ nickname, page: 0, size: 100 }, { headers: { Authorization: accessToken } })
  });
  const { content: bucketList = [] } = data || {};

  const mutation = useMutation({
    mutationFn: deleteBucketById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateBucketById,
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

  const toggleComplete = (id: string, checked: boolean) => {
    const newBucket = bucketList?.find((bucket) => bucket.id === Number(id));
    if (!newBucket) return;

    newBucket.isDone = checked;

    if (checked) {
      setShowClapping(true);
      setTimeout(() => setShowClapping(false), 1000);
    }

    if (!checked && newBucket.bucketTodos.length && newBucket.bucketTodos.every((todo) => todo.isDone)) {
      const lastTodoIndex = newBucket.bucketTodos.length - 1;
      newBucket.bucketTodos[lastTodoIndex].isDone = false;
    }

    updateMutation.mutate({ ...newBucket, topicIds: newBucket.bucketTopics?.map((topic) => topic.id) });
  };

  const clickMoreBtn = (bucket: Bucket) => {
    bottomModal.onOpen();
    setSelectedMoreBtn(bucket);
  };

  const getCompletedBucketPercent = () => {
    if (!bucketList || !bucketList.length) return 0;
    return Math.floor((bucketList.filter((bucket) => bucket.isDone).length / bucketList.length) * 100);
  };

  const deleteBucket = async () => {
    mutation.mutate(Number(selectedMoreBtn?.id));
    setSelectedMoreBtn(null);
    deleteModal.onClose();
    setShowSucessSnackbar({ show: true, message: '버킷이 삭제되었어요' });
  };

  useEffect(() => {
    const updateBucket = window.sessionStorage.getItem('updatedBucket');
    if (updateBucket) {
      setShowSucessSnackbar({ show: true, message: '버킷이 수정되었어요' });
      window.sessionStorage.removeItem('updatedBucket');
    }
  }, []);

  return (
    <div className="px-4">
      <LoadingOverlay show={isLoading} />
      <main className="relative">
        <div className="py-2 text-center">
          <div className="flex justify-center ">
            <h1 className="title3">{nickname ?? ''}</h1>
            <Image width={90} height={24} src="/images/icons/home-main.svg" alt="" />
            <Image width={16} height={16} src="/images/icons/home-star.svg" alt="" />
          </div>
          <div className="mt-3 flex justify-center items-center">
            <div className="w-4 h-4 mt-[3px]">
              <Image width={12} height={12} src="/images/icons/home-flag.svg" alt="" />
            </div>
            <p className="caption1">{`지금까지 총 ${
              bucketList?.length ?? 0
            }개 버킷 중 ${getCompletedBucketPercent()}% 이뤘어요`}</p>
          </div>
        </div>
        <div className="border-[0.5px] mt-2 mb-6"></div>
        <section>
          {bucketList?.length === 0 && (
            <div className="py-14 flex flex-col justify-center items-center">
              <Image src="/images/icons/home-empty.svg" width={40} height={40} alt="home-empty" />
              <p className="body2Strong text-gray-500 mt-3">
                2024년에 이루고 싶은 <br />
                버킷을 만들어 볼까요?
              </p>
            </div>
          )}
          {bucketList && bucketList.length > 0 && (
            <BucketList
              selectBucket={selectBucket}
              clickMoreBtn={clickMoreBtn}
              toggleComplete={toggleComplete}
              bucketList={bucketList}
            />
          )}
        </section>
        <div className="fixed bottom-[66px] left-1/2 -translate-x-1/2">
          <Button onClick={() => router.push('/new')}>
            <Image width={16} height={16} src="/images/icons/write.svg" alt="write" />
            <span className="ml-1 subTitle2">버킷 만들기</span>
          </Button>
        </div>
        {showClapping ? (
          <Image
            width={300}
            height={524}
            unoptimized
            className="fixed left-1/2 -translate-x-1/2 bottom-24"
            src="/images/clapping.gif"
            alt="clappingGif"
          />
        ) : null}
        {selectedBucket && (
          <DetailOverlay
            bucket={selectedBucket!}
            updateMutation={updateMutation}
            closeOverlay={() => setSelectedBucket(null)}
          />
        )}
        {deleteModal.isOpen && (
          <ConfirmModal closeModal={deleteModal.onClose}>
            <div className="text-center">
              <p className="subTitle1">{`'${selectedMoreBtn?.title}'`}</p>
              <p className="subTitle1">버킷을 지우시겠어요?</p>
              <p className="body1 mt-1">버킷을 지우면 다시 복구할 수 없어요</p>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={deleteModal.onClose} className="w-full mr-2" variant={'outline'}>
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
              onClick={() => router.push(`/update/${selectedMoreBtn?.id}`)}
              className="flex items-center h-14 cursor-pointer"
            >
              버킷 수정
            </li>
            <li
              onClick={() => {
                deleteModal.onOpen();
                bottomModal.onClose();
              }}
              className="flex items-center h-14 cursor-pointer"
            >
              버킷 지우기
            </li>
          </ul>
        </BottomModal>
      </main>
      <Snackbar
        message={showSucessSnackbar.message}
        show={showSucessSnackbar.show}
        closeSnackbar={() => setShowSucessSnackbar({ show: false, message: '' })}
      />
    </div>
  );
}

export default Home;
