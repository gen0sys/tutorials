import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { Dispatch, RefObject, SetStateAction } from 'react';

import { useCarousel } from '@/components/ui/carousel';

const GiftButton = ({
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
    const target = document.getElementById('gift-tab') as HTMLElement;

    gsap.to('#highlight', {
      left: `${target?.offsetLeft}px`,
      width: target?.offsetWidth,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });

  return (
    <button
      id='gift-button'
      className='relative flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-[32px] border-2 border-white/30 bg-black/[0.08]'
      onClick={() => {
        scrollTo(1);
        setTab(1);
        scrollAnimation();
      }}
    >
      <Image
        src='/assets/buttons/btn_white_gift.svg'
        alt=''
        height={64}
        width={64}
      />
      <p className='text-center text-xs font-bold text-white'>ギフト</p>
    </button>
  );
};

export default GiftButton;
