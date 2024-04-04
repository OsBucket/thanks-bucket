import { Bucket, BucketTopic } from '@/domain/models/bucket-model';
import axiosInstance from './axiosInstance';
import { Occupation } from '@/domain/models/user-model';

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
  const res = await axiosInstance.get('/buckets');
  return res.data;
}
export async function getBucketById(id: number): Promise<Bucket> {
  const res = await axiosInstance.get(`/buckets/${id}`);
  return res.data;
}

export async function addBucket({ title, goalDate, topicIds, bucketTodos }: PostBucketParams) {
  return axiosInstance.post('/buckets', {
    title,
    goalDate,
    topicIds,
    bucketTodos
  });
}

export async function deleteBucketById(id: number) {
  return axiosInstance.delete(`/buckets/${id}`);
}

export async function updateBucketById(bucket: UpdateBucketValue) {
  return axiosInstance.put(`/buckets/${bucket.id}`, bucket);
}

export async function getTopics(): Promise<BucketTopic[]> {
  const res = await axiosInstance.get('/topics');
  return res.data;
}

export async function getOccupations(): Promise<Occupation[]> {
  const res = await axiosInstance.get('/occupations');
  return res.data;
}
