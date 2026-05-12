'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  title: string;
  className?: string;
  children?: ReactNode;
}

export function NoData({ title, className, children }: Props) {
  return (
    <div
      className={cn(
        'flex-full flex flex-1 flex-col items-center justify-center gap-5',
        className
      )}
    >
      <Image
        src='/images/no-data.svg'
        width={303}
        height={215}
        alt='데이터 없음 이미지'
        className='h-auto w-50 md:w-75.75'
      />
      <p className='text-base md:text-lg'>{title}</p>

      {children}
    </div>
  );
}
