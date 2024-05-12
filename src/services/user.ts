import { api } from './axiosInstance';

type SignupParams = {
  memberId: string;
  password: string;
  nickname: string;
  birthday?: string;
  occupationId?: string;
};

export async function getUser(auth: boolean) {
  if (auth) {
    return {
      name: 'John Doe'
    };
  } else {
    return null;
  }
}

export async function getProfile(): Promise<{
  nickname: string;
  memberId: number;
}> {
  const res = await api.client.get('/auth/profile');
  return res.data;
}

export async function loginUser(memberId: string, password: string) {
  return api.client.post('/auth/login', {
    memberId,
    password
  });
}
export async function signupUser({ memberId, password, nickname, birthday, occupationId }: SignupParams) {
  return api.client.post('/auth/signup', {
    memberId,
    password,
    nickname,
    birthday,
    occupationId
  });
}

export async function profileUser() {
  return api.client.get('/auth/profile');
}

export async function logout() {
  return api.client.get('/auth/logout');
}
