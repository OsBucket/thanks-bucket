'use client';

import { baseClientEnv } from '@/libs/core/base/baseEnv';
import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  return baseClientEnv.side === 'client' ? createPortal(children, document.body) : null;
};

export default Portal;
