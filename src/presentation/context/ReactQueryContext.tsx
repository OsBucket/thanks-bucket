'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { RecoilRoot } from 'recoil';

interface ReactQueryContextProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryContext: FC<ReactQueryContextProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
};

export default ReactQueryContext;
