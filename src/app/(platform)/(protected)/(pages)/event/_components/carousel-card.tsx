'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types';

import { SelectedCard } from './selected-card';

export const CarouselCard = ({ event }: { event: Event }) => {
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
        .to(
          'hr',
          {
            opacity: '0',
            duration: 0.2,
          },
          '<'
        );
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
          className='h-full rounded-[32px] border-0 bg-transparent bg-cover bg-center bg-no-repeat shadow-none'
          style={{
            backgroundImage: event.thumbnail
              ? `url(${event.thumbnail})`
              : 'url(https://via.placeholder.com/480x480)',
          }}
        >
          <CardContent className='relative flex h-full items-center justify-center px-0 pt-28'>
            <div className='absolute top-8 flex w-full flex-row items-center justify-between px-6'>
              <h3 className='text-5xl font-bold text-neon-green'>
                {event.event_title}
              </h3>
            </div>
            <hr className='absolute inset-x-0 bottom-[4rem] border-4 border-b-0 border-l-0 border-r-0 border-dotted' />
            <button
              className='absolute inset-x-0 bottom-2 mx-auto h-12 w-full px-[8px]'
              id='event-info-btn'
              onClick={() => {
                menuOpen();
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
            </button>
          </CardContent>
        </Card>
      </div>
      {opened &&
        createPortal(
          <SelectedCard
            eventTitle={event.event_title}
            parentCardRef={cardRef}
            setOpened={setOpened}
            menuOpen={menuOpen}
            event={event}
          />,
          document.body
        )}
    </>
  );
};
