'use client';

import { Button } from '@/shared/ui/Button';
import { LegacyInput } from '@/shared/ui/LegacyInput';
import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useBackPress from '@/shared/lib/hooks/useBackPress';
import Topics from '@/presentation/components/Topics';
import { Topic } from '@/entities/topic/model/Topic';
import { useCreateBucket } from '@/features/change-bucket/api/change-bucket';
import { getMe } from '@/entities/auth';
import { Snackbar } from '@/shared/ui/Snackbar';
import { BucketTemplate } from '@/services/bucket';
import BucketNameOverlay from '@/presentation/components/BucketNameOverlay';

interface NewBucketProps {}

const NewBucket: FC<NewBucketProps> = () => {
  const me = getMe();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { mutate, isError, error } = useCreateBucket();

  const [bucketName, setBucketName] = useState<string>('');
  const [dueDate, setDueDate] = useState('2024-12-31');
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [todoList, setTodoList] = useState<string[]>(['']);

  const [showSucessSnackbar, setShowSucessSnackbar] = useState(false);
  const [showBucketNameModal, setShowBucketNameModal] = useState(false);

  const resetForm = () => {
    setBucketName('');
    setDueDate('2024-12-31');
    setSelectedTopics([]);
    setTodoList(['']);
  };

  const handleBucketSubmit = async () => {
    mutate({
      title: bucketName,
      goalDate: dueDate,
      topicIds: selectedTopics.map((topic) => topic.id),
      bucketTodos: todoList.map((content) => {
        return { content: content };
      })
    });
    if (isError) {
      return;
    }
    setShowSucessSnackbar(true);
    resetForm();
  };

  const handleBucketTemplateSubmit = (name: string, bucketTemplate?: BucketTemplate) => {
    if (bucketTemplate !== undefined) {
      const { bucketName, bucketTodoNames, bucketTemplateTopics } = bucketTemplate;
      setBucketName(bucketName);
      if (bucketTemplateTopics !== null) {
        const topics = bucketTemplateTopics.map((bucketTemplateTopic) => bucketTemplateTopic.topic);
        setSelectedTopics(topics);
      } else {
        setSelectedTopics([]);
      }
      if (bucketTodoNames !== null) {
        const templateTodos = bucketTodoNames.split(', ').map((name) => name);
        setTodoList(templateTodos);
      } else {
        setTodoList(['']);
      }
    } else {
      setBucketName(name);
    }
    setShowBucketNameModal(false);
  };

  const goHome = () => {
    if (me !== undefined) {
      router.push(`/buckets/${me.NICKNAME}`);
    }
  };

  // useBackPress({
  //   backPressed: () => {
  //     if (showBucketNameModal) {
  //       setShowBucketNameModal(false);
  //     } else {
  //       goHome();
  //     }
  //   },
  //   showOverlay: showBucketNameModal
  // });

  return (
    <main>
      <section className="flex w-full flex-col">
        <div className="flex flex-col items-start justify-center gap-5 p-4">
          <div className="flex flex-1 flex-row items-center justify-start">
            <LegacyInput
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              variant={'underline'}
            ></LegacyInput>
            <p className="body1Strong h-[22px] w-[30px]">까지</p>
          </div>
          <LegacyInput
            value={bucketName}
            maxLength={30}
            onChange={() => {}}
            onClick={() => setShowBucketNameModal(true)}
            onFocus={() => setShowBucketNameModal(true)}
            className="body2Strong"
            variant={'underline'}
            placeholder="버킷 이름"
          />
        </div>

        <Topics selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />

        <div className="h-2 w-full bg-gray-200"></div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start justify-center gap-1 px-4 py-3">
            <p className="body2Strong">TO DO LIST</p>
            <p className="caption1 text-gray-700">
              구체적인 액션 플랜을 세우면 목표 달성률이 높아진다는 사실, <br />
              알고 계신가요? 버킷 달성을 위한 할 일을 계획해보세요.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-2.5 px-4">
            {todoList.map((todo, index) => (
              <div key={index} className="flex flex-1 gap-2">
                <input type="checkbox" disabled={true} className="h-5 w-5 rounded border border-gray-300"></input>
                <input
                  key={index}
                  value={todo}
                  onChange={(e) => {
                    const newTodoList = [...todoList];
                    newTodoList[index] = e.target.value;
                    setTodoList(newTodoList);
                  }}
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim() === '') return;
                      if (todoList.length > 8) return;
                      const newTodoList = [...todoList];
                      newTodoList.splice(index + 1, 0, '');
                      setTodoList(newTodoList);
                    }
                    if (e.key === 'Backspace') {
                      if (todo.length === 1) return;
                      if (todo.trim() === '') {
                        const newTodoList = [...todoList];
                        newTodoList.splice(index, 1);
                        setTodoList(newTodoList);
                      }
                    }
                  }}
                  className="body1Strong"
                  placeholder="숙소 예약하기"
                ></input>
              </div>
            ))}
          </div>

          <div className="fixed inset-x-0 bottom-0 flex h-[72px] flex-1 items-center justify-center gap-2 px-4 py-3">
            <Button onClick={goHome} className="min-w-[130px]" variant={'outline'}>
              <span className="subTitle2">마이버킷 이동</span>
            </Button>
            <Button
              onClick={handleBucketSubmit}
              disabled={bucketName.trim().length === 0 || !dueDate}
              className="w-full"
            >
              <span className="subTitle2">버킷 만들기</span>
            </Button>
          </div>
        </div>
      </section>
      {showBucketNameModal && (
        <BucketNameOverlay
          showTemplate
          title={bucketName}
          show={showBucketNameModal}
          onSubmit={handleBucketTemplateSubmit}
          closeModal={() => {
            setShowBucketNameModal(false);
          }}
        />
      )}
      <Snackbar show={showSucessSnackbar} closeSnackbar={() => setShowSucessSnackbar(false)}>
        <Button onClick={goHome} size={'basic'} className="text-purple-300" variant={'basic'}>
          보러가기
        </Button>
      </Snackbar>
    </main>
  );
};

export default NewBucket;
