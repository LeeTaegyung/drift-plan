import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';

export const useGetTripDetailData = () => {
  const params = useParams();
  const tripId = params.tripId as string;

  if (!tripId) throw new Error('잘못된 경로입니다.');

  return useSuspenseQuery(TRIPS_QUERIES.detail.withStatus.queryOptions(tripId));
};
