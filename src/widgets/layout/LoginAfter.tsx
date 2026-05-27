'use client';

import Link from 'next/link';

import { CurrentUserDataType } from '@/entities/user/type';
import { PATH } from '@/shared/constants/path';
import UserDropdown from '@/widgets/layout/UserDropdown';

interface Props {
  user: CurrentUserDataType;
}

export default function LoginAfter({ user }: Props) {
  return (
    <>
      <Link
        className='hover:text-text-secondary px-3 py-2'
        href={PATH.global.trips.list}
      >
        내 여행
      </Link>
      <UserDropdown user={user} />
    </>
  );
}
