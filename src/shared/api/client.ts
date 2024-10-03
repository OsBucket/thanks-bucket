import axios, { AxiosInstance, AxiosError } from 'axios';
import { baseClientEnv } from '../lib/baseEnv';
import { getCookie } from 'cookies-next';

export class Client {
  api: AxiosInstance;
  uri = baseClientEnv.serverAPIUri;

  constructor() {
    this.api = axios.create({
      baseURL: this.uri,
      timeout: 5000,
      headers: { Authorization: getCookie('jwt') }
    });
    this.attachInterceptors();
  }

  private attachInterceptors = () => {
    this.api.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  };

  public authStateChanged = ({ jwt }: { jwt?: string }) => {
    this.api = axios.create({
      baseURL: this.uri,
      ...(jwt ? { headers: { Authorization: jwt } } : {})
    });

    this.attachInterceptors();
  };
}

export const client = new Client();
