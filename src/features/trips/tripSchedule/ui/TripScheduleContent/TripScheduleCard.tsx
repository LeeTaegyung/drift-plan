import { TripScheduleCardType } from '@/entities/trips/type';
import { ScheduleCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import TripScheduleDetail from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail';

interface Props {
  data: TripScheduleCardType;
}

export default function TripScheduleCard({ data }: Props) {
  const { card_type, title, time, time_taken, detail, memo } = data;

  return (
    <div className='relative pl-5'>
      {time && (
        <span className='top-px right-[calc(100%+20px)] text-sm font-medium md:absolute md:text-[18px]'>
          {time}
        </span>
      )}
      <h3 className='relative font-semibold md:text-[18px]'>
        <Pin />
        {title}
      </h3>
      {time_taken && (
        <span className='text-sm md:text-base'>
          {convertTimeTaken(time_taken)}
        </span>
      )}

      {/* 카드타입별 컨텐츠 */}
      <TripScheduleDetail
        card_type={card_type as ScheduleCardFormValues['card_type']}
        detail={detail as ScheduleCardFormValues['detail']}
      />

      {memo && <div>{memo}</div>}
    </div>
  );
}

const convertTimeTaken = (value: string | number) => {
  if (typeof value === 'string') {
    const [hour, min] = value.split(':').map(Number);
    return hour * 60 + min;
  }

  const hour = Math.floor(value / 60);
  const min = value % 60;
  return `${hour}:${min.toString().padStart(2, '0')}`;
};

function Pin() {
  return (
    <div className='bg-wind-strong absolute top-1/2 -left-5 flex h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full'>
      <div className='border-wind-soft h-3 w-3 rounded-full border-2' />
    </div>
  );
}
