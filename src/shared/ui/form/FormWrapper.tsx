import { ReactNode } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
}

export function FormWrapper({ onSubmit, children, className }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('flex w-full flex-col gap-2 md:gap-5', className)}
    >
      {children}
    </form>
  );
}
