import dynamic from 'next/dynamic';

export const ConfirmModal = dynamic(() => import('./ConfirmModal'), { ssr: false });
export const Portal = dynamic(() => import('../../../shared/ui/Portal'), { ssr: false });
