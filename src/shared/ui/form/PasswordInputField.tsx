'use client';

import { InputHTMLAttributes, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export function PasswordInputField({ isError, ...props }: Props) {
  const [toggle, setToggle] = useState(false);

  const handleToggleType = () => {
    setToggle(!toggle);
  };

  return (
    <div className='relative'>
      <Input
        type={toggle ? 'text' : 'password'}
        className={cn('pr-10 text-sm', isError && 'border-error-border')}
        {...props}
      />
      <Button
        type='button'
        variant={'ghost'}
        onClick={handleToggleType}
        className='absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0 hover:bg-transparent'
      >
        {toggle ? <Eye className='size-5' /> : <EyeOff className='size-5' />}
      </Button>
    </div>
  );
}
