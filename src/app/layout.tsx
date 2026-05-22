import type { Metadata } from 'next';

import QueryProvider from '@/app/_provider/QueryProvider';
import UserProvider from '@/app/_provider/UserProvider';
import { sCoreDream } from '@/app/fonts';
import { Toaster } from '@/shared/shadcn/components/ui/sonner';
import PortalContainer from '@/shared/ui/modal/PortalContainer';

import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'Drift Plan | 흘러가듯, 계획하듯,',
  description: '흐름을 따라 계획하는 여행 계획 서비스, Drift Plan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${sCoreDream.className} ${sCoreDream.variable}`}>
        <QueryProvider>
          <UserProvider>
            {children}
            <Toaster />
            <PortalContainer />
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
