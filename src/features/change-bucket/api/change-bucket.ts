import { client } from '@/shared/api/client';
import { ProcessStatus } from '@/entities/bucket/model/Bucket';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/react-query';

type CreateBucketValue = {
  title: string;
  goalDate: string;
  topicIds: number[];
  bucketTodos: {
    content: string;
  }[];
};

export type UpdateBucketValue = {
  id: number;
  title: string;
  goalDate: string;
  topicIds: number[];
  bucketTodos: UpdateTodo[];
};

export type UpdateTodo = {
  content: string;
  todoStatus: ProcessStatus;
};

type ChangeBucketStatusValue = {
  status: ProcessStatus;
  bucketId: number;
};

type ChangeTodoStatusValue = {
  status: ProcessStatus;
  bucketId: number;
  bucketTodoId: number;
};

export async function createBucket({ title, goalDate, topicIds, bucketTodos }: CreateBucketValue) {
  return client.api.post('/buckets', {
    title,
    goalDate,
    topicIds,
    bucketTodos
  });
}

export async function deleteBucketById(id: number) {
  return client.api.delete(`/buckets/${id}`);
}

async function changeBucketStatus({ bucketId, status }: ChangeBucketStatusValue) {
  return client.api.patch(`/buckets/${bucketId}/status`, { status });
}

async function changeTodoStatus({ bucketId, bucketTodoId, status }: ChangeTodoStatusValue) {
  return client.api.patch(`/buckets/${bucketId}/bucketTodos/${bucketTodoId}/status`, { status });
}

export async function updateBucketById(bucket: UpdateBucketValue) {
  return client.api.put(`/buckets/${bucket.id}`, bucket);
}

export const useChangeBucketStatus = () => {
  return useMutation({
    mutationFn: changeBucketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
    }
  });
};

export const useChangeTodoStatus = () => {
  return useMutation({
    mutationFn: changeTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
    }
  });
};

export const useCreateBucket = () => {
  return useMutation({
    mutationFn: createBucket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
    },
    onError: (error) => {
      console.error(error);
    }
  });
};
