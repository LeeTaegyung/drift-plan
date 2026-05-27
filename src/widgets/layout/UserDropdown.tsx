'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { UserRound } from 'lucide-react';

import { useLogout } from '@/entities/user/model/useLogout';
import { CurrentUserDataType } from '@/entities/user/type';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/shadcn/components/ui/popover';

interface Props {
  user: CurrentUserDataType;
}

export default function UserDropdown({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: logout } = useLogout();

  const handleClickCloseDropdown = () => setOpen((o) => !o);
  const handleLogout = () => {
    logout();
    handleClickCloseDropdown();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type='button' className='h-8 w-8 rounded-full'>
          {user?.profile?.avatar_url ? (
            <Image
              src={user.profile.avatar_url}
              width={32}
              height={32}
              alt={`${user.profile.nickname}님의 프로필 이미지`}
              className='h-full w-full object-cover'
            />
          ) : (
            <UserRound className='size-4.5' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='z-101 w-25 gap-0.5 text-center'>
        <Link
          className='flex h-8 items-center justify-center text-sm'
          href={PATH.global.trips.list}
          onClick={handleClickCloseDropdown}
        >
          내 정보
        </Link>
        <button className='h-8 text-sm' onClick={handleLogout}>
          로그아웃
        </button>
      </PopoverContent>
    </Popover>
  );
}
