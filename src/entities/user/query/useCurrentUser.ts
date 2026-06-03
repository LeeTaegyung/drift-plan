import { useQuery } from '@tanstack/react-query';

import { USER_QUERIES } from '@/entities/user/query/user.queries';

export const useCurrentUser = () => {
  return useQuery(USER_QUERIES.currentOptions());
};
