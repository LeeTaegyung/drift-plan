import { useSuspenseQuery } from '@tanstack/react-query';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';

export const useGetTripDetailData = (tripId: string) => {
  return useSuspenseQuery(TRIPS_QUERIES.detail.withStatus.queryOptions(tripId));
};
