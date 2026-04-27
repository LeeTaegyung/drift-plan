import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

// 유저 정보와 유저 프로필 조회
export const getUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await getUserProfile(user.id);

  return { ...user, profile };
};

// 유저 프로필 정보 조회
export const getUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from('user_profile')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

// 로그아웃
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
