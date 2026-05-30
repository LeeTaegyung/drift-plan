import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { tripDeleteAction } from '@/features/trips/tripList/api/tripDelete.actions';

export const useTripDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripDeleteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERIES.lists() });
    },
    onError: () => {
      toast.error('여행 삭제 실패. 다시 시도해주세요.');
    },
  });
};
