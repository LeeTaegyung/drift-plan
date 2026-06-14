'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';
import { TripScheduleCardFormType } from '@/entities/trips/type';
import { useUpdateTripSchedule } from '@/features/trips/tripSchedule/mutation/useUpdateTripSchedule';
import TripScheduleAddArea from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleAddArea';
import TripScheduleCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleCard';

interface Props {
  tripId: string;
  dateId: string;
}

export default function TripScheduleContent({ tripId, dateId }: Props) {
  const { data: tripSchedules } = useSuspenseQuery(
    TRIPS_QUERIES.schedule.queryOptions(tripId, dateId)
  );
  const { mutateAsync: updateTripScheduleCardMutation } = useUpdateTripSchedule(
    { tripId, dateId }
  );

  const handleUpdateSubmit = async (
    formData: Partial<TripScheduleCardFormType>,
    id: string,
    handleSuccess: () => void
  ) => {
    return await updateTripScheduleCardMutation(
      { id, formData },
      {
        onSuccess: handleSuccess,
      }
    );
  };

  const isEmpty = tripSchedules?.length === 0;

  return (
    <div className='mt-8 w-full pl-3 md:mt-14 md:pl-18'>
      <div className='flex flex-col justify-start gap-7.5 border-l-2 py-3'>
        {/* 스케쥴 렌더링 영역 */}

        {tripSchedules.map((schedule) => (
          <TripScheduleCard
            key={schedule.id}
            data={schedule}
            onUpdateSubmit={handleUpdateSubmit}
          />
        ))}

        <TripScheduleAddArea
          isEmpty={isEmpty}
          tripId={tripId}
          dateId={dateId}
          length={tripSchedules.length}
        />
      </div>
    </div>
  );
}
