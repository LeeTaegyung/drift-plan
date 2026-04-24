import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const resetPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;

  return data;
};
