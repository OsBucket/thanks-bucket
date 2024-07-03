import { baseClientEnv } from '../base/baseEnv';

export const storage = {
  getItem: (key: string) => {
    if (baseClientEnv.side === 'server') return;
    if (baseClientEnv.renderMode === 'ssr') return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (baseClientEnv.side === 'server') return;
    if (baseClientEnv.renderMode === 'ssr') return localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (baseClientEnv.side === 'server') return;
    if (baseClientEnv.renderMode === 'ssr') return localStorage.removeItem(key);
  }
};
