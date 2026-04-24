'use client';

import { useSearchParams } from 'next/navigation';

import { AUTH_ERROR_MESSAGE_MAP } from '@/shared/lib/supabase/error';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMsg = error && AUTH_ERROR_MESSAGE_MAP[error];

  return (
    <div className='flex'>
      <h1>인증 실패</h1>
      <p>{errorMsg || '알 수 없는 오류가 발생했습니다.'}</p>
    </div>
  );
}
