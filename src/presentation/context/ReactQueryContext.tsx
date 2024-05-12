'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

interface ReactQueryContextProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryContext: FC<ReactQueryContextProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryContext;
