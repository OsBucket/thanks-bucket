import Cookies from 'js-cookie';

import { baseClientEnv } from '../base/baseEnv';
import { storage } from './storage';
import { client } from '../common';

export const cookies: () => Map<string, { name: string; value: any }> =
  baseClientEnv.side === 'server'
    ? require('next/headers').cookies
    : () => {
        const cookie = Cookies.get();
        return new Map(Object.entries(cookie).map(([key, value]) => [key, { name: key, value }]));
      };

export const setCookie = (
  key: string,
  value: string,
  options: Cookies.CookieAttributes = { path: '/', sameSite: 'none', secure: true }
) => {
  // console.log('debug setCookie', baseClientEnv.side, key, value);
  if (baseClientEnv.side === 'server') return;
  else Cookies.set(key, value, options);
};

export const getCookie = (key: string) => {
  if (baseClientEnv.side === 'server') return cookies().get(key)?.value;
  else
    return document.cookie
      .split(';')
      .find((c) => c.trim().startsWith(`${key}=`))
      ?.split('=')[1];
};

type SetAuthOption = { jwt: string };
export const setAuth = ({ jwt }: SetAuthOption) => {
  client.authStateChanged({ jwt });
  storage.setItem('jwt', jwt);
  setCookie('jwt', jwt);
};

type InitAuthOption = { jwt?: string };
export const initAuth = ({ jwt }: InitAuthOption = {}) => {
  const token = jwt ?? getCookie('jwt');
  if (token) setAuth({ jwt: token });
};

export const resetAuth = () => {
  storage.removeItem('jwt');
};
