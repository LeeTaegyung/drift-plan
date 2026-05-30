import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { Database } from '@/shared/lib/supabase/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

export const supabaseFetch = async <T>({
  path,
  revalidate = 3600,
  tags,
}: {
  path: string;
  revalidate?: number;
  tags: string[];
}): Promise<T> => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('인증 토큰을 찾을 수 없습니다.');
  }

  const accessToken = session.access_token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1${path}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: `${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
      },
      next: {
        revalidate,
        tags,
      },
    }
  );

  if (!res.ok) throw new Error(`${res.status} : 에러 발생!`);

  const data = await res.json();

  return data;
};
