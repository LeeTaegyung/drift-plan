import { useQuery } from '@tanstack/react-query';

import { userQueries } from '@/entities/user/api/user.query';

export const useCurrentUser = () => {
  return useQuery(userQueries.currentOptions());
};
