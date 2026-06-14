import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';
import { deleteScheduleUpdateOrder } from '@/features/trips/tripSchedule/api/deleteScheduleUpdateOrder';

interface Props {
  tripId: string;
  dateId: string;
}

export const useDeleteTripSchedule = ({ tripId, dateId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScheduleUpdateOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: TRIPS_QUERIES.schedule.queryKey(tripId, dateId),
      });
    },
    onError: () => {
      toast.error('카드 삭제에 실패하였습니다. 다시 시도해주세요.');
    },
  });
};
