import { ReactNode, SelectHTMLAttributes } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
  inputSize?: 'default' | 'sm';
  errorMsg?: string;
}

export default function Select({
  children,
  className,
  inputSize = 'default',
  errorMsg,
  ...props
}: Props) {
  return (
    <select
      className={cn(
        'bg-surface border-input h-10 rounded-lg border px-1.5 py-1 text-sm outline-0! md:h-12',
        'appearance-none bg-[url("/images/chevron-down.svg")] bg-size-[14px] bg-position-[right_4px_center] bg-no-repeat pr-5',
        inputSize === 'sm' && 'h-8 rounded-sm px-2 text-[13px] md:h-8',
        errorMsg && 'border-error-border',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
