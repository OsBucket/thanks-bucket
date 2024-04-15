export interface LoadBucketTemplateList {
  load: () => Promise<LoadBucketTemplateList.Model[]>;
}

export namespace LoadBucketTemplateList {
  export type Params = {};

  export type Model = {
    id: number;
    bucketName: string;
    bucketTodoNames: string | null;
    createdAt: string;
    bucketTemplateTopics:
      | {
          id: number;
          createdAt: string;
          topic: {
            id: number;
            content: string;
            createdAt: string;
          };
        }[]
      | null;
  };
}
