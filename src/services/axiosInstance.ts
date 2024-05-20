import axios, { AxiosInstance, AxiosError } from 'axios';

class Api {
  public client: AxiosInstance;
  static BASE_URL = '/api';

  constructor() {
    this.client = axios.create({
      baseURL: Api.BASE_URL,
      timeout: 5000,
      withCredentials: false
    });

    this.attachInterceptors();
  }

  private attachInterceptors = () => {
    this.client.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  };

  public authStateChanged = (token: string) => {
    this.client = axios.create({
      baseURL: Api.BASE_URL,
      withCredentials: false,
      ...(token ? { headers: { Authorization: `Bearer ${token}`, Cookie: null } } : {})
    });

    this.attachInterceptors();
  };
}

export const api = new Api();
