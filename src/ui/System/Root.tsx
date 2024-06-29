'use client';

import { type ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}
export const Root = ({ children }: RootProps) => {
  return <>{children}</>;
};
