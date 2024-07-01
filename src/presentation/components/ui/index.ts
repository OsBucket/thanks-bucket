import dynamic from 'next/dynamic';

export * from './Button';
export * from './Input';
export const LoadingOverlay = dynamic(() => import('./LoadingOverlay'), { ssr: false });
export const ConfirmModal = dynamic(() => import('./ConfirmModal'), { ssr: false });
export const Portal = dynamic(() => import('./portal'), { ssr: false });
