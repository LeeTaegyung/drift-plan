import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';
import { createTripWithDefaultChecklist } from '@/features/trips/tripCreate/api/tripCreate.api';
import { PATH } from '@/shared/constants/path';

export const useCreateTrip = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTripWithDefaultChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERIES.lists() });
      router.push(PATH.global.trips.list);
    },
    onError: () => {
      toast.error('여행 등록에 실패하였습니다. 다시 시도해주세요.');
    },
  });
};
