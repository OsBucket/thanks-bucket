import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http';
import { objectToQueryString } from '@/presentation/utils/url';

import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse<{ timestamp: string; data: any; path: string }>;
    try {
      axiosResponse = await axios.request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/${data.url}`,
        method: data.method,
        headers: data.headers,
        data: data.body,
        params: data.params,
        paramsSerializer: objectToQueryString,
        withCredentials: true
      });
    } catch (error) {
      axiosResponse = (error as any).response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data.data
    };
  }
}
