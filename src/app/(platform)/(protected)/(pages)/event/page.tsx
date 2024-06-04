import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Image from 'next/image';

import { getEvents } from '@/api/get-events';
import eventBackground from '@/assets/event_background.jpg';
import { Header } from '@/components/header';
import { TabMenu } from '@/components/tab-menu';

import { CarouselContainer } from './_components/carousel-container';

const Event = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return (
    <>
      <div className='absolute inset-0 -z-10 flex h-screen w-full items-center justify-center overflow-hidden'>
        <Image
          src={eventBackground}
          priority
          fill
          alt=''
          className='object-cover'
        />
      </div>
      <div className='px-4'>
        <Header>EVENT</Header>
        <TabMenu />
        <div className='pb-8'></div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarouselContainer />
      </HydrationBoundary>
    </>
  );
};

export default Event;
