'use client';

import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { FileX } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
  errorFallback?: ReactNode;
}

export default function DataBoundary({
  children,
  fallback,
  errorFallback = <DefaultDataError />,
}: Props) {
  return (
    <ErrorBoundary FallbackComponent={() => errorFallback}>
      <Suspense fallback={fallback}>
        {children}
        <DefaultDataError />
      </Suspense>
    </ErrorBoundary>
  );
}

// 공용 에러 UI
function DefaultDataError() {
  return (
    <div className='text-info-text flex flex-col items-center justify-center gap-5 py-5 md:py-10'>
      <FileX className='size-10 md:size-16' />
      <p className='text-base md:text-lg'>데이터를 불러올 수 없습니다</p>
    </div>
  );
}
