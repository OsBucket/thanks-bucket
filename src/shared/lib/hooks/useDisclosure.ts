import { useState, useCallback } from 'react';

export function useDisclosure(defaultValue?: boolean) {
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  };
}
