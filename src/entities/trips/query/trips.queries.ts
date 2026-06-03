import { queryOptions } from '@tanstack/react-query';

import {
  getTrip,
  getTripSchedulesByDateId,
  getTripsWithStatus,
  getTripWithStatus,
} from '@/entities/trips/api/trips.api';

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
    queryOptions: (params: TripListParams) =>
      queryOptions({
        queryKey: TRIPS_QUERIES.list.queryKey(params),
        queryFn: () => getTripsWithStatus(params),
        staleTime: 1000 * 60 * 60, // 1시간
      }),
  },

  details: () => [...TRIPS_QUERIES.all(), 'detail'],

  detail: {
    default: {
      queryKey: (tripId: string) => [
        ...TRIPS_QUERIES.details(),
        'default',
        tripId,
      ],
      queryOptions: (tripId: string) =>
        queryOptions({
          queryKey: TRIPS_QUERIES.detail.default.queryKey(tripId),
          queryFn: () => getTrip(tripId),
          staleTime: 1000 * 60 * 60, // 1시간
        }),
    },
    withStatus: {
      queryKey: (tripId: string) => [
        ...TRIPS_QUERIES.details(),
        'with-status',
        tripId,
      ],
      queryOptions: (tripId: string) =>
        queryOptions({
          queryKey: TRIPS_QUERIES.detail.withStatus.queryKey(tripId),
          queryFn: () => getTripWithStatus(tripId),
          staleTime: 1000 * 60 * 60, // 1시간
        }),
    },
  },

  schedules: () => [...TRIPS_QUERIES.all(), 'schedule'],

  schedule: {
    queryKey: (tripId: string, dateId: string) => [
      ...TRIPS_QUERIES.schedules(),
      tripId,
      dateId,
    ],
    queryOptions: (tripId: string, dateId: string) =>
      queryOptions({
        queryKey: TRIPS_QUERIES.schedule.queryKey(tripId, dateId),
        queryFn: () => getTripSchedulesByDateId(tripId, dateId),
        staleTime: 1000 * 60 * 60, // 1시간
      }),
  },
};
