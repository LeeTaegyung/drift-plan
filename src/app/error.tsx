'use client';

import { useEffect } from 'react';

import { RefreshCw } from 'lucide-react';

import { ErrorFallback, ErrorResetButton } from '@/shared/ui/error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorFallback
      title='문제가 발생했습니다'
      desc={`죄송합니다. 예상치 못한 오류가 발생했어요.\n잠시 후 다시 시도해주세요.`}
    >
      <ErrorResetButton onClick={() => reset()}>
        <RefreshCw className='size-5' />
        다시 시도
      </ErrorResetButton>
    </ErrorFallback>
  );
}
