import dynamic from 'next/dynamic';

export * from './Button';
export * from './Input';
export const Loading = dynamic(() => import('./loading'), { ssr: false });
export const ConfirmModal = dynamic(() => import('./ConfirmModal'), { ssr: false });
export const Portal = dynamic(() => import('./portal'), { ssr: false });
