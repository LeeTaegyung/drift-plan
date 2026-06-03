import { queryOptions } from '@tanstack/react-query';

import { getUserData } from '@/entities/user/api/user.api';

export const USER_QUERIES = {
  all: ['user'],

  current: () => [...USER_QUERIES.all, 'current'],
  currentOptions: () =>
    queryOptions({
      queryKey: USER_QUERIES.current(),
      queryFn: getUserData,
      staleTime: Infinity,
      retry: false,
    }),
};
