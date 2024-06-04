'use client';

import { useEffect, useState } from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Artists, GiftLogs } from '@/types';

import { LivehouseArtistCard } from './livehouse-artist-card';

export const LivehouseDrawer = ({
  giftLogs,
  eventArtists,
}: {
  giftLogs?: GiftLogs | undefined;
  eventArtists?: Artists;
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
            <h2 className='text-center text-2xl font-bold'>アーティスト売上</h2>
          </div>
          <div className='h-full overflow-y-auto pb-44'>
            <div className='grid grid-cols-1 justify-items-center gap-2'>
              {eventArtists
                ? Object.entries(eventArtists).map(([id, eventArtist]) => {
                    return (
                      <LivehouseArtistCard
                        key={eventArtist.artist_name}
                        artist={eventArtist}
                      />
                    );
                  })
                : 'メッセージはありません'}
              {giftLogs &&
                Object.values(giftLogs).every((log) => log.comment === null) &&
                'メッセージはありません'}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
