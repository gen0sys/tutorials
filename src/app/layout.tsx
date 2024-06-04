// <-- import GSAP
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

gsap.registerPlugin(useGSAP);

const roboto_condedsed = Roboto_Condensed({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eggs Donation',
  description: 'Interact with your favorite artist.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-dvh'
    >
      <body
        className={cn(
          roboto_condedsed.className,
          'flex max-h-full min-h-full flex-col text-white'
        )}
      >
        {children}
        <Toaster
          position='top-center'
          richColors
        />
      </body>
    </html>
  );
}
