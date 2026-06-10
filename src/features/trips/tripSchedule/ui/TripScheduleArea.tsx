'use client';

import { useGetTripDetailData } from '@/entities/trips/hooks/useGetTripDetailData';
import TripScheduleContent from '@/features/trips/tripSchedule/ui/TripScheduleContent';
import TripScheduleHeader from '@/features/trips/tripSchedule/ui/TripScheduleHeader';

interface Props {
  tripId: string;
  dateId: string;
}

export default function TripScheduleArea({ tripId, dateId }: Props) {
  const { data: tripDetailData } = useGetTripDetailData(tripId);

  if (!tripDetailData) return null;

  return (
    <div className='content-inner flex flex-col items-center gap-3 py-5 md:gap-5 md:py-10'>
      <TripScheduleHeader
        tripId={tripId}
        dateId={dateId}
        tripDetailData={tripDetailData}
      />

      <TripScheduleContent tripId={tripId} dateId={dateId} />
    </div>
  );
}
