'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { Calendar } from '@/shared/shadcn/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/shadcn/components/ui/popover';

interface Props {
  selectDate: DateRange | undefined;
  setSelectDate: (date: DateRange | undefined) => void;
}

export default function RangeDate({ selectDate, setSelectDate }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(selectDate);

  const handleClickApply = () => {
    setSelectDate(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          id='date-picker-range'
          className='bg-surface! border-dp-accent-soft h-11 justify-start px-2.5 font-normal'
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'yyyy.MM.dd')} ~{' '}
                {format(date.to, 'yyyy.MM.dd')}
              </>
            ) : (
              format(date.from, 'yyyy.MM.dd')
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
          <Button onClick={handleClickApply}>기간 조회</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
