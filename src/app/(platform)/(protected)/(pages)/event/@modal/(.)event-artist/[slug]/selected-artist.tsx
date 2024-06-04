'use client';

import { useGSAP } from '@gsap/react';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { getEvent } from '@/api/get-event';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { EventArtistResponse } from '@/types';

import { GiftFlowDrawer } from '../../../_components/gift-flow/gift-flow-drawer';
import { MessageDrawer } from '../../../_components/message-drawer';

export const SelectedArtist = ({
  artist,
  rect,
  isPending,
}: {
  artist?: EventArtistResponse;
  rect: DOMRect | undefined;
  isPending: boolean;
}) => {
  const session = useSession();
  const role = session.data?.user.role;
  const [opened, setOpened] = useState(false);
  const selectedArtistRef = useRef(null);
  const searchParams = useSearchParams();
  const params = useParams();

  const [openedDrawer, setOpenedDrawer] = useState('messages');

  const router = useRouter();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

  const tl = useRef(
    gsap.timeline({
      onStart: () => {
        gsap.set(selectedArtistRef.current, {
          left: rect?.left,
          top: rect?.top,
        });
      },
      onComplete: () => {
        wait().then(() => setOpened(true));
      },
      onReverseComplete: () => {
        gsap.to(selectedArtistRef.current, {
          width: rect?.width,
          onComplete: () => {
            router.back();
          },
        });
      },
    })
  );

  useGSAP(
    () => {
      if (isPending === false) {
        tl.current
          .to(selectedArtistRef.current, {
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            duration: 0.4,
            ease: 'power3.in',
          })
          .to(
            ['.card', '#bg-container'],
            {
              borderRadius: 0,
              duration: 0.4,
            },
            '<'
          )
          .fromTo(
            '.title',
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
            }
          ),
          '>';
      }
    },
    { scope: selectedArtistRef, dependencies: [isPending] }
  );

  const { contextSafe } = useGSAP({ scope: 'body' });
  const hideDrawer = contextSafe(() => {
    gsap.to('[vaul-drawer]', { y: 1000 });
  });

  if (isPending === true) {
    return;
  }

  return (
    <div
      style={{
        width: `${rect?.width}px`,
        height: `${rect?.height}px`,
      }}
      className='absolute z-[16]'
      ref={selectedArtistRef}
    >
      <Card className='card h-full rounded-[32px] border-0 bg-transparent shadow-none'>
        <div
          id='bg-container'
          className='absolute inset-0 -z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-[32px]'
        >
          <Image
            src={
              artist?.artist_image
                ? artist.artist_image
                : 'https://via.placeholder.com/320x320'
            }
            priority
            fill
            alt=''
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
          />
        </div>
        <CardContent className='relative flex h-full items-center justify-center px-0 pt-72'>
          <div className='title absolute top-8 flex w-full flex-col items-start justify-start px-6'>
            <Image
              src='/assets/buttons/btn_back.svg'
              alt=''
              width={40}
              height={40}
              onClick={() => {
                hideDrawer();
                tl.current.reverse();
              }}
            />
            <h5 className='font-bold'>{artist?.event_name}</h5>
            <h3 className='text-5xl font-bold uppercase text-neon-green'>
              {artist?.artist_name}
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
                    giftLogs={artist?.gift_logs}
                    open={openedDrawer}
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
