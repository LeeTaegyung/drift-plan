import { queryOptions } from '@tanstack/react-query';

import { getDefaultChecklistByTripId } from '@/entities/checklist/api/checklist.api';

export const CHECKLIST_QUERIES = {
  all: () => ['checklist'],

  detail: {
    queryKey: (tripId: string) => [...CHECKLIST_QUERIES.all(), tripId],
    queryOptions: (tripId: string) =>
      queryOptions({
        queryKey: [...CHECKLIST_QUERIES.detail.queryKey(tripId)],
        queryFn: () => getDefaultChecklistByTripId(tripId),
        staleTime: 1000 * 60 * 60, // 1시간
      }),
  },
};
