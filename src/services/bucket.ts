import { Occupation } from '@/entities/occupation/model/Occupation';
import { AxiosRequestConfig } from 'axios';
import { Topic } from '@/entities/topic/model/Topic';
import { client } from '@/shared/api/client';


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

export async function getTopics(config?: AxiosRequestConfig): Promise<Topic[]> {
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
