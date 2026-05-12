import { queryOptions } from '@tanstack/react-query';

import { getTrips } from '@/entities/trips/api/trips.api';

interface TripListParams {
  currentPage: string;
  is_domestic?: boolean;
  start_date?: string;
  end_date?: string;
}

export const TRIPS_QUERIES = {
  all: () => ['trips'],

  lists: () => [...TRIPS_QUERIES.all(), 'list'],

  list: {
    queryKey: (params: TripListParams) => [...TRIPS_QUERIES.lists(), params],
    queryOptions: (params: TripListParams) =>
      queryOptions({
        queryKey: TRIPS_QUERIES.list.queryKey(params),
        queryFn: () => {
          const { is_domestic, start_date, end_date } = params;

          return getTrips({
            is_domestic,
            start_date,
            end_date,
          });
        },
      }),
  },
};
