'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { TripsType, TripValuesType } from '@/entities/trips/type';
import { editTripWithDefaultChecklist } from '@/features/trips/tripEdit/api/tripEdit.api';
import TripForm from '@/features/trips/tripForm/ui/TripForm';
import { PATH } from '@/shared/constants/path';

interface Props {
  tripId: string;
  initData: TripsType;
}

export default function TripEditForm({ tripId, initData }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: editTripWithDefaultChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERIES.lists() });
      router.push(PATH.global.trips.list);
    },
    onError: () => {
      toast.error('여행 수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = (formData: Partial<TripValuesType>) => {
    mutateAsync({ tripId, formData });
  };

  return <TripForm onSubmit={onSubmit} initValues={initData} />;
}
