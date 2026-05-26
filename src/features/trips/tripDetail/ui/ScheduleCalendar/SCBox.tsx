'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SCBox({ children, className }: Props) {
  return (
    <div
      className={cn(
        'bg-surface border-dp-accent border text-xs md:text-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
