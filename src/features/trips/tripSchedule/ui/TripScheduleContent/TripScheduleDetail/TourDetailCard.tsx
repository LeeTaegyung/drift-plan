import Image from 'next/image';

import { FlagTriangleRight } from 'lucide-react';

import { TourCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDCardWrapper from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDCardWrapper';
import { formatTimeToString } from '@/features/trips/tripSchedule/utils/formatTimeToString';

interface Props {
  detail: TourCardFormValues['detail'];
}

export default function TourDetailCard({ detail }: Props) {
  const start_time = formatTimeToString(
    detail.tour_start_hour,
    detail.tour_start_min
  );
  const end_time = formatTimeToString(
    detail.tour_end_hour,
    detail.tour_end_min
  );

  return (
    <>
      {detail.photo_url && (
        <Image
          src={detail.photo_url as string}
          alt={detail.tour_name}
          width={500}
          height={500}
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          className='mt-1'
        />
      )}
      <SDCardWrapper>
        <SDCardWrapper.Header
          icon={FlagTriangleRight}
          className='bg-warning-bg text-warning-text'
        >
          <div>
            <div className='text-sm font-medium'>{detail.tour_name}</div>
            <div className='flex items-center gap-1 text-xs text-black/70'>
              {start_time === '-' ? '00:00' : start_time} ~{' '}
              {end_time === '-' ? '00:00' : end_time}
            </div>
          </div>
        </SDCardWrapper.Header>
        <SDCardWrapper.Grid className='grid-cols-1 md:grid-cols-1'>
          <SDCardWrapper.Item label='미팅 장소'>
            {detail.meeting_place ?? '-'}
          </SDCardWrapper.Item>
          <SDCardWrapper.Item label='준비물'>
            {detail.items_to_prepare ?? '-'}
          </SDCardWrapper.Item>
          <SDCardWrapper.Item label='추가 비용'>
            {detail.extra_cost ? (
              <>
                {detail.extra_cost_currency ?? ''}{' '}
                {Number(detail.extra_cost).toLocaleString()}
              </>
            ) : (
              '-'
            )}
          </SDCardWrapper.Item>
        </SDCardWrapper.Grid>
      </SDCardWrapper>
    </>
  );
}
