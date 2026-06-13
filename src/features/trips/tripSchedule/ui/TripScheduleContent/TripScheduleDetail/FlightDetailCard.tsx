import { Fragment } from 'react/jsx-runtime';

import { ArrowRight, Plane } from 'lucide-react';

import { FlightCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDCardWrapper from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDCardWrapper';
import { convertTimeTaken } from '@/features/trips/tripSchedule/utils/convertTimeTaken';
import { formatTimeToString } from '@/features/trips/tripSchedule/utils/formatTimeToString';

interface Props {
  detail: FlightCardFormValues['detail'];
}

const FLIGHT_TYPE = {
  outbound: '출국편',
  inbound: '귀국편',
};

export default function FlightDetailCard({ detail }: Props) {
  const { flight_type, platform, segments } = detail;

  return (
    <SDCardWrapper>
      <SDCardWrapper.Grid>
        <SDCardWrapper.Item label='여정 구분'>
          {FLIGHT_TYPE[flight_type]}
        </SDCardWrapper.Item>
        <SDCardWrapper.Item label='예약 플랫폼'>
          {platform ?? '-'}
        </SDCardWrapper.Item>
      </SDCardWrapper.Grid>

      {segments.map((segment, idx) => (
        <Fragment key={`segment-${idx}`}>
          <SDCardWrapper.Header
            icon={Plane}
            className='bg-flight-bg text-flight-text'
          >
            <div>
              <div className='flex items-center gap-1 text-sm font-medium'>
                {segment.departure} <ArrowRight className='size-4' />{' '}
                {segment.arrival}
              </div>

              {segment.flight_time_taken_hour !== null &&
                segment.flight_time_taken_minute !== null && (
                  <div className='flex items-center gap-1 text-xs text-black/70 dark:text-gray-200'>
                    {convertTimeTaken(
                      convertTimeTaken(
                        `${segment.flight_time_taken_hour ?? '00'}:${segment.flight_time_taken_minute ?? '00'}`
                      )
                    )}
                  </div>
                )}
            </div>
          </SDCardWrapper.Header>
          <SDCardWrapper.Grid>
            <SDCardWrapper.Item label='출발 시간'>
              {formatTimeToString(
                segment.departure_time_hour,
                segment.departure_time_min
              )}
            </SDCardWrapper.Item>
            <SDCardWrapper.Item label='도착 시간'>
              {formatTimeToString(
                segment.arrival_time_hour,
                segment.arrival_time_min
              )}
            </SDCardWrapper.Item>
            <SDCardWrapper.Item label='항공사명'>
              {segment.airline ?? '-'}
            </SDCardWrapper.Item>
            <SDCardWrapper.Item label='항공기 편명'>
              {segment.flight_number ?? '-'}
            </SDCardWrapper.Item>
            <SDCardWrapper.Item label='항공사 예약번호'>
              {segment.booking_ref ?? '-'}
            </SDCardWrapper.Item>
            <SDCardWrapper.Item label='좌석'>
              {segment.seat ?? '-'}
            </SDCardWrapper.Item>
            <SDCardWrapper.Item label='수하물' className=''>
              <div className='flex items-center gap-1'>
                {segment.carry_on_weight && (
                  <span>
                    기내{' '}
                    {segment.carry_on_weight
                      ? `${segment.carry_on_weight}kg`
                      : '-'}
                  </span>
                )}
                {segment.checked_bag_weight && (
                  <span className='before:pr-1 before:content-["/"] first-of-type:before:hidden'>
                    기내{' '}
                    {segment.checked_bag_weight
                      ? `${segment.checked_bag_weight}kg`
                      : '-'}
                  </span>
                )}
              </div>
            </SDCardWrapper.Item>
          </SDCardWrapper.Grid>
        </Fragment>
      ))}
    </SDCardWrapper>
  );
}
