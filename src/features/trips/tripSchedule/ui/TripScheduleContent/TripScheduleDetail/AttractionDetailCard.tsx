import Image from 'next/image';

import { Circle, MapPin, XIcon } from 'lucide-react';

import { AttractionCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDCardWrapper from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDCardWrapper';
import { formatTimeToString } from '@/features/trips/tripSchedule/utils/formatTimeToString';

interface Props {
  detail: AttractionCardFormValues['detail'];
}

export default function AttractionDetailCard({ detail }: Props) {
  const open_time = formatTimeToString(
    detail.business_open_hour,
    detail.business_open_min
  );
  const close_time = formatTimeToString(
    detail.business_close_hour,
    detail.business_close_min
  );

  return (
    <>
      {detail.photo_url && (
        <Image
          src={detail.photo_url as string}
          alt={detail.place_name}
          width={500}
          height={500}
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          className='mt-1'
        />
      )}
      <SDCardWrapper>
        <SDCardWrapper.Header
          icon={MapPin}
          className='bg-attraction-bg text-attraction-text'
        >
          <div>
            <div className='text-sm font-medium'>{detail.place_name}</div>
            <div className='flex items-center gap-1 text-xs text-black/70 dark:text-gray-200'>
              {open_time === '-' ? '00:00' : open_time} ~{' '}
              {close_time === '-' ? '00:00' : close_time}
            </div>
          </div>
        </SDCardWrapper.Header>
        <SDCardWrapper.Grid className='grid-cols-3 gap-1 md:grid-cols-3 md:gap-2'>
          <SDCardWrapper.Item label='입장료'>
            {detail.entrance_fee ? (
              <>
                {detail.entrance_fee_currency ?? ''}{' '}
                {Number(detail.entrance_fee).toLocaleString()}
              </>
            ) : (
              '-'
            )}
          </SDCardWrapper.Item>
          <SDCardWrapper.Item label='예약'>
            {detail.has_reservation ? (
              <Circle className='size-4' />
            ) : (
              <XIcon className='size-4' />
            )}
          </SDCardWrapper.Item>
          <SDCardWrapper.Item label='오디오 가이드'>
            {detail.has_audio_guide ? (
              <Circle className='size-4' />
            ) : (
              <XIcon className='size-4' />
            )}
          </SDCardWrapper.Item>
        </SDCardWrapper.Grid>
      </SDCardWrapper>
    </>
  );
}
