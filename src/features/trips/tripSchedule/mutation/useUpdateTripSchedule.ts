import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateTripSchedule } from '@/entities/trips/api/trips.api';
import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';

interface Props {
  tripId: string;
  dateId: string;
}

export const useUpdateTripSchedule = ({ tripId, dateId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTripSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: TRIPS_QUERIES.schedule.queryKey(tripId, dateId),
      });
    },
    onError: () => {
      toast.error('카드 수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });
};
