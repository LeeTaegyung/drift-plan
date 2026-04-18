import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export function AuthWrapper({ children }: Props) {
  return (
    <div className='bg-surface border-border flex w-full max-w-125 flex-col items-center gap-10 rounded-2xl border p-5 py-10 md:p-10 md:py-15'>
      <h1>
        <Link href={'/'} className='inline-flex flex-col items-center gap-2'>
          <Image
            src='/images/logo.svg'
            alt='Drift Plan 로고'
            width={100}
            height={100}
            className='h-auto w-20 md:w-25'
          />
          <span className='text-text-primary text-base font-bold uppercase md:text-lg'>
            Drift Plan
          </span>
        </Link>
      </h1>

      {children}
    </div>
  );
}
