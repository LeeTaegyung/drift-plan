import { TripScheduleCardType } from '@/entities/trips/type';
import { ScheduleCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import TripScheduleDetail from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail';
import { convertTimeTaken } from '@/features/trips/tripSchedule/utils/convertTimeTaken';

interface Props {
  data: TripScheduleCardType;
}

export default function TripScheduleCard({ data }: Props) {
  const { card_type, title, time, time_taken, detail, memo } = data;

  return (
    <div className='relative flex flex-col items-start pl-5'>
      {time && (
        <span className='top-px right-[calc(100%+20px)] text-sm font-medium md:absolute md:text-[18px]'>
          {`${time.split(':')[0]}:${time.split(':')[1]}`}
        </span>
      )}
      <h3 className='relative font-semibold md:text-[18px]'>
        <Pin />
        {title}
      </h3>
      {time_taken && (
        <span className='text-sm text-gray-500'>
          {convertTimeTaken(time_taken)}
        </span>
      )}

      {/* 카드타입별 컨텐츠 */}
      <TripScheduleDetail
        card_type={card_type as ScheduleCardFormValues['card_type']}
        detail={detail as ScheduleCardFormValues['detail']}
      />

      {memo && <div className='mt-2 whitespace-pre-line'>{memo}</div>}
    </div>
  );
}

function Pin() {
  return (
    <div className='bg-wind-strong absolute top-1/2 -left-5 flex h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full'>
      <div className='border-wind-soft h-3 w-3 rounded-full border-2' />
    </div>
  );
}
