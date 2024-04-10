export interface LoadBucketTemplateList {
  load: (query: LoadBucketTemplateList.Params) => Promise<LoadBucketTemplateList.Model[]>;
}

export namespace LoadBucketTemplateList {
  export type Params = {
    bucketName: string;
  };

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
