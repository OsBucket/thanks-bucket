import { Bucket, BucketTopic } from '@/domain/models/bucket-model';

import { Occupation } from '@/domain/models/user-model';
import { api } from './axiosInstance';

type PostBucketParams = {
  title: string;
  goalDate: string;
  topicIds: number[];
  bucketTodos: {
    content: string;
    isDone: boolean;
  }[];
};

export type UpdateBucketValue = Bucket & {
  topicIds: number[];
};

export async function getBuckets(): Promise<Bucket[]> {
  const res = await api.client.get('/buckets', {
    withCredentials: false
  });

  return res.data;
}
export async function getBucketById(id: number): Promise<Bucket> {
  const res = await api.client.get(`/buckets/${id}`);
  return res.data;
}

export async function addBucket({ title, goalDate, topicIds, bucketTodos }: PostBucketParams) {
  return api.client.post('/buckets', {
    title,
    goalDate,
    topicIds,
    bucketTodos
  });
}

export async function deleteBucketById(id: number) {
  return api.client.delete(`/buckets/${id}`);
}

export async function updateBucketById(bucket: UpdateBucketValue) {
  return api.client.put(`/buckets/${bucket.id}`, bucket);
}

export async function getTopics(): Promise<BucketTopic[]> {
  const res = await api.client.get('/topics');
  return res.data;
}

export async function getOccupations(): Promise<Occupation[]> {
  const res = await api.client.get('/occupations');
  return res.data;
}
