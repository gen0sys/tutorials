'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useSearchParams } from 'next/navigation';
import { Dispatch, RefObject, SetStateAction, useRef } from 'react';
import { MouseEvent } from 'react';

import { useCarousel } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export function TabMenu({
  tab,
  setTab,
  tabMenuRef,
}: {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  tabMenuRef: RefObject<HTMLDivElement>;
}) {
  const { scrollTo } = useCarousel();

  const { contextSafe } = useGSAP({ scope: tabMenuRef }); // we can pass in a config object as the 1st parameter to make scoping simple

  const ClickAnimation = contextSafe((e: MouseEvent, index: number) => {
    const target = e.currentTarget as HTMLElement;
    gsap.to('#highlight', {
      left: `${target?.offsetLeft}px`,
      width: target?.offsetWidth,
      duration: 0.5,
      ease: 'power3.inOut',
    });
    scrollTo(index);
  });

  const searchParams = useSearchParams();

  useGSAP(
    () => {
      if (searchParams.get('action') === 'gift') {
        const target = document.getElementById('gift-tab') as HTMLElement;

        gsap.set('#highlight', {
          left: `${target?.offsetLeft}px`,
          width: target?.offsetWidth,
        });
      }
    },
    { dependencies: [searchParams] }
  );

  return (
    <div
      ref={tabMenuRef}
      id='tab-menu'
      className='rounded-3xl text-base font-bold'
    >
      <div className='relative flex h-[40px] translate-x-0 items-center justify-between rounded-3xl bg-black/25'>
        <button
          className={cn(
            'flex h-[40px] w-28 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 0 ? 'active text-black' : 'text-white'
          )}
          onClick={(e) => {
            setTab(0);
            ClickAnimation(e, 0);
          }}
        >
          アカウント
        </button>
        <button
          id='gift-tab'
          className={cn(
            'flex h-[40px] w-28 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 1 ? 'active text-black' : 'text-white'
          )}
          onClick={(e) => {
            setTab(1);
            ClickAnimation(e, 1);
          }}
        >
          ギフト
        </button>
        <button
          id='favorite-tab'
          className={cn(
            'flex h-[40px] w-28 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 2 ? 'active text-black' : 'text-white'
          )}
          onClick={(e) => {
            setTab(2);
            ClickAnimation(e, 2);
          }}
        >
          お気に入り
        </button>
        <span
          id='highlight'
          className='absolute z-[-1] h-[40px] w-28 p-1'
        >
          <span className='inline-block h-full w-full rounded-[50px] bg-neon-green ' />
        </span>
      </div>
    </div>
  );
}
