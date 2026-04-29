'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  children?: ReactNode;
}

export function NoData({ title, children }: Props) {
  return (
    <div className='flex-full flex flex-1 flex-col items-center justify-center gap-5'>
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
