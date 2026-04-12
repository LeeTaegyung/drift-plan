import type { Metadata } from 'next';

import QueryProvider from '@/app/_provider/QueryProvider';
import { sCordDream } from '@/app/fonts';

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
      <body className={sCordDream.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
