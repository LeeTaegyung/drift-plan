'use server';

import { revalidateTag } from 'next/cache';

import { deleteTripServer } from '@/entities/trips/api/trips.server';

export const tripDeleteAction = async (tripId: string) => {
  await deleteTripServer(tripId);

  revalidateTag('trip-list', 'max');
};
