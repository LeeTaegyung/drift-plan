'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  text?: string;
  className?: string;
  href?: string;
}

export default function BackBtn({ text, className, href }: Props) {
  const router = useRouter();

  const handleClickBack = () => {
    if (href) {
      router.push(href);
      return;
    }
    router.back();
  };

  return (
    <Button
      onClick={handleClickBack}
      variant={'ghost'}
      className={cn('px-0 hover:bg-transparent', className)}
    >
      <ArrowLeft className='size-4.5 md:size-6' /> {text && text}
    </Button>
  );
}
