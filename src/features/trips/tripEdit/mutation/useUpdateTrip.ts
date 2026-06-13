import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';
import { updateTripWithDefaultSetting } from '@/features/trips/tripEdit/api/tripEdit.api';

export const useUpdateTrip = (tripId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTripWithDefaultSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERIES.lists() });
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERIES.detail.default.queryKey(tripId),
      });
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERIES.detail.withStatus.queryKey(tripId),
      });
      router.back();
    },
    onError: () => {
      toast.error('여행 수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });
};
