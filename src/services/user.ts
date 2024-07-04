import { Profile } from '@/libs/core/base';
import { client } from '@/libs/core/common';
import { AxiosRequestConfig } from 'axios';

type SignupPayload = {
  memberId: string;
  nickname: string;
  birthday?: string;
  occupationId?: string;
};

export const getProfile = async (config?: AxiosRequestConfig): Promise<Profile> => {
  const res = await client.api('/auth/profile', config);
  return res.data;
};

export async function signupUser(payload: SignupPayload, config?: AxiosRequestConfig) {
  return client.api.post('/auth/signup', payload, config);
}

export async function profileUser() {
  return client.api.get('/auth/profile');
}

export async function logout() {
  return client.api.get('/auth/logout');
}
