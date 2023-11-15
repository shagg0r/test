import * as React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import { MuiProvider } from '@/components/mui-provider';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <MuiProvider>
        <body id="__next" className={roboto.className}>
          {children}
        </body>
      </MuiProvider>
    </html>
  );
}
