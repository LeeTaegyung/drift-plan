import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTripSchedule } from '@/entities/trips/api/trips.api';
import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';

interface Props {
  tripId: string;
  dateId: string;
}

export const useCreateTripSchedule = ({ tripId, dateId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTripSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERIES.schedule.queryKey(tripId, dateId),
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
