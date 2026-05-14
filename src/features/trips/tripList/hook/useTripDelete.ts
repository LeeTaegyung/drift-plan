import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTrip } from '@/entities/trips/api/trips.api';
import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';

export const useTripDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERIES.lists() });
    },
    onError: () => {
      toast.error('여행 삭제 실패. 다시 시도해주세요.');
    },
  });
};
