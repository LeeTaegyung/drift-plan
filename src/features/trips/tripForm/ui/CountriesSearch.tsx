'use client';

import { useMemo, useState } from 'react';

import { COUNTRIES, Country } from '@/shared/config/countries';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/shadcn/components/ui/combobox';
import { cn } from '@/shared/shadcn/lib/utils';
import { useDebouncedValue } from '@/shared/utils/hooks/useDebounce';

type ContryItemType = (typeof COUNTRIES)[number];

interface Props {
  value: Country[] | null;
  onChange: (values: ContryItemType) => void;
  errorMsg?: string;
}

export default function CountriesSearch({ value, onChange, errorMsg }: Props) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const filterItems = useMemo(
    () =>
      COUNTRIES.filter((item) => {
        const keyword = debouncedSearch.trim();
        return item.name.includes(keyword);
      }),
    [debouncedSearch]
  );

  const handleChange = (value: ContryItemType | null) => {
    if (value === null) return;
    onChange(value);
    setSearch('');
  };

  return (
    <Combobox items={filterItems} onValueChange={handleChange}>
      <ComboboxInput
        onChange={(e) => setSearch(e.target.value)}
        value={search || ''}
        placeholder='나라를 입력해주세요. (ex. 프랑스, 스위스...)'
        className={cn(
          'bg-surface border-input! h-10 text-sm ring-0! md:h-12',
          errorMsg && 'border-error-border!'
        )}
      />
      <ComboboxContent>
        <ComboboxEmpty>
          검색 결과가 없습니다. <br />
          나라를 정확히 입력해주세요.
        </ComboboxEmpty>
        <ComboboxList>
          {(country) => {
            const isSelect =
              value === null
                ? false
                : value.map((country) => country.name)?.includes(country.name);

            return (
              <ComboboxItem
                value={country}
                key={country.id}
                className={cn(
                  'data-highlighted:bg-hover data-highlighted:text-text-primary aria-selected:text-dp-accent [&>span]:hidden!',
                  isSelect && 'text-dp-accent'
                )}
              >
                <>{country.name}</>
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
