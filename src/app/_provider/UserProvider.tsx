'use client';

import { ReactNode } from 'react';

import { useCurrentUser } from '@/entities/user/query/useCurrentUser';
import Loading from '@/shared/ui/loading/Loading';

interface Props {
  children: ReactNode;
}

export default function UserProvider({ children }: Props) {
  const { isLoading } = useCurrentUser();

  if (isLoading)
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loading />
      </div>
    );

  return <>{children}</>;
}
