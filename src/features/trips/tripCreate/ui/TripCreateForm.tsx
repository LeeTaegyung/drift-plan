'use client';

import { TripValuesType } from '@/entities/trips/type';
import { useCreateTrip } from '@/features/trips/tripCreate/mutation/useCreateTrip';
import TripForm from '@/features/trips/tripForm/ui/TripForm';

export default function TripCreateForm() {
  const { mutateAsync: createTripMutate } = useCreateTrip();

  const onSubmit = async (formData: Partial<TripValuesType>) => {
    const submitData = formData as TripValuesType;
    await createTripMutate(submitData);
  };

  return <TripForm onSubmit={onSubmit} />;
}
