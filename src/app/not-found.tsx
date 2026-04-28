import Link from 'next/link';

import { Home, TriangleAlert } from 'lucide-react';

import { PATH } from '@/shared/constants/path';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <TriangleAlert className='text-info-text size-10' />
      <h1 className='text-text-primary text-xl font-medium'>
        페이지를 찾을 수 없습니다
      </h1>
      <p className='text-text-secondary mb-4'>
        요청하신 페이지가 존재하지 않거나 이동되었어요.
      </p>

      <Link
        href={PATH.global.main}
        className='bg-info-bg text-info-text border-info-border flex h-10 items-center justify-center gap-1 rounded-lg border px-5'
      >
        <Home className='size-5' /> 홈으로 돌아가기
      </Link>
    </div>
  );
}
