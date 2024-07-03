import { Bucket, BucketTopic } from '@/domain/models/bucket-model';

import { Occupation } from '@/domain/models/user-model';
import { client } from '@/libs/core/common';
import { ResponseWithPagination } from '@/libs/types/utils';
import { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

type PostBucketParams = {
  title: string;
  goalDate: string;
  topicIds: number[];
  bucketTodos: {
    content: string;
    isDone: boolean;
  }[];
};

export interface BucketTemplate {
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
}

interface GetBucketsQuery {
  nickname?: string;
  page: number;
  size: number;
}

export type UpdateBucketValue = Bucket & {
  topicIds: number[];
};

export async function getBuckets(
  query: GetBucketsQuery,
  config?: AxiosRequestConfig
): Promise<ResponseWithPagination<Bucket>> {
  const res = await client.api.get(`/buckets?${queryString.stringify(query)}`, config);
  return res.data;
}

export async function getBucketById(id: number): Promise<Bucket> {
  const res = await client.api.get(`/buckets/${id}`);
  return res.data;
}

export async function addBucket({ title, goalDate, topicIds, bucketTodos }: PostBucketParams) {
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

export async function updateBucketById(bucket: UpdateBucketValue) {
  return client.api.put(`/buckets/${bucket.id}`, bucket);
}

export async function getTopics(config?: AxiosRequestConfig): Promise<BucketTopic[]> {
  const res = await client.api.get('/topics', config);
  return res.data;
}

export async function getOccupations(config?: AxiosRequestConfig): Promise<Occupation[]> {
  const res = await client.api.get('/occupations', config);
  return res.data;
}

export async function getBucketTemplates(config?: AxiosRequestConfig): Promise<BucketTemplate[]> {
  const res = await client.api.get('/bucket-templates', config);
  return res.data;
}
