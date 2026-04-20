import { queryOptions } from '@tanstack/react-query';

import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const userQueries = {
  all: ['user'],

  current: () => [...userQueries.all, 'current'],
  currentOptions: () =>
    queryOptions({
      queryKey: userQueries.current(),
      queryFn: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return null;

        const { data: profile } = await supabase
          .from('user_profile')
          .select('*')
          .eq('id', user.id)
          .single();

        return { ...user, profile };
      },
      staleTime: Infinity,
      retry: false,
    }),
};
