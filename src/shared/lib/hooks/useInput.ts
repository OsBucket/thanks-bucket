import { useState, useCallback } from 'react';

export function useInput(defaultValue?: string) {
  const [input, setInput] = useState(defaultValue || '');
  const onChange = useCallback((value: string) => {
    setInput(value);
  }, []);
  const onReset = useCallback(() => setInput(''), []);

  return [input, onChange, onReset] as [string, typeof onChange, typeof onReset];
}
