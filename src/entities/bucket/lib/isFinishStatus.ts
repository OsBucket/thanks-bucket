import { ProcessStatus } from '@/entities/bucket/model/Bucket';

export function isFinishStatus(status: ProcessStatus): boolean {
  return status === 'FINISH';
}
