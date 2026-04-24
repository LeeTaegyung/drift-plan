import { type NextRequest } from 'next/server';

import { updateSession } from '@/shared/lib/supabase/middleware';

// 이 함수는 내부에서 `await`를 사용하는 경우 `async`로 표시될 수 있습니다
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// 아래 "Matching Paths"를 참조하여 자세히 알아보세요
export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 요청에서 미들웨어 실행:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 내 이미지 등
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
