import { ReactNode } from 'react';

import { LucideIcon } from 'lucide-react';

import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SDCardWrapper({ children, className }: Props) {
  return (
    <div
      className={cn(
        'border-border bg-surface mt-2 inline-flex flex-col gap-2 rounded-md border p-2 md:rounded-lg md:p-3',
        className
      )}
    >
      {children}
    </div>
  );
}

function SDCardHeader({
  icon,
  children,
  className,
}: {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  const Icon = icon;

  return (
    <div className='flex items-center gap-2'>
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-sm bg-gray-500',
          className
        )}
      >
        <Icon className='size-4.5' />
      </div>
      {children}
    </div>
  );
}

function SDCardGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}

function SDCardGridItem({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className='grid-label text-xs text-gray-600'>{label}</div>
      <div className='text-[13px] font-medium'>{children}</div>
    </div>
  );
}

SDCardWrapper.Header = SDCardHeader;
SDCardWrapper.Grid = SDCardGrid;
SDCardWrapper.Item = SDCardGridItem;
