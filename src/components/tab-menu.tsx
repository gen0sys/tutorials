'use client';

import { gsap } from 'gsap';
import { useState } from 'react';
import { MouseEvent } from 'react';

import { cn } from '@/lib/utils';

export function TabMenu() {
  const [tab, setTab] = useState(0);

  function ClickAnimation(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    gsap.to('#highlight', {
      left: `${target?.offsetLeft}px`,
      width: target?.offsetWidth,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  }

  return (
    <div className='rounded-3xl text-base font-bold'>
      <div className='relative flex h-[40px] translate-x-0 items-center justify-between rounded-3xl bg-black/25'>
        <button
          className={cn(
            'flex h-[40px] w-16 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 0 && 'active text-black'
          )}
          onClick={(e) => {
            setTab(0);
            ClickAnimation(e);
          }}
        >
          All
        </button>
        <button
          className={cn(
            'flex h-[40px] w-16 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 1 && 'active text-black'
          )}
          onClick={(e) => {
            setTab(1);
            ClickAnimation(e);
          }}
        >
          2024
        </button>
        <button
          className={cn(
            'flex h-[40px] w-16 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 2 && 'active text-black'
          )}
          onClick={(e) => {
            setTab(2);
            ClickAnimation(e);
          }}
        >
          2023
        </button>
        <button
          className={cn(
            'flex h-[40px] w-16 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 3 && 'active text-black'
          )}
          onClick={(e) => {
            setTab(3);
            ClickAnimation(e);
          }}
        >
          2022
        </button>
        <button
          className={cn(
            'flex h-[40px] w-16 items-center justify-center rounded-[50px] transition duration-300 ease-in-out',
            tab === 4 && 'active text-black'
          )}
          onClick={(e) => {
            setTab(4);
            ClickAnimation(e);
          }}
        >
          2021
        </button>
        <span
          id='highlight'
          className='absolute z-[-1] h-[40px] w-16 p-1'
        >
          <span className='inline-block h-full w-full rounded-[50px] bg-neon-green ' />
        </span>
      </div>
    </div>
  );
}
