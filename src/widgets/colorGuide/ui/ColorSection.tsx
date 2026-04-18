import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function ColorSection({ title, children }: Props) {
  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  );
}
