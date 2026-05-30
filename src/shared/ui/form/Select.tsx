import { ReactNode, SelectHTMLAttributes } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

export default function Select({ children, className, ...props }: Props) {
  return (
    <select
      className={cn(
        'bg-surface border-input h-10 rounded-lg border px-1.5 py-1 text-sm outline-0! md:h-12',
        'appearance-none bg-[url("/images/chevron-down.svg")] bg-size-[14px] bg-position-[right_4px_center] bg-no-repeat pr-5',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
