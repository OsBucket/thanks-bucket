import { Bucket, isFinishStatus } from '@/entities/bucket';

export function calculateFinishRate(buckets: Bucket[]): number {
  return buckets.length === 0
    ? 0
    : Math.round((buckets.filter((bucket) => isFinishStatus(bucket.bucketStatus)).length / buckets.length) * 100);
}
