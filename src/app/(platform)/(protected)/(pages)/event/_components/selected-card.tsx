'use client';

import { useGSAP } from '@gsap/react';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import Image from 'next/image';
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';

import { getEvent } from '@/api/get-event';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Event } from '@/types';

import { ArtistList } from './artist-list';

export const SelectedCard = ({
  parentCardRef,
  eventTitle,
  setOpened,
  menuOpen,
  event,
}: {
  parentCardRef: RefObject<HTMLDivElement>;
  eventTitle: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
  menuOpen: () => void;
  event: Event;
}) => {
  const rect = parentCardRef.current?.getBoundingClientRect();
  const selectedCardRef = useRef(null);
  const [cardOpened, setCardOpened] = useState(false);

  const tl = useRef(
    gsap.timeline({
      onStart: () => {
        gsap.set(selectedCardRef.current, {
          left: rect?.left,
        });
      },
      onComplete: () => {
        setCardOpened(true);
      },
      onReverseComplete: () => {
        setOpened(false);
        menuOpen();
      },
    })
  );

  const secondTl = useRef(gsap.timeline());

  const { isPending, data, isStale } = useQuery({
    queryKey: ['event-artists', event.event_title.toLowerCase()],
    queryFn: () => getEvent(event.event_title.toLowerCase()),
    staleTime: 60000,
  });

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
        .to('#btn_close', { opacity: 1 }, '>');
    },
    { scope: selectedCardRef }
  );

  useGSAP(
    () => {
      if (isPending === false && cardOpened === true) {
        secondTl.current
          .to('#artist-cards', {
            delay: isStale ? 0 : 0.4,
            duration: 0.4,
            ease: 'sine.in',
            y: 0,
          })
          .set('#artist-cards', { overflowY: 'auto' }, '>');
      }
    },
    { scope: selectedCardRef, dependencies: [isPending, cardOpened, isStale] }
  );

  return (
    <div
      className={cn('absolute top-[10.5rem] z-[15] h-[calc(100%_-_19.5rem)]')}
      style={{ width: `${rect?.width}px` }}
      ref={selectedCardRef}
    >
      <Card
        className='card h-full rounded-[32px] border-0 bg-transparent bg-cover bg-center bg-no-repeat shadow-none'
        style={{
          backgroundImage: event.thumbnail
            ? `url(${event.thumbnail})`
            : 'url(https://via.placeholder.com/480x480)',
        }}
      >
        <CardContent className='fade-bottom-dashboard relative flex h-full items-center justify-center px-0 pt-28'>
          <div className='absolute top-8 flex w-full flex-row items-start justify-between px-6'>
            <h3 className='text-5xl font-bold text-neon-green'>{eventTitle}</h3>
            <Image
              id='btn_close'
              src='/assets/buttons/btn_close.svg'
              alt=''
              width={40}
              height={40}
              onClick={() => {
                secondTl.current.reverse();
                tl.current.reverse();
              }}
              className='opacity-0'
            />
          </div>
          <div
            className='relative h-full w-full translate-y-[1000px] overflow-x-hidden overflow-y-hidden pt-4'
            id='artist-cards'
          >
            <ArtistList
              eventTitle={eventTitle}
              data={data}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
