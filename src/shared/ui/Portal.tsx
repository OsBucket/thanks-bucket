'use client';

import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  return createPortal(children, document.body);
};

export default Portal;
