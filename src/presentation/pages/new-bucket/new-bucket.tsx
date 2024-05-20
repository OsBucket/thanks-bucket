import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Snackbar } from '@/presentation/components/ui/Snackbar';
import TodoList from '@/presentation/components/TodoList';
import useBackPress from '@/presentation/hooks/useBackPress';
import { Todo } from '@/domain/models/bucket-model';
import { addBucket } from '@/services/bucket';
import BucketNameOverlay from '@/presentation/components/BucketNameOverlay';
import Topics from '@/presentation/components/Topics';
import { LoadBucketTemplateList } from '@/domain/usecases';

interface NewBucketProps {}

const NewBucket: FC<NewBucketProps> = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [bucketName, setBucketName] = useState<string>('');
  const [dueDate, setDueDate] = useState('2024-12-31');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const [showSucessSnackbar, setShowSucessSnackbar] = useState(false);
  const [showBucketNameModal, setShowBucketNameModal] = useState(false);

  const resetForm = () => {
    setBucketName('');
    setDueDate('2024-12-31');
    setSelectedCategories([]);
    setTodoList([]);
    setNewTodo('');
  };

  const handleBucketSubmit = async () => {
    const filteredTodoList = todoList.map((todo) => ({
      content: todo.content,
      isDone: todo.isDone
    }));
    if (newTodo.trim().length) {
      filteredTodoList.push({
        content: newTodo,
        isDone: false
      });
    }
    const res = await addBucket({
      title: bucketName,
      goalDate: dueDate,
      topicIds: selectedCategories,
      bucketTodos: filteredTodoList
    });
    if (res) {
      resetForm();
      setShowSucessSnackbar(true);
    }
  };

  const handleBucketTempleteSubmit = (name: string, bucketTemplate?: LoadBucketTemplateList.Model) => {
    if (bucketTemplate !== undefined) {
      const { bucketName, bucketTodoNames, bucketTemplateTopics } = bucketTemplate;
      setBucketName(bucketName);
      if (bucketTemplateTopics !== null) {
        const categories = bucketTemplateTopics.map((topics) => topics.id);
        setSelectedCategories(categories);
      } else {
        setSelectedCategories([]);
      }
      if (bucketTodoNames !== null) {
        const templateTodos = bucketTodoNames.split(', ').map((name) => ({
          id: Date.now(),
          content: name,
          isDone: false
        }));
        setTodoList(templateTodos);
      } else {
        setTodoList([]);
      }
    } else {
      setBucketName(name);
    }
    setShowBucketNameModal(false);
  };

  const goHome = () => {
    router.push('/');
  };

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
        <h1 className="subTitle1 my-5">2024년에 무엇을 이루고 싶으세요?</h1>
        <Input
          value={bucketName}
          maxLength={30}
          onChange={() => {}}
          onClick={() => setShowBucketNameModal(true)}
          onFocus={() => setShowBucketNameModal(true)}
          className="body2Strong"
          variant={'underline'}
          placeholder="버킷 이름"
        />
        <div className="mt-6 flex justify-between items-center border py-5 px-4 rounded-lg">
          <p className="body1Strong">언제까지 이룰까요?</p>
          <input
            ref={dateInputRef}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
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
              <Button onClick={goHome} className="min-w-[130px]" variant={'outline'}>
                <span className="subTitle2 ">마이버킷 이동</span>
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
        </div>
      </section>
      {showBucketNameModal && (
        <BucketNameOverlay
          showTemplate
          title={bucketName}
          show={showBucketNameModal}
          onSubmit={handleBucketTempleteSubmit}
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
