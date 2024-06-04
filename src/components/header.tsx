'use client';

import { Gift, ScanLine } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';

export const Header = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  return (
    <>
      {session.data?.user.role === 'livehouse' ? (
        <Button
          asChild
          variant='secondary'
          className='absolute right-4 top-8 z-10'
          size='icon'
        >
          <Link href='/scanner'>
            <ScanLine size={36} />
          </Link>
        </Button>
      ) : (
        <></>
      )}
      <header className='pb-6 pt-6'>
        <h1 className='text-5xl font-bold'>{children}</h1>
      </header>
    </>
  );
};
