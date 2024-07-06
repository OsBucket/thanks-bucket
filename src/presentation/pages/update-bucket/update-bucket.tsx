import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { Snackbar } from '@/presentation/components/ui/Snackbar';
import BucketNameOverlay from '@/presentation/components/BucketNameOverlay';
import TodoList from '@/presentation/components/TodoList';
import Topics from '@/presentation/components/Topics';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';

import { BucketTemplate, UpdateBucketValue, getBucketById, updateBucketById } from '@/services/bucket';
import { Todo } from '@/domain/models/bucket-model';
import useBackPress from '@/presentation/hooks/useBackPress';
import { getProfile } from '@/services/user';

const UpdateBucket = ({ bucketId }: { bucketId: number }) => {
  const router = useRouter();

  const { data: bucket } = useQuery({
    queryKey: ['buckets', bucketId],
    queryFn: () => getBucketById(bucketId)
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  });

  const [bucketName, setBucketName] = useState<string>('');
  const [dueDate, setDueDate] = useState('2024-12-31');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const [showSucessSnackbar, setShowSucessSnackbar] = useState(false);
  const [showBucketNameModal, setShowBucketNameModal] = useState(false);

  const handleBucketSubmit = async () => {
    if (bucket === undefined) return;
    const bucketTodos = newTodo.trim().length
      ? [
          ...todoList,
          {
            id: Date.now(),
            content: newTodo,
            isDone: false
          }
        ]
      : todoList;

    const updatedBucket: UpdateBucketValue = {
      id: bucket.id,
      title: bucketName,
      goalDate: dueDate,
      bucketTopics: bucket.bucketTopics,
      bucketTodos: bucketTodos,
      isDone: false,
      createdAt: bucket.createdAt,
      topicIds: selectedCategories
    };
    await updateBucketById(updatedBucket);
    window.sessionStorage.setItem('updatedBucket', 'true');
    goHome();
  };

  const handleBucketTempleteSubmit = (name: string, bucketTemplate?: BucketTemplate) => {
    if (bucketTemplate !== undefined) {
      const { bucketName, bucketTodoNames, bucketTemplateTopics } = bucketTemplate;
      setBucketName(bucketName);
      if (bucketTemplateTopics !== null) {
        const categories = bucketTemplateTopics.map((topics) => topics.id);
        setSelectedCategories(categories);
      }
      if (bucketTodoNames !== null) {
        const templateTodos = bucketTodoNames.split(', ').map((name) => ({
          id: Date.now(),
          content: name,
          isDone: false
        }));
        setTodoList(templateTodos);
      }
    } else {
      setBucketName(name);
    }

    setShowBucketNameModal(false);
  };

  const goHome = () => {
    if (profile !== undefined) {
      router.push(`/buckets/${profile.nickname}`);
    }
  };

  useEffect(() => {
    if (bucket) {
      setBucketName(bucket.title);
      setDueDate(bucket.goalDate);
      setTodoList(bucket.bucketTodos);
      setSelectedCategories(bucket.bucketTopics?.length ? bucket.bucketTopics.map((item) => item.id) : []);
    }
  }, [bucket]);

  useBackPress({
    backPressed: () => {
      if (showBucketNameModal) {
        setShowBucketNameModal(false);
      } else {
        goHome();
      }
    },
    showOverlay: showBucketNameModal
  });

  return (
    <main>
      <section>
        <Input
          value={bucketName ?? ''}
          maxLength={30}
          onChange={() => {
            setBucketName(bucketName);
          }}
          onClick={() => setShowBucketNameModal(true)}
          onFocus={() => setShowBucketNameModal(true)}
          className="body2Strong"
          variant={'underline'}
          placeholder="버킷 이름"
        />
        <div className="mt-6 flex justify-between items-center border py-5 px-4 rounded-lg">
          <p className="body1Strong">언제까지 이룰까요?</p>
          <input
            value={dueDate ?? ''}
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-white focus:outline-none body1Strong"
          />
        </div>
        <Topics selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

        <div className="mt-6 py-2">
          <p className="body2Strong mb-1">TO DO LIST</p>
          <p className="caption1 text-gray-800">
            구체적인 액션 플랜을 세우면 목표 달성률이 높아진다는 사실, <br />
            알고 계신가요? 버킷 달성을 위한 할 일을 계획해보세요.
          </p>
        </div>
        <div className="mt-2 pb-[200px]">
          <TodoList todoList={todoList} setTodoList={setTodoList} newTodo={newTodo} setNewTodo={setNewTodo} />

          <div className="fixed bottom-0 w-full left-1/2 -translate-x-1/2">
            <div className="p-3 flex gap-[10px]">
              <Button
                onClick={handleBucketSubmit}
                disabled={bucketName?.trim().length === 0 || !dueDate}
                className="w-full"
              >
                수정완료
              </Button>
            </div>
          </div>
        </div>
      </section>
      {showBucketNameModal && (
        <BucketNameOverlay
          title={bucketName}
          show={showBucketNameModal}
          onSubmit={handleBucketTempleteSubmit}
          closeModal={() => {
            setShowBucketNameModal(false);
          }}
        />
      )}
      <Snackbar show={showSucessSnackbar} closeSnackbar={() => setShowSucessSnackbar(false)} />
    </main>
  );
};

export default UpdateBucket;
