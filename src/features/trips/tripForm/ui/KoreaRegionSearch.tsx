'use client';

import { useMemo, useState } from 'react';

import { KOREA_REGIONS } from '@/shared/config/korea_regions';
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

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  errorMsg?: string;
}

export default function KoreaRegionSearch({
  value,
  onChange,
  errorMsg,
}: Props) {
  const [search, setSearch] = useState(value || '');
  const debouncedSearch = useDebouncedValue(search, 300);
  const initValue =
    value === null ? null : KOREA_REGIONS.find((item) => item.name === value);

  const filterItems = useMemo(
    () =>
      KOREA_REGIONS.filter((item) => {
        const keyword = debouncedSearch.trim().toLowerCase();
        return item.name.includes(keyword);
      }),
    [debouncedSearch]
  );

  const handleChange = (value: (typeof KOREA_REGIONS)[number] | null) => {
    if (value === null) return;
    onChange(value.name);
    setSearch(value.name);
  };

  return (
    <Combobox
      items={filterItems}
      defaultValue={initValue}
      onValueChange={handleChange}
    >
      <ComboboxInput
        onChange={(e) => setSearch(e.target.value)}
        value={search || ''}
        placeholder='여행지를 입력해주세요. (ex. 경기도, 제주...)'
        className={cn(
          'bg-surface border-input! h-10 text-sm ring-0! md:h-12',
          errorMsg && 'border-error-border'
        )}
      />
      <ComboboxContent>
        <ComboboxEmpty>
          검색 결과가 없습니다. <br />
          여행지를 정확히 입력해주세요.
        </ComboboxEmpty>
        <ComboboxList>
          {(region: (typeof KOREA_REGIONS)[number]) => {
            return (
              <ComboboxItem
                key={`${region.parent} -${region.name}`}
                value={region}
                className='data-highlighted:bg-hover aria-selected:text-dp-accent'
              >
                {region.name}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
