import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import { PATH } from '@/shared/constants/path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 로그인 없이 접근할 수 있는 페이지 목록
const PUBLIC_ROUTE = [
  PATH.global.main,
  PATH.auth.signIn,
  PATH.auth.signUp,
  PATH.auth.forgotPassword,
  PATH.auth.forgotPasswordSuccess,
  PATH.auth.confirm,
  PATH.auth.error,
  '/color-guide',
];

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
        // headers 동기화 추가
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value)
        );
      },
    },
  });

  const pathname = request.nextUrl.pathname;

  // 메인 페이지는 인증에 무관하게 접근 가능
  if (pathname === '/') return supabaseResponse;

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const isPublic = PUBLIC_ROUTE.some((route) => pathname === route);

  // 로그인 O + 공개 페이지 접근시 => 메인 페이지로 리다이렉트
  if (user && isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 로그인 X + 보호된 페이지 접근시 => 로그인 페이지로 리다이렉트
  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';

    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
