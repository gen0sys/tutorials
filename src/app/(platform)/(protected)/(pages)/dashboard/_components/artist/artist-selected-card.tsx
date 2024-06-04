'use client';

import { useGSAP } from '@gsap/react';
import { useQueryClient } from '@tanstack/react-query';
import gsap from 'gsap';
import Image from 'next/image';
import { Dispatch, RefObject, SetStateAction, useRef } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DashboardEvent, EventArtistResponse } from '@/types';

import { ArtistDrawer } from './artist-drawer';
import { ArtistUploadImage } from './artist-upload-image';

export const ArtistSelectedCard = ({
  parentCardRef,
  eventTitle,
  setOpened,
  menuOpen,
  eventArtistInfo,
  event,
}: {
  parentCardRef: RefObject<HTMLDivElement>;
  eventTitle: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
  menuOpen: () => void;
  eventArtistInfo?: EventArtistResponse | undefined;
  event: DashboardEvent;
}) => {
  const rect = parentCardRef.current?.getBoundingClientRect();
  const selectedCardRef = useRef(null);
  const queryClient = useQueryClient();

  const PARTS = event.link.split('/');
  const eventHash = PARTS[PARTS.length - 2];

  const tl = useRef(
    gsap.timeline({
      onStart: () => {
        gsap.set(selectedCardRef.current, {
          left: rect?.left,
        });
        queryClient.invalidateQueries({
          queryKey: ['event-artist', eventHash],
        });
      },
      onReverseComplete: () => {
        setOpened(false);
        menuOpen();
      },
    })
  );

  useGSAP(
    () => {
      tl.current
        .to(selectedCardRef.current, {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          duration: 0.4,
          ease: 'power3.in',
        })
        .to(
          '.card',
          {
            borderRadius: 0,
            duration: 0.4,
          },
          '<'
        )
        .fromTo(
          '#top-items',
          {
            y: -1000,
          },
          {
            duration: 0.5,
            y: 0,
          }
        );
    },
    { scope: selectedCardRef }
  );

  const { contextSafe } = useGSAP({ scope: 'body' });
  const hideDrawer = contextSafe(() => {
    gsap.to('[vaul-drawer]', { y: 1000 });
  });

  return (
    <div
      className={cn('absolute top-[10.5rem] z-[15] h-[calc(100%_-_19.5rem)]')}
      style={{ width: `${rect?.width}px` }}
      ref={selectedCardRef}
    >
      <Card
        className='card h-full rounded-[32px] border-0 bg-transparent bg-cover bg-center bg-no-repeat shadow-none'
        style={{
          backgroundImage: event.featured_image
            ? `url(${event.featured_image})`
            : 'url(https://via.placeholder.com/480x480)',
        }}
      >
        <CardContent className='relative flex h-full items-center justify-center px-0 pt-28'>
          <div className='absolute top-8 flex w-full flex-col items-start justify-between px-6'>
            <div className='flex w-full flex-row items-start justify-between'>
              <h3 className='text-5xl font-bold text-neon-green'>
                {eventTitle}
              </h3>
              <Image
                src='/assets/buttons/btn_close.svg'
                alt=''
                width={40}
                height={40}
                onClick={() => {
                  tl.current.reverse();
                  hideDrawer();
                }}
              />
            </div>
            <div
              id='top-items'
              className='flex w-full flex-col items-center'
            >
              <div className='mt-6 flex w-full flex-row items-center justify-evenly text-white'>
                <div className='relative h-12 w-[150px]'>
                  <div className='absolute left-0 top-0 flex h-12 w-[150px] items-center justify-end rounded-[32px] border border-white bg-black pr-3'>
                    <Image
                      src='/assets/icons/icon_gift.svg'
                      height={24}
                      width={24}
                      alt=''
                      className='absolute left-3 top-3'
                    />
                    {eventArtistInfo?.total_gift_count}
                  </div>
                </div>
                <div className='relative h-12 w-[150px]'>
                  <div className='absolute left-0 top-0 flex h-12 w-[150px] items-center justify-end rounded-[32px] border border-white bg-black pr-3'>
                    <Image
                      src='/assets/icons/icon_currency.svg'
                      height={24}
                      width={24}
                      alt=''
                      className='absolute left-3 top-3'
                    />
                    {eventArtistInfo?.total_gift_price}円
                  </div>
                </div>
              </div>
              <ArtistUploadImage
                event_artist_hash={eventHash!}
                gift_image={eventArtistInfo?.return_file}
                link={event.link}
              />
            </div>
          </div>
          <div className='h-full w-full overflow-x-hidden overflow-y-hidden'>
            <ArtistDrawer
              giftLogs={eventArtistInfo?.gift_logs}
              eventHash={eventHash}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
