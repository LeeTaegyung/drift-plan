import SCCol from '@/features/trips/tripDetail/ui/ScheduleCalendar/SCCol';
import { DAY_NUMBER_MATCH } from '@/shared/constants/date';

export default function SCWeekCol() {
  return (
    <>
      {DAY_NUMBER_MATCH.map((day) => (
        <SCCol key={day} className='py-1'>
          {day}
        </SCCol>
      ))}
    </>
  );
}
