export type Todo = {
  id: number;
  content: string;
  isDone: boolean;
};

export type BucketTopic = {
  id: number;
  content: string;
};

export type Bucket = {
  id: number;
  title: string;
  isDone: boolean;
  goalDate: string;
  bucketTodos: Todo[];
  bucketTopics: BucketTopic[];
  createdAt: string;
};
