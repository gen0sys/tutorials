import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Image from 'next/image';

import { getDashboard } from '@/api/get-dashboard';
import { getSession } from '@/app/actions/get-session';
import artistBackground from '@/assets/artist_background.jpg';
import livehouseBackground from '@/assets/livehouse_background.jpg';
import { Header } from '@/components/header';
import { TabMenu } from '@/components/tab-menu';

import { CarouselContainer } from './_components/carousel-container';

const Dashboard = async () => {
  const session = await getSession();
  const role = session?.user.role;
  const backgroundImage =
    role === 'artist' ? artistBackground : livehouseBackground;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });

  return (
    <>
      <div className='absolute inset-0 -z-10 flex h-screen w-full items-center justify-center overflow-hidden'>
        <Image
          src={backgroundImage}
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

export default Dashboard;
