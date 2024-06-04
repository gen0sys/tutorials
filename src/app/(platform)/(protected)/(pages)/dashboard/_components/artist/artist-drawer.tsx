'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { GiftLogs } from '@/types';

import ArtistCardMessageAccordion from './artist-card-message-accordion';

export const ArtistDrawer = ({
  giftLogs,
  eventHash,
}: {
  giftLogs?: GiftLogs | undefined;
  eventHash?: string;
}) => {
  const [open, setOpen] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 500));
  useEffect(() => {
    wait().then(() => setOpen(true));
  }, []);

  return (
    <Drawer
      open={open}
      modal={false}
      fixed
      dismissible={false}
    >
      <DrawerTrigger asChild>
        <div className='flex h-full grow items-center justify-center'>
          <button className='me-2 mt-[20px] hidden w-[100px] items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-[20px] font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Open
          </button>
        </div>
      </DrawerTrigger>
      <DrawerContent className='gift group z-[15] flex h-[62.5dvh] flex-col rounded-t-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] px-4 pb-12 backdrop-blur-3xl backdrop-filter focus:outline-none'>
        <div className='fade-bottom-dashboard h-full w-full pb-3 pl-3 pr-2'>
          <div className='mb-6 flex flex-row items-start text-white'>
            <Image
              src='/assets/icons/icon_message.svg'
              width={24}
              height={24}
              className='mr-2 h-6 w-6 invert'
              alt=''
            />
            <h2 className='text-center text-2xl font-bold'>メッセージ</h2>
          </div>
          <ArtistCardMessageAccordion
            giftLogs={giftLogs!}
            eventHash={eventHash!}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
