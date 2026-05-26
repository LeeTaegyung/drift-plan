'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SCRow({ children, className }: Props) {
  return (
    <div
      className={cn(
        'border-dp-accent grid grid-cols-7 border-b last-of-type:border-b-0',
        className
      )}
    >
      {children}
    </div>
  );
}
