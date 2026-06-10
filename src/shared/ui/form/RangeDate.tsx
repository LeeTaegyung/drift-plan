'use client';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { Calendar } from '@/shared/shadcn/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/shadcn/components/ui/popover';
import { cn } from '@/shared/shadcn/lib/utils';
import { formatTripDate } from '@/shared/utils/dateUtils';

interface Props {
  selectDate: DateRange | undefined;
  setSelectDate: (date: DateRange | undefined) => void;
  btnText?: string;
  errorMsg?: string;
  inputSize?: 'sm';
}

export default function RangeDate({
  selectDate,
  setSelectDate,
  btnText = '날짜 선택',
  errorMsg,
  inputSize,
}: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(selectDate);

  const handleClickApply = () => {
    setSelectDate(date);
    setOpen(false);
  };

  useEffect(() => {
    if (selectDate === undefined) setDate(undefined);
  }, [selectDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          id='date-picker-range'
          className={cn(
            'bg-surface! border-dp-accent-soft h-10 justify-start px-2.5 font-normal md:h-12',
            errorMsg && 'border-error-border',
            inputSize === 'sm' && 'h-8 rounded-sm text-[13px] md:h-8'
          )}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {formatTripDate(date.from)} ~ {formatTripDate(date.to)}
              </>
            ) : (
              formatTripDate(date.from)
            )
          ) : (
            <span>날짜를 선택해주세요.</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='end'>
        <Calendar
          mode='range'
          captionLayout='dropdown'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          locale={ko}
        />
        <div className='flex justify-end px-2 py-1'>
          <Button onClick={handleClickApply}>{btnText}</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
