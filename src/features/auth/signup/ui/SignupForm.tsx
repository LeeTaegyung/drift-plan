'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';

export default function SignupForm() {
  const { control } = useForm({
    mode: 'onChange',
  });

  return (
    <div className='w-full'>
      <form className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <span>아이디(이메일)</span>
          <Input
            type='text'
            className='text-sm'
            placeholder='example@aaa.com'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <span>비밀번호</span>
          <Input type='password' className='text-sm' placeholder='password' />
        </div>

        <Button type='button'>회원가입</Button>
      </form>
    </div>
  );
}
