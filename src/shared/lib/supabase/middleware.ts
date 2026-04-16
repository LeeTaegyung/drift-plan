import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({ request });

  // Fluid compute 환경에서는 이 클라이언트를 전역 변수로 두지 마세요.
  // 항상 각 요청마다 새로 생성해야 합니다.
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

  // createServerClient와 supabase.auth.getClaims() 사이에는
  // 코드를 넣지 마세요. 사소한 실수 하나로도
  // 사용자가 랜덤하게 로그아웃되는 문제를 디버깅하기 매우 어려워질 수 있습니다.

  // 중요: getClaims()를 제거하고 Supabase 클라이언트를 서버 사이드 렌더링에서 사용하면, 사용자가 랜덤하게 로그아웃될 수 있습니다.
  // getClaims() : 쿠키에서 access token 읽고, 필요시 refresh token으로 갱신, 즉 세션 유지 장치
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // 로그인하지 않은 사용자가 보호된 페이지에 접근할 때 리다이렉트
  // 예: 메인('/')과 로그인 페이지를 제외한 모든 곳을 보호하고 싶을 때
  const isLoginPage = request.nextUrl.pathname.startsWith('/auth');
  const isAuthPage = request.nextUrl.pathname.startsWith('/trips');

  if (!user && !isLoginPage && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/sign-in';

    // 로그인 후 돌아올 페이지를 쿼리 스트링으로 남길 수도 있습니다.
    // url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // 중요: supabaseResponse 객체를 그대로 반환해야 합니다.
  // 만약 NextResponse.next()로 새로운 response 객체를 만든다면, 반드시 아래를 지켜야 합니다:
  // 1. request를 함께 넘겨야 합니다: const myNewResponse = NextResponse.next({ request })
  // 2. 쿠키를 복사해야 합니다: myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. 필요에 맞게 myNewResponse를 수정하되, 쿠키는 변경하지 마세요!
  // 4. 마지막으로: return myNewResponse

  // 이 과정을 지키지 않으면, 브라우저와 서버의 상태가 어긋나서 사용자 세션이 예상보다 빨리 종료될 수 있습니다!

  return supabaseResponse;
};
