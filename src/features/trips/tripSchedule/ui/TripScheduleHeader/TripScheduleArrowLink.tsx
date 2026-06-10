import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { PATH } from '@/shared/constants/path';
import { cn } from '@/shared/shadcn/lib/utils';
import { formatTripDate } from '@/shared/utils/dateUtils';

interface Props {
  type?: 'prev' | 'next';
  tripId: string;
  currentDate: string;
  disabled: boolean;
}

export default function TripScheduleArrowLink({
  type = 'prev',
  tripId,
  currentDate,
  disabled,
}: Props) {
  const date = new Date(currentDate);
  const typeOfDate = new Date(
    date.setDate(type === 'prev' ? date.getDate() - 1 : date.getDate() + 1)
  );
  const stringDate = formatTripDate(typeOfDate);

  return (
    <Link
      href={PATH.global.trips.schedule(tripId, stringDate)}
      className={cn(
        'inline-flex items-center gap-1',
        disabled && 'text-text-muted pointer-events-none'
      )}
    >
      {type === 'prev' && <ChevronLeft className='size-5' />}
      <span className='hidden text-sm font-medium md:block'>{stringDate}</span>
      {type === 'next' && <ChevronRight className='size-5' />}
    </Link>
  );
}
