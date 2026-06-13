import { ReactNode } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ScheduleInputWrapper({ children, className }: Props) {
  return (
    <div className={cn('grid grid-cols-1 gap-3 md:grid-cols-2', className)}>
      {children}
    </div>
  );
}
