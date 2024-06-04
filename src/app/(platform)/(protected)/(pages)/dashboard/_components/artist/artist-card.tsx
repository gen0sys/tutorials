'use client';

import { useGSAP } from '@gsap/react';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { getEventArtist } from '@/api/get-event-artist';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardEvent } from '@/types';

import { ArtistSelectedCard } from './artist-selected-card';

export const ArtistCard = ({ event }: { event: DashboardEvent }) => {
  const PARTS = event.link.split('/');
  const link = PARTS[PARTS.length - 2];

  const { data: eventArtistInfo, refetch } = useQuery({
    queryKey: ['event-artist', link],
    queryFn: () => getEventArtist(link),
    staleTime: 10000,
  });

  const [opened, setOpened] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const tl = useRef(
    gsap.timeline({
      paused: true,
      reversed: true,
      onComplete: () => {
        setOpened(true);
      },
    })
  );

  useGSAP(
    () => {
      tl.current
        .to('#event-info-btn', {
          bottom: '-3.5rem',
          opacity: '0',
          duration: 0.2,
        })
        .to('hr', {
          opacity: '0',
          duration: 0.2,
        });
    },
    { scope: cardRef }
  );

  function menuOpen() {
    if (tl.current.reversed()) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }

  return (
    <>
      <div
        className='h-full'
        ref={cardRef}
      >
        <Card
          className='h-full rounded-[32px] border-0 bg-transparent bg-cover bg-center bg-no-repeat shadow-none '
          style={{
            backgroundImage: event.featured_image
              ? `url(${event.featured_image})`
              : 'url(https://via.placeholder.com/480x480)',
          }}
        >
          <CardContent className='relative flex h-full items-center justify-center px-0 pt-28'>
            <div className='absolute top-8 flex w-full flex-col items-center px-6'>
              <div className='flex w-full flex-row items-center justify-between'>
                <h3 className='text-5xl font-bold text-neon-green'>
                  {event.event_name}
                </h3>
              </div>
            </div>
            <hr className='absolute inset-x-0 bottom-[4rem] border-4 border-b-0 border-l-0 border-r-0 border-dotted' />
            <div
              className='absolute inset-x-0 bottom-2 mx-auto h-12 w-full px-[8px]'
              id='event-info-btn'
              onClick={() => {
                menuOpen();
                //refetch();
              }}
            >
              <div className='h-full w-full rounded-[32px] bg-white'>
                <div className='absolute right-[12px] top-[4px] h-10 w-10'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-[32px] bg-neon-green'>
                    <Image
                      src='/assets/icons/icon_arrow.svg'
                      width={25}
                      height={25}
                      alt='home'
                      className='h-auto w-auto'
                    />
                  </div>
                </div>
                <div className='absolute left-[24px] top-1/2 -translate-y-1/2 transform text-base font-bold text-black'>
                  Event Information
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {opened &&
        createPortal(
          <ArtistSelectedCard
            eventTitle={event.event_name}
            parentCardRef={cardRef}
            setOpened={setOpened}
            menuOpen={menuOpen}
            eventArtistInfo={eventArtistInfo}
            event={event}
          />,
          document.body
        )}
    </>
  );
};
