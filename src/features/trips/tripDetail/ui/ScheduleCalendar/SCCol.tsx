'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SCCol({ children, className }: Props) {
  return (
    <div
      className={cn(
        'last-of-type:text-ocean-500 border-dp-accent border-r first-of-type:text-red-500 last-of-type:border-r-0',
        className
      )}
    >
      {children}
    </div>
  );
}
