import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const forgotPassword = async (email: string) => {
  // redirectTo 설정은 /auth/confirm/route.ts 파일에서 적용
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;

  return null;
};
