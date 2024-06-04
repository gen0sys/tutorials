import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React, { Dispatch, RefObject, SetStateAction } from 'react';

import { useCarousel } from '@/components/ui/carousel';

const FavoritesButton = ({
  setTab,
  tabMenuRef,
}: {
  setTab: Dispatch<SetStateAction<number>>;
  tabMenuRef: RefObject<HTMLDivElement>;
}) => {
  const { scrollTo } = useCarousel();

  const { contextSafe } = useGSAP({
    scope: tabMenuRef,
  });

  const scrollAnimation = contextSafe(() => {
    const target = document.getElementById('favorite-tab') as HTMLElement;

    gsap.to('#highlight', {
      left: `${target?.offsetLeft}px`,
      width: target?.offsetWidth,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });

  return (
    <button
      id='favorite-button'
      className='relative flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-[32px] border-2 border-white/30 bg-black/[0.08]'
      onClick={() => {
        scrollTo(2);
        setTab(2);
        scrollAnimation();
      }}
    >
      <Image
        src='/assets/buttons/btn_favorite.svg'
        alt=''
        height={64}
        width={64}
      />
      <p className='text-center text-xs font-bold text-white'>お気に入り</p>
    </button>
  );
};

export default FavoritesButton;
