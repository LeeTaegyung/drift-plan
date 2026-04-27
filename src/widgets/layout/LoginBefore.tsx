import Link from 'next/link';

import { PATH } from '@/shared/constants/path';

export default function LoginBefore() {
  return (
    <>
      <Link
        className='hover:text-text-secondary px-3 py-2'
        href={PATH.auth.signIn}
      >
        로그인
      </Link>
      <Link
        className='hover:text-text-secondary px-3 py-2'
        href={PATH.auth.signUp}
      >
        회원가입
      </Link>
    </>
  );
}
