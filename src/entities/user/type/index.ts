import { UserResponse } from '@supabase/supabase-js';

import { Database } from '@/shared/lib/supabase/database.types';

export type UserProfileType =
  | Database['public']['Tables']['user_profile']['Row']
  | null;

export type CurrentUserDataType =
  | null
  | (UserResponse['data']['user'] & {
      profile: UserProfileType;
    });
