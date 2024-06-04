'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import standardBackground from '@/assets/background.png';
import eventBackground from '@/assets/event_background.jpg';
import mypageBackground from '@/assets/mypage_background.png';
import { cn } from '@/lib/utils';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const session = useSession();
  const role = session.data?.user.role;
  const backgroundImage = pathname.includes('event')
    ? eventBackground
    : pathname.includes('mypage')
      ? mypageBackground
      : standardBackground;

  return (
    <>
      <div className='absolute inset-0 -z-10 flex h-screen w-full items-center justify-center overflow-hidden'>
        <Image
          src={backgroundImage}
          priority
          fill
          alt=''
          className='object-cover'
        />
      </div>
      <>{children}</>
      <div className='fixed inset-x-0 bottom-8 z-[9999999999] mx-auto'>
        <nav className='flex h-full w-full place-content-center'>
          <div className='relative flex h-20 w-72 flex-row items-center justify-between rounded-[48px] border-[1.5px] border-white/15 bg-white/5 p-2 backdrop-blur-3xl [box-shadow:0px_4px_4px_rgba(0,_0,_0,_0.16)]'>
            <Link
              href='/dashboard'
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-[32px]',
                role === 'listener'
                  ? 'pointer-events-none bg-gray-500 opacity-50'
                  : pathname === '/dashboard'
                    ? 'bg-neon-green'
                    : 'bg-white'
              )}
            >
              <Image
                src='/assets/icons/icon_home.svg'
                width={25}
                height={25}
                alt='event'
                className='h-auto w-auto invert'
              />
            </Link>
            <Link
              href='/event'
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-[32px]',
                pathname.includes('event') ? 'bg-neon-green' : 'bg-white'
              )}
            >
              <Image
                src='/assets/icons/icon_event.svg'
                width={25}
                height={25}
                alt='event'
                className='h-auto w-auto invert'
              />
            </Link>
            <Link
              href='/mypage'
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-[32px]',
                pathname.includes('mypage') ? 'bg-neon-green' : 'bg-white'
              )}
            >
              <Image
                src='/assets/icons/icon_mypage.svg'
                width={25}
                height={25}
                alt='mypage'
                className='h-auto w-auto invert'
              />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default PlatformLayout;
