'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTrip } from '@/entities/trips/api/trips.api';
import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { TripValuesType } from '@/entities/trips/type';
import TripForm from '@/features/trips/tripForm/ui/TripForm';
import { PATH } from '@/shared/constants/path';

export default function TripCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERIES.lists() });
      router.push(PATH.global.trips.list);
    },
    onError: (error) => {
      toast.error('여행 등록에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = async (formData: Partial<TripValuesType>) => {
    const submitData = formData as TripValuesType;
    await mutateAsync(submitData);
  };

  return <TripForm onSubmit={onSubmit} />;
}
