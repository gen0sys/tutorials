'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';

import { getGiftLogs } from '@/api/get-gift-logs';
import { getMyPage } from '@/api/get-my-page';
import { signOutUser } from '@/app/actions/sign-out';
import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { ArtistCard } from './_components/artist-card';
import FavoritesButton from './_components/favorites-button';
import GiftButton from './_components/gift-button';
import { GiftLogListAccordion } from './_components/gift-log-list-accordion';
import { TabMenu } from './_components/tab-menu';

const MyPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ['logs'],
    queryFn: () => getGiftLogs(),
  });

  const session = useSession();
  const role = session.data?.user.role;

  const { isPending: myPageDataPending, data: myPageData } = useQuery({
    queryKey: ['mypage'],
    queryFn: () => getMyPage(),
    enabled: role === 'artist' || role === 'livehouse',
  });
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('action') === 'gift' ? 1 : 0);
  const tabMenuRef = useRef<ElementRef<'div'>>(null);

  return (
    <>
      <div className='px-4'>
        <Header>MY PAGE</Header>
      </div>
      <div
        className={cn(
          'relative mb-0 flex h-full w-full grow flex-col justify-center overflow-hidden text-black'
        )}
      >
        <Carousel
          className='absolute h-full w-full'
          opts={{
            align: 'center',
            startIndex: searchParams.get('action') === 'gift' ? 1 : 0,
          }}
        >
          <div className='px-4'>
            {role === 'listener' && (
              <TabMenu
                tab={tab}
                setTab={setTab}
                tabMenuRef={tabMenuRef}
              />
            )}
            <div className='pb-3'></div>
          </div>
          <CarouselContent className='h-full'>
            <CarouselItem>
              <Card className='h-full rounded-none border-0 bg-transparent shadow-none'>
                <CardContent className='flex h-full flex-col items-center justify-start p-3'>
                  <div className='aspect-square max-h-[45%] min-h-[42.5%] rounded-[48px] border-2 border-white/[0.16] bg-black/[0.08] p-8 backdrop-blur-[32px] backdrop-filter'>
                    <div className='flex h-full items-center justify-center rounded-2xl p-4 outline outline-[16px] outline-offset-2 outline-white/30'>
                      <div className='relative h-full w-full'>
                        {role === 'artist' || role === 'livehouse' ? (
                          myPageDataPending ? (
                            <Skeleton className='h-full w-full' />
                          ) : myPageData?.avatar ? (
                            <Image
                              src={myPageData?.avatar}
                              fill
                              alt=''
                              className='rounded-lg bg-white'
                            />
                          ) : (
                            <Image
                              src='/assets/qrcode_example.png'
                              width={320}
                              height={320}
                              alt=''
                              className='bg-white'
                            />
                          )
                        ) : (
                          <Image
                            src='/assets/qrcode_example.png'
                            width={320}
                            height={320}
                            alt=''
                            className='bg-white'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='mt-2 flex flex-row items-center justify-center gap-2'>
                    <button
                      className='relative flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-[32px] border-2 border-white/30 bg-black/[0.08]'
                      onClick={async () => {
                        await signOutUser();
                      }}
                    >
                      <Image
                        src='/assets/buttons/btn_logout.svg'
                        alt=''
                        height={64}
                        width={64}
                      />
                      <p className='text-center text-xs font-bold text-white'>
                        ログアウト
                      </p>
                    </button>
                    {role === 'listener' && (
                      <>
                        <GiftButton
                          setTab={setTab}
                          tabMenuRef={tabMenuRef}
                        />
                        <FavoritesButton
                          setTab={setTab}
                          tabMenuRef={tabMenuRef}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='h-full rounded-none border-0 bg-transparent shadow-none'>
                <CardContent className='flex h-full flex-col items-center justify-start p-0'>
                  {isPending ? (
                    <p className='px-4'>Loading...</p>
                  ) : data?.status === 'not_found' ? (
                    <p className='px-4'>ギフトはありません</p>
                  ) : (
                    <GiftLogListAccordion data={data} />
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='h-full rounded-none border-0 bg-transparent shadow-none'>
                <CardContent className='fade-bottom flex h-full flex-col items-center justify-start p-0'>
                  <div className='fade-bottom h-full w-full overflow-y-auto'>
                    <div className='mb-[200px] grid grid-cols-1 justify-items-center gap-2'>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <ArtistCard key={index} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default MyPage;
