import Link from 'next/link';

import SCCol from '@/features/trips/tripDetail/ui/ScheduleCalendar/SCCol';
import { PATH } from '@/shared/constants/path';

interface Props {
  day: number | null;
  tripId: string;
  dateId?: string | null;
}

export default function SCDateCol({ day, tripId, dateId }: Props) {
  return (
    <SCCol className='min-h-10 md:min-h-13'>
      {dateId ? (
        <Link
          href={PATH.global.trips.schedule(tripId, dateId)}
          className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
        >
          <div className='h-5 px-1 pt-1 text-right'>{day}</div>
        </Link>
      ) : (
        <div className='mt-1 h-5 px-1 text-right'>{day}</div>
      )}
    </SCCol>
  );
}
