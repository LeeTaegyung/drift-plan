'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { createClient } from '@/shared/lib/supabase/client';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const supabase = createClient();

  const handleSignUp = async () => {
    if (email.trim() === '') return;
    if (password.trim() === '') return;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(error);
    console.log(data);
  };

  return (
    <div className='flex w-full max-w-100 flex-col items-center gap-10'>
      <h1>
        <Link
          href={'/'}
          className='text-text-primary inline-flex flex-col items-center gap-2 text-lg font-bold uppercase'
        >
          <Image
            src='/images/logo.svg'
            alt='Drift Plan 로고'
            width={100}
            height={100}
          />
          Drift Plan
        </Link>
      </h1>

      <div className='w-full'>
        <form className='flex flex-col gap-3'>
          <div className='flex gap-2'>
            <span>아이디(이메일)</span>
            <input
              type='text'
              placeholder='example@aaa.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex gap-2'>
            <span>비밀번호</span>
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='button' onClick={handleSignUp}>
            회원가입
          </button>
        </form>
      </div>

      <div className='text-text-secondary text-sm'>
        로그인 | 비밀번호 재설정
      </div>
    </div>
  );
}
