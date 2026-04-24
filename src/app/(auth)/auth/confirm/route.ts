import { type NextRequest, NextResponse } from 'next/server';

import { type EmailOtpType } from '@supabase/supabase-js';

import { PATH } from '@/shared/constants/path';
import { createClient } from '@/shared/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // redirect user to specified redirect URL or root of app
      return NextResponse.redirect(
        new URL(PATH.auth.resetPassword, request.url)
      );
    }

    // 에러 발생시 에러 메세지 전달
    const errorUrl = new URL(PATH.auth.error, request.url);
    errorUrl.searchParams.set('error', error.message);
    return NextResponse.redirect(errorUrl);
  }

  // 토큰 타입 없으면,
  const errorUrl = new URL(PATH.auth.error, request.url);
  errorUrl.searchParams.set('error', 'invalid_token');
  return NextResponse.redirect(errorUrl);
}
