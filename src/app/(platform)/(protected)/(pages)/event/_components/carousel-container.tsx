'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getEvents } from '@/api/get-events';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { CarouselCard } from './carousel-card';

export const CarouselContainer = () => {
  const session = useSession();
  const { isPending, data: eventList } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  if (isPending) {
    return <></>;
  }

  if (eventList) {
    return (
      <div className='relative mb-36 flex h-full w-full grow justify-center text-black'>
        <Carousel
          className='absolute h-full w-full'
          id='carousel'
          opts={{
            align: 'center',
          }}
        >
          <CarouselContent className='h-full'>
            {eventList &&
              eventList.map((event) => {
                return (
                  <CarouselItem
                    key={event.event_title}
                    data-carousel-item
                    className='basis-9/12'
                  >
                    <CarouselCard event={event} />
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
};
