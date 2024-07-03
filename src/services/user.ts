import { client } from '@/libs/core/common';
import { AxiosRequestConfig } from 'axios';

type SignupPayload = {
  memberId: string;
  nickname: string;
  birthday?: string;
  occupationId?: string;
};

export enum MemberRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_GUEST = 'ROLE_GUEST'
}

type Profile = {
  id: number;
  email: string;
  nickname: string;
  memberRoles: MemberRole[];
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
