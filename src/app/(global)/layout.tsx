import { ReactNode } from 'react';

import { Footer, Header } from '@/widgets/layout';

interface Props {
  children: ReactNode;
}

export default function BasicLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 has-[.flex-full]:flex has-[.flex-full]:flex-col'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
