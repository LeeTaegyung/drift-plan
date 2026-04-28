import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button } from '@/shared/shadcn/components/ui/button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: ReactNode;
}

export function ErrorResetButton({ onClick, children }: Props) {
  return (
    <Button
      onClick={onClick}
      className='bg-info-bg text-info-text border-info-border hover:text-surface-alt hover:border-surface-alt flex h-10 items-center justify-center gap-1 rounded-sm border px-5'
    >
      {children}
    </Button>
  );
}
