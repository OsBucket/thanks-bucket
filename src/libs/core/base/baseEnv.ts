export type BaseEnv = {
  environment: 'development' | 'staging' | 'master';
};

export type BaseServerEnv = BaseEnv & {};

export type BaseClientEnv = BaseEnv & {
  side: 'server' | 'client';
  renderMode: 'ssr' | 'csr';
  serverAPIUri: string;
};

const side = typeof window === 'undefined' ? 'server' : 'client';
const environment = (process.env.NEXT_PUBLIC_ENV ?? 'debug') as BaseEnv['environment'];
const renderMode = (process.env.RENDER_ENV ?? 'ssr') as BaseClientEnv['renderMode'];
const serverAPIUri = `${process.env.NEXT_PUBLIC_API_URL}`;

export const baseEnv: BaseEnv = {
  environment
} as const;

export const baseClientEnv: BaseClientEnv = {
  ...baseEnv,
  renderMode,
  serverAPIUri,
  side
} as const;

export const baseServerEnv: BaseServerEnv = {
  ...baseEnv
} as const;
