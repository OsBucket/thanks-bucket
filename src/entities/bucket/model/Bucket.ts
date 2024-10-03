import { Topic } from '@/entities/topic';
import { Member } from '@/entities/member/model/Member';

export type ProcessStatus = 'START' | 'FINISH';

export type Todo = {
  id: number;
  content: string;
  todoStatus: ProcessStatus;
  order: number;
};

export type Bucket = {
  id: number;
  title: string;
  goalDate: string;
  bucketStatus: ProcessStatus;
  bucketTodos: Todo[];
  bucketTopics: Topic[];
  member: Member;
};
