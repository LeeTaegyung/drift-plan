'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCurrentUser } from '@/entities/user/model/useCurrentUser';
import LoginAfter from '@/widgets/layout/LoginAfter';
import LoginBefore from '@/widgets/layout/LoginBefore';

export function Header() {
  const { data: isLogged } = useCurrentUser();

  return (
    <header className='bg-surface/10 sticky top-0 w-full shrink-0 backdrop-blur-lg'>
      <div className='inner flex h-12 items-center justify-between md:h-14'>
        <h1>
          <Link href='/' className='flex items-center gap-1 md:gap-2'>
            <Image
              src='/images/logo.svg'
              width={40}
              height={40}
              alt='Drift Plan 로고'
              style={{ height: 'auto' }}
              className='w-8 md:w-10'
              priority
            />
            <strong className='text-text-primary text-base font-semibold md:text-lg'>
              Drift Plan
            </strong>
          </Link>
        </h1>
        <div className='flex items-center text-xs md:text-sm'>
          {!!isLogged ? <LoginAfter user={isLogged} /> : <LoginBefore />}
        </div>
      </div>
    </header>
  );
}
