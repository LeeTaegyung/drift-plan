import { queryOptions } from '@tanstack/react-query';

import { getDefaultChecklistByTripId } from '@/entities/checklist/api/checklist.api';
import { TripCheckListType } from '@/entities/checklist/type';

export const CHECKLIST_QUERIES = {
  all: () => ['checklist'],

  detail: {
    queryKey: (tripId: string) => [...CHECKLIST_QUERIES.all(), tripId],
    queryOptions: (tripId: string, initData: TripCheckListType[]) =>
      queryOptions({
        queryKey: [...CHECKLIST_QUERIES.detail.queryKey(tripId)],
        queryFn: () => getDefaultChecklistByTripId(tripId),
        initialData: initData,
      }),
  },
};
