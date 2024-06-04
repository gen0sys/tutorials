'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getDashboard } from '@/api/get-dashboard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { ArtistCard } from './artist/artist-card';
import { LivehouseCard } from './livehouse/livehouse-card';

export const CarouselContainer = () => {
  const session = useSession();
  const role = session.data?.user.role;
  const { isPending, data: dashboardInfo } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });

  if (isPending) {
    return <></>;
  }

  if (dashboardInfo) {
    const eventList = Object.values(dashboardInfo.events);

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
                    key={event.event_name}
                    data-carousel-item
                    className='basis-9/12'
                  >
                    {role === 'artist' && <ArtistCard event={event} />}
                    {role === 'livehouse' && <LivehouseCard event={event} />}
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
};
