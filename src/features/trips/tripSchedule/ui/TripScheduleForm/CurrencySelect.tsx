'use client';

import { ChangeEvent } from 'react';

import { useGetTripDetailData } from '@/entities/trips/hooks/useGetTripDetailData';
import Select from '@/shared/ui/form/Select';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CurrencySelect({ value, onChange }: Props) {
  const { data: tripDetailData } = useGetTripDetailData();
  const currency = tripDetailData.currency;
  const isDomestic = tripDetailData.is_domestic!;

  return (
    <Select
      inputSize='sm'
      value={value}
      onChange={onChange}
      className='flex-1'
      disabled={isDomestic}
    >
      {isDomestic ? (
        <option value='₩'>₩</option>
      ) : (
        <>
          <option value=''>통화 선택</option>
          <option value='₩'>₩</option>
          {currency?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </>
      )}
    </Select>
  );
}
