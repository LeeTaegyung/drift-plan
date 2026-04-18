import { getRandomNickname } from '@/features/auth/signup/lib/getRandomNickname';
import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const signUp = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  if (error) throw error;

  return data;
};

export const createNickname = async (): Promise<string> => {
  const nickname = getRandomNickname();

  const { data } = await supabase
    .from('user_profile')
    .select('nickname')
    .eq('nickname', nickname)
    .single();

  // 중복된 닉네임 있으면 재귀함수 실행
  if (data) return await createNickname();

  return nickname;
};
