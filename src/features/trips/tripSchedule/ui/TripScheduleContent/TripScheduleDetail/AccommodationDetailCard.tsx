import { Circle, Hotel, XIcon } from 'lucide-react';

import { AccommodationCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDCardWrapper from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDCardWrapper';
import { formatTimeToString } from '@/features/trips/tripSchedule/utils/formatTimeToString';
import { getDayByStringDate } from '@/shared/utils/dateUtils';

interface Props {
  detail: AccommodationCardFormValues['detail'];
}

export default function AccommodationDetailCard({ detail }: Props) {
  const term_date = detail.term_date as string | null;

  return (
    <SDCardWrapper>
      <SDCardWrapper.Header
        icon={Hotel}
        className='bg-success-bg text-success-text'
      >
        <div>
          <div className='text-sm font-medium'>{detail.accommodation_name}</div>
          <div className='flex items-center gap-1 text-xs text-black/70'>
            {detail.city && <span>{detail.city}</span>}
            {term_date && (
              <span className='before:pr-1 before:content-["·"] first-of-type:before:hidden'>
                {term_date.split('~')[0]} (
                {getDayByStringDate(term_date.split('~')[0])}) ~{' '}
                {term_date.split('~')[1]} (
                {getDayByStringDate(term_date.split('~')[1])})
              </span>
            )}
          </div>
        </div>
      </SDCardWrapper.Header>

      <SDCardWrapper.Grid>
        <SDCardWrapper.Item label='예약 플랫폼'>
          {detail.platform ?? '-'}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='예약 번호'>
          {detail.platform_ref ?? '-'}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='주소' className='col-span-2'>
          {detail.address ?? '-'}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='체크인'>
          {formatTimeToString(detail.check_in_hour, detail.check_in_min)}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='체크아웃'>
          {formatTimeToString(detail.check_out_hour, detail.check_out_min)}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='룸타입'>
          {detail.room_type ?? '-'}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='도시세'>
          {detail.city_tax_currency} {detail.city_tax ?? '-'}
        </SDCardWrapper.Item>
      </SDCardWrapper.Grid>
      <SDCardWrapper.Grid className='grid-cols-1 md:grid-cols-3'>
        <SDCardWrapper.Item label='수건'>
          {detail.has_towel ? (
            <Circle className='size-4' />
          ) : (
            <XIcon className='size-4' />
          )}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='주방'>
          {detail.has_kitchen ? (
            <Circle className='size-4' />
          ) : (
            <XIcon className='size-4' />
          )}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='세탁실'>
          {detail.has_laundry ? (
            <Circle className='size-4' />
          ) : (
            <XIcon className='size-4' />
          )}
        </SDCardWrapper.Item>
      </SDCardWrapper.Grid>
    </SDCardWrapper>
  );
}
