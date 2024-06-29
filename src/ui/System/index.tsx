import type { ReactNode } from 'react';
import { Root } from './Root';
import ReactQueryContext from '@/presentation/context/ReactQueryContext';

export const Provider = ({ children }: { children: ReactNode }) => {
  return <ReactQueryContext>{children}</ReactQueryContext>;
};
export const System = {
  Provider,
  Root
};
