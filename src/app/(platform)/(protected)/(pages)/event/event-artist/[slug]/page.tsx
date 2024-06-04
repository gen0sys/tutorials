'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { getEventArtist } from '@/api/get-event-artist';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { GiftFlowDrawer } from '../../_components/gift-flow/gift-flow-drawer';
import { MessageDrawer } from '../../_components/message-drawer';

const EventArtistPage = () => {
  const session = useSession();
  const role = session.data?.user.role;
  const params = useParams();
  const router = useRouter();

  const { isPending, data: artistInfo } = useQuery({
    queryKey: ['event-artist', params.slug],
    queryFn: () => getEventArtist(params.slug as string),
  });

  const [opened, setOpened] = useState(false);
  const selectedArtistRef = useRef(null);

  const [openedDrawer, setOpenedDrawer] = useState('messages');

  const wait = () => new Promise((resolve) => setTimeout(resolve, 750));

  if (isPending) {
    <></>;
  }

  useEffect(() => {
    wait().then(() => setOpened(true));
  }, []);

  return (
    <div
      className='absolute z-[16] h-full w-full'
      ref={selectedArtistRef}
    >
      <Card
        className='card h-full rounded-none border-0 bg-transparent bg-cover bg-center bg-no-repeat shadow-none'
        style={{ backgroundImage: `url(${artistInfo?.artist_image}` }}
      >
        <CardContent className='relative flex h-full items-center justify-center px-0 pt-72'>
          <div className='title absolute top-8 flex w-full flex-col items-start justify-start px-6'>
            <Image
              src='/assets/buttons/btn_back.svg'
              alt=''
              width={40}
              height={40}
              onClick={() => {
                router.back();
              }}
            />
            <h5 className='font-bold'>{artistInfo?.event_name}</h5>
            <h3 className='text-5xl font-bold uppercase text-neon-green'>
              {artistInfo?.artist_name}
            </h3>
            <div className='relative mt-12 flex h-12 w-full flex-row items-center justify-center justify-self-center'>
              {openedDrawer === 'messages' ? (
                <div className='absolute flex h-12 grow items-center justify-center'>
                  <button
                    className={cn(
                      'relative h-12 w-[235px]',
                      role !== 'listener' && 'opacity-30 grayscale filter'
                    )}
                    type='button'
                    onClick={() => {
                      setOpenedDrawer('gift');
                    }}
                    disabled={role !== 'listener'}
                  >
                    <Image
                      src='/assets/icons/icon_gift.svg'
                      alt=''
                      width={24}
                      height={24}
                      className='absolute left-5 top-1/2 -translate-y-1/2 invert'
                    />
                    <div className='flex h-12 w-[235px] items-center justify-center rounded-[32px] bg-neon-green'>
                      <p className='text-center text-xl font-semibold text-black'>
                        ギフトを送る
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className='absolute flex h-12 grow items-center justify-center'>
                  <button
                    className={cn(
                      'relative h-12 w-[235px]',
                      role !== 'listener' && 'opacity-30 grayscale filter'
                    )}
                    type='button'
                    onClick={() => {
                      setOpenedDrawer('messages');
                    }}
                    disabled={role !== 'listener'}
                  >
                    <Image
                      src='/assets/icons/icon_message.svg'
                      alt=''
                      width={24}
                      height={24}
                      className='absolute left-5 top-1/2 -translate-y-1/2'
                    />
                    <div className='flex h-12 w-[235px] items-center justify-center rounded-[32px] bg-neon-green'>
                      <p className='ml-5 text-center text-xl font-semibold text-black'>
                        メッセージを見る
                      </p>
                    </div>
                  </button>
                </div>
              )}
              {opened && (
                <>
                  <GiftFlowDrawer open={openedDrawer} />
                  <MessageDrawer
                    giftLogs={artistInfo?.gift_logs}
                    open={openedDrawer}
                  />
                </>
              )}
            </div>
          </div>
          <div className='relative h-full w-full overflow-x-hidden overflow-y-hidden'></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventArtistPage;
