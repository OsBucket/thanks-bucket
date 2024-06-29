'use server';

import { cookies } from 'next/headers';

export async function createCookies(token: string, nickname: string) {
  cookies().set('jwt', token, { secure: true });
  cookies().set('username', nickname, { secure: true });
  console.log(cookies().getAll());
}
