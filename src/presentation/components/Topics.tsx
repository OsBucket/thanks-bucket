'use client';
import { FC, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getTopics } from '@/services/bucket';
import { Button } from '@/presentation/components/ui/Button';

interface TopicsProps {
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

const Topics: FC<TopicsProps> = ({ selectedCategories, setSelectedCategories }) => {
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics
  });

  const [showCategory, setShowCategory] = useState(false);

  const selectedCtgNames = () => {
    const selectedCtgs = topics!.filter((ctg) => selectedCategories.includes(ctg.id));
    const joinStr = selectedCtgs.map((ctg) => ctg.content).join(', ');

    return joinStr.length > 10 ? joinStr.slice(0, 10) + '...' : joinStr;
  };

  const onToggleCategory = (id: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };
  return (
    <div className={`border mt-6 rounded-lg ${showCategory ? 'border-black ' : ''}`}>
      <div className="flex justify-between items-center py-5 px-4">
        <p className="body1Strong basis-1/2">어떤 주제인가요?</p>
        <Button
          className=""
          onClick={() => {
            setShowCategory((prev) => !prev);
          }}
          variant={'basic'}
          size={'basic'}
        >
          <span className={`body1Strong ${selectedCategories.length > 0 ? '' : 'text-[#BDBDBD]'} mr-1`}>
            {selectedCategories.length > 0 ? selectedCtgNames() : '선택'}
          </span>
          <img src="/dropdown.svg" />
        </Button>
      </div>
      {showCategory && (
        <ul className="flex flex-wrap gap-2 border-t py-[10px] px-4">
          {topics?.map((topic) => {
            const isSelected = selectedCategories.includes(topic.id);
            return (
              <li
                key={topic.id}
                onClick={() => onToggleCategory(topic.id)}
                className={`py-[6px] ${
                  isSelected ? 'bg-[#BDBDBD] bg-opacity-30' : ''
                } px-3 border rounded-4xl body1Strong`}
              >
                {topic.content}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Topics;
