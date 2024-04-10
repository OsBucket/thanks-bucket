import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, AccessDeniedError } from '@/domain/errors';
import { LoadBucketTemplateList } from '@/domain/usecases';

export class RemoteLoadBucketTemplateList implements LoadBucketTemplateList {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadBucketTemplateList.Model[]>) {}

  async load(params: LoadBucketTemplateList.Params): Promise<LoadBucketTemplateList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body || [];
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
