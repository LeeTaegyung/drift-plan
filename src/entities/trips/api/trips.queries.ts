import { queryOptions } from '@tanstack/react-query';

import { getTrips, getTripWithStatus } from '@/entities/trips/api/trips.api';
import { GetTripsResponse, TripsViewType } from '@/entities/trips/type';

interface TripListParams {
  currentPage: number;
  is_domestic?: boolean;
  start_date?: string;
  end_date?: string;
}

export const TRIPS_QUERIES = {
  all: () => ['trips'],

  lists: () => [...TRIPS_QUERIES.all(), 'list'],

  list: {
    queryKey: (params: TripListParams) => [...TRIPS_QUERIES.lists(), params],
    queryOptions: (params: TripListParams, initData: GetTripsResponse) =>
      queryOptions({
        queryKey: TRIPS_QUERIES.list.queryKey(params),
        queryFn: () => getTrips(params),
        placeholderData: (previousData) => (initData ? initData : previousData),
      }),
  },

  details: () => [...TRIPS_QUERIES.all(), 'detail'],

  detail: {
    queryKey: (tripId: string) => [...TRIPS_QUERIES.details(), tripId],
    queryOptions: (tripId: string, tripData: TripsViewType) =>
      queryOptions({
        queryKey: TRIPS_QUERIES.detail.queryKey(tripId),
        queryFn: () => getTripWithStatus(tripId),
        initialData: tripData,
        staleTime: 1000 * 60 * 60, // 1시간
      }),
  },
};
