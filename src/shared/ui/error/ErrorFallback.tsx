import { ComponentType, ReactNode, SVGProps } from 'react';

import { TriangleAlert } from 'lucide-react';

interface Props {
  title: string;
  desc?: string;
  icon?: ComponentType<SVGProps<SVGElement>>;
  children?: ReactNode;
}

export function ErrorFallback({ title, desc, icon: Icon, children }: Props) {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      {Icon ? (
        <Icon className='text-info-text size-10' />
      ) : (
        <TriangleAlert className='text-info-text size-10' />
      )}
      <h1 className='text-text-primary text-xl font-medium'>{title}</h1>
      {desc && (
        <p className='text-text-secondary mb-4 text-center whitespace-pre-line'>
          {desc}
        </p>
      )}

      {children}
    </div>
  );
}
