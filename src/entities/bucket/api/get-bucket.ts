import { AxiosRequestConfig } from 'axios';
import { ResponseWithPagination } from '@/shared/model/page';
import { Bucket } from '@/entities/bucket';
import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

interface GetBucketsQuery {
  nickname: string;
  page: number;
  size: number;
}

async function getBucketById(id: number): Promise<Bucket> {
  const res = await client.api.get<Bucket>(`/buckets/${id}`);
  return res.data;
}

async function getBucketsBy(
  query: GetBucketsQuery,
  config?: AxiosRequestConfig
): Promise<ResponseWithPagination<Bucket>> {
  const res = await client.api.get<ResponseWithPagination<Bucket>>(
    `/buckets?page=${query.page}&size=${query.size}&nickname=${query.nickname}`,
    config
  );
  return res.data;
}

export const getBucketByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['buckets', id],
    queryFn: () => getBucketById(id)
  });
};

export const getBucketsByNicknameQuery = (nickname: string) => {
  return useQuery({
    queryKey: ['buckets'],
    queryFn: () => getBucketsBy({ nickname, page: 0, size: 100 })
  });
};
