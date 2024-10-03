'use client';

import { forwardRef, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';


import { useInput } from '@/shared/lib/hooks/useInput';
import { LegacyInput, LegacyInputProps } from '@/shared/ui/LegacyInput';
import { KeyType } from '@/shared/consts';
import { mergeRefs } from '@/presentation/utils/refs';

type SearchInputOptions = {
  onSearch?: (value: string) => void;
  defaultValue?: string;
  searchAsYouType?: boolean;
};
export type SearchInputProps = SearchInputOptions & Omit<LegacyInputProps, 'defaultValue' | 'value' | 'onChange'>;

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { defaultValue, variant = 'underline', onSearch, searchAsYouType, ...rest } = props;
  const $inputRef = useRef<HTMLInputElement>(null);
  const [value, onChange, onReset] = useInput(defaultValue);
  const mounted = useRef(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === KeyType.ENTER) {
      onSearch?.(value);
    }
  };

  const debouncedSearch = useMemo(() => {
    return debounce((searchTerm: string) => {
      onSearch?.(searchTerm);
    }, 300);
  }, [onSearch]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (searchAsYouType) {
      debouncedSearch(value);
    }
  }, [debouncedSearch, searchAsYouType, value]);

  return (
    <LegacyInput
      clearBtn
      value={value}
      variant={variant}
      onClearText={onReset}
      onKeyPress={handleKeyPress}
      ref={mergeRefs($inputRef, ref)}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
