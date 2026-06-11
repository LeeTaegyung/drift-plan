'use client';

import { TripsViewType } from '@/entities/trips/type';
import TripScheduleArrowLink from '@/features/trips/tripSchedule/ui/TripScheduleHeader/TripScheduleArrowLink';
import { PATH } from '@/shared/constants/path';
import BackBtn from '@/shared/ui/BackBtn';
import { getDayByStringDate } from '@/shared/utils/dateUtils';

interface Props {
  tripId: string;
  dateId: string;
  tripDetailData: TripsViewType;
}

export default function TripScheduleHeader({
  tripId,
  dateId,
  tripDetailData,
}: Props) {
  return (
    <>
      <div className='w-full'>
        <BackBtn text='뒤로 가기' href={PATH.global.trips.detail(tripId)} />
      </div>
      <div className='bg-bg sticky top-12 z-1 flex w-full items-center justify-between md:top-14'>
        <TripScheduleArrowLink
          tripId={tripId}
          currentDate={dateId}
          disabled={tripDetailData.start_date === dateId}
        />
        <h2 className='text-center text-lg font-semibold'>
          {dateId} ({getDayByStringDate(dateId)})
        </h2>
        <TripScheduleArrowLink
          type='next'
          tripId={tripId}
          currentDate={dateId}
          disabled={tripDetailData.end_date === dateId}
        />
      </div>
    </>
  );
}
