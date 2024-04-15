import { forwardRef, useRef, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { KeyType, mergeRefs } from '@/presentation/utils';
import { useInput } from '@/presentation/hooks/use-input';
import { Input, InputProps } from '@/presentation/components/ui/Input';

type SearchInputOptions = {
  onSearch?: (value: string) => void;
  defaultValue?: string;
  searchAsYouType?: boolean;
};
export type SearchInputProps = SearchInputOptions & Omit<InputProps, 'defaultValue' | 'value' | 'onChange'>;

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
    <Input
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
