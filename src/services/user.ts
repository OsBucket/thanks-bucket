import axiosInstance from './axiosInstance';

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
  const res = await axiosInstance.get('/auth/profile');
  return res.data;
}

export async function loginUser(memberId: string, password: string) {
  return axiosInstance.post('/auth/login', {
    memberId,
    password
  });
}
export async function signupUser({ memberId, password, nickname, birthday, occupationId }: SignupParams) {
  return axiosInstance.post('/auth/signup', {
    memberId,
    password,
    nickname,
    birthday,
    occupationId
  });
}

export async function profileUser() {
  return axiosInstance.get('/auth/profile');
}

export async function logout() {
  return axiosInstance.get('/auth/logout');
}
