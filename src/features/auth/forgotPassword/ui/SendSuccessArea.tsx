'use client';

import { useSearchParams } from 'next/navigation';

import { AlertCircle } from 'lucide-react';

import { AuthWrapper } from '@/features/auth/_common/ui';

export default function SendSuccessArea() {
  const params = useSearchParams();
  const email = params.get('email');

  return (
    <AuthWrapper>
      <div className='flex flex-col items-center gap-5'>
        <h2 className='text-center text-lg font-bold md:text-xl'>
          인증 이메일을 보냈어요
        </h2>
        <div className='bg-wind-soft text-text-primary rounded-lg px-5 py-3 font-medium'>
          {email}
        </div>

        <div className='flex flex-col items-center gap-2 text-center text-sm'>
          <p>위의 이메일로 비밀번호 재설정 링크를 보내드렸어요.</p>
          <p>
            <strong className='font-medium'>이메일을 확인해주세요.</strong>
          </p>
        </div>

        <div className='text-error-text border-error-border mt-1 flex gap-2 rounded-lg border p-2'>
          <AlertCircle className='size-4' />
          <p className='text-sm'>
            이메일이 오지 않았다면, <br />
            입력하신 이메일 주소가 정확한지 다시 확인해주세요.
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
}
