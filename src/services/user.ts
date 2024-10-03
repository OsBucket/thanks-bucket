import { AxiosRequestConfig } from 'axios';
import { Profile } from '@/entities/auth/model/Profile';
import { client } from '@/shared/api/client';
import { baseClientEnv } from '@/shared/lib/baseEnv';

type SignupPayload = {
  nickname: string;
  birthday?: string;
  occupationId?: string;
  discoveryPath?: string;
};

export const getProfile = async (config?: AxiosRequestConfig): Promise<Profile> => {
  const res = await client.api('/auth/profile', config);
  return res.data;
};

export async function signupUser(payload: SignupPayload, config?: AxiosRequestConfig) {
  return client.api.post('/auth/signup', payload, config);
}

export async function logout() {
  return client.api.get('/auth/logout');
}

export async function fetchProfile(accessToken: string) {
  return fetch(`${baseClientEnv.serverAPIUri}/auth/profile`, {
    headers: { Authorization: accessToken }
  });
}
