'use client';

import { TriangleAlert } from 'lucide-react';

import { sCoreDream } from '@/app/fonts';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang='ko'>
      <body className={`${sCoreDream.className} ${sCoreDream.variable}`}>
        <div className='flex h-screen flex-col items-center justify-center gap-4'>
          <TriangleAlert className='text-info-text size-10' />
          <h1 className='text-text-primary text-xl font-medium'>
            앱에 문제가 발생했습니다
          </h1>
          <p className='text-text-secondary mb-4 text-center'>
            죄송합니다. 예상치 못한 오류가 발생했어요. <br />
            잠시 후 다시 시도해주세요.
          </p>
        </div>
      </body>
    </html>
  );
}
