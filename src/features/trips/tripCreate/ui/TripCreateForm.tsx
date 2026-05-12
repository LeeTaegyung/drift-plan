'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTrip } from '@/entities/trips/api/trips.api';
import { TripValuesType } from '@/entities/trips/type';
import TripForm from '@/features/trips/tripForm/ui/TripForm';
import { PATH } from '@/shared/constants/path';

export default function TripCreateForm() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      router.push(PATH.global.trips.list);
    },
    onError: (error) => {
      toast.error('여행 등록에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = (formData: TripValuesType) => mutateAsync(formData);

  return <TripForm onSubmit={onSubmit} />;
}
