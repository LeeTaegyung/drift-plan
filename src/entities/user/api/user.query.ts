import { queryOptions } from '@tanstack/react-query';

import { getUserData } from '@/entities/user/api/user.api';

export const userQueries = {
  all: ['user'],

  current: () => [...userQueries.all, 'current'],
  currentOptions: () =>
    queryOptions({
      queryKey: userQueries.current(),
      queryFn: getUserData,
      staleTime: Infinity,
      retry: false,
    }),
};
