'use client';

import { useMemo, useState } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import SCBox from '@/features/trips/tripDetail/ui/ScheduleCalendar/SCBox';
import SCDateCol from '@/features/trips/tripDetail/ui/ScheduleCalendar/SCDateCol';
import SCRow from '@/features/trips/tripDetail/ui/ScheduleCalendar/SCRow';
import SCWeekCol from '@/features/trips/tripDetail/ui/ScheduleCalendar/SCWeekCol';
import { createCalendar } from '@/features/trips/tripDetail/utils/createCalendar';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props {
  start_date: string;
  end_date: string;
  tripId: string;
}

export default function ScheduleCalendar({
  start_date,
  end_date,
  tripId,
}: Props) {
  const [calendarIdx, setCalendarIdx] = useState(0);
  const calendar = useMemo(
    () => createCalendar(start_date, end_date),
    [start_date, end_date]
  );
  const currentCalendar = calendar[calendarIdx];

  const handleClickPrevMonth = () => {
    setCalendarIdx((c) => c - 1);
  };

  const handleClickNextMonth = () => {
    setCalendarIdx((c) => c + 1);
  };

  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          className='hover:text-wind-strong hover:bg-transparent'
          disabled={calendarIdx === 0}
          onClick={handleClickPrevMonth}
        >
          <ArrowLeft />
        </Button>
        <div className='text-center text-sm font-medium md:text-[15px]'>
          {currentCalendar.year}년 {currentCalendar.month}월
        </div>
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          className='hover:text-wind-strong hover:bg-transparent'
          disabled={calendarIdx === calendar.length - 1}
          onClick={handleClickNextMonth}
        >
          <ArrowRight />
        </Button>
      </div>
      <SCBox>
        {/* 요일 */}
        <SCRow className='text-center text-xs'>
          <SCWeekCol />
        </SCRow>
        {/* 일자 영역 */}
        {currentCalendar.weeks.map((week, idx) => (
          <SCRow
            key={`${currentCalendar.year}-${currentCalendar.month}-week-${idx}`}
          >
            {week.map((d, idx) => (
              <SCDateCol
                key={d.dateId ?? `empty-${idx}`}
                tripId={tripId}
                {...d}
              />
            ))}
          </SCRow>
        ))}
      </SCBox>
    </div>
  );
}
