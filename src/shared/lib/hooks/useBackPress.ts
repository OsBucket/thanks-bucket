import { useEffect } from 'react';

interface useBackPressProps {
  backPressed: VoidFunction;
  showOverlay?: boolean;
}

export default function useBackPress({ backPressed, showOverlay }: useBackPressProps) {
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, '', location.href);
      backPressed();
    };

    history.pushState(null, '', location.href);
    window?.addEventListener('popstate', preventGoBack);

    return () => window?.removeEventListener('popstate', preventGoBack);
  }, [backPressed, showOverlay]);
}
