'use client';
import Image from 'next/image';
import { FC, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getTopics } from '@/services/bucket';
import { Button } from '@/shared/ui/Button';
import { Topic } from '@/entities/topic';

interface TopicsProps {
  selectedTopics: Topic[];
  setSelectedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

const Topics: FC<TopicsProps> = ({ selectedTopics, setSelectedTopics }) => {
  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics
  });

  const [showTopics, setShowTopics] = useState(false);

  const selectedTopicNames = () => {
    const joinStr = selectedTopics.map((topic) => topic.content).join(', ');
    return joinStr.length > 10 ? joinStr.slice(0, 10) + '...' : joinStr;
  };

  const isSelected = (topic: Topic) => {
    return selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id);
  };

  const onToggleTopic = (topic: Topic) => {
    if (isSelected(topic)) {
      setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic.id !== topic.id));
      return;
    }
    setSelectedTopics([...selectedTopics, topic]);
  };

  return (
    <div className={`mt-6 rounded-lg border ${showTopics ? 'border-black' : ''}`}>
      <div className="flex items-center justify-between px-4 py-5">
        <p className="body1Strong basis-1/2">어떤 주제인가요?</p>
        <Button onClick={() => setShowTopics((prev) => !prev)} variant={'basic'} size={'basic'}>
          <span className={`body1Strong ${selectedTopics.length > 0 ? '' : 'text-gray-400'} mr-1`}>
            {selectedTopics.length > 0 ? selectedTopicNames() : '선택'}
          </span>
          <Image width={12} height={12} src="/dropdown.svg" alt="dropdown" />
        </Button>
      </div>
      {showTopics && (
        <ul className="flex flex-wrap gap-2 border-t px-4 py-[10px]">
          {topics?.map((topic) => {
            return (
              <li
                key={topic.id}
                onClick={() => onToggleTopic(topic)}
                className={`py-[6px] ${
                  isSelected(topic) ? 'bg-gray-400 bg-opacity-30' : ''
                } body1Strong rounded-4xl border px-3`}
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
