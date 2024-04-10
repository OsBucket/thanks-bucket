import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';
import { RemoteLoadBucketTemplateList } from '@/data/usecases';

export const makeRemoteLoadBucketTemplateList = (): RemoteLoadBucketTemplateList =>
  new RemoteLoadBucketTemplateList(makeApiUrl('/bucket-templates'), makeAxiosHttpClient());
