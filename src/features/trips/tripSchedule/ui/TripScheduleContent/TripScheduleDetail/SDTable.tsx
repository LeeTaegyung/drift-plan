import { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';

export default function SDTable({ children }: { children: ReactNode }) {
  return (
    <table
      className={cn(
        'bg-surface border-divider w-full border text-[13px]',
        'block',
        'md:table md:table-fixed'
      )}
    >
      {children}
    </table>
  );
}

function SDThead({ children }: { children: ReactNode }) {
  return (
    <thead className={cn('block', 'md:table-header-group')}>{children}</thead>
  );
}

function SDTbody({ children }: { children: ReactNode }) {
  return (
    <tbody className={cn('block', 'md:table-row-group')}>{children}</tbody>
  );
}

function SDTr({ children }: { children: ReactNode }) {
  return <tr className={cn('flex flex-wrap', 'md:table-row')}>{children}</tr>;
}

function SDTh({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'bg-dp-accent-soft/50 border-divider w-[35%] border-b px-2.5 py-1 font-medium break-keep',
        'block',
        'md:table-cell md:w-auto md:border',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

function SDTd({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        'border-divider w-[65%] border-b px-2.5 py-1 break-keep',
        'block',
        'md:table-cell md:w-auto md:border',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

SDTable.Thead = SDThead;
SDTable.Tbody = SDTbody;
SDTable.Tr = SDTr;
SDTable.Th = SDTh;
SDTable.Td = SDTd;
