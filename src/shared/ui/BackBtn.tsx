'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  text?: string;
  className?: string;
}

export default function BackBtn({ text, className }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      size={'sm'}
      variant={'ghost'}
      className={cn('px-0 hover:bg-transparent', className)}
    >
      <ArrowLeft /> {text && text}
    </Button>
  );
}
