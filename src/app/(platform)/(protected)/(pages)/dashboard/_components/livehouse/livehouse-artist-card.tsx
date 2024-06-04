'use client';

import Image from 'next/image';

import { Artist } from '@/types';

export const LivehouseArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className='relative h-[110px] w-full rounded-2xl border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] backdrop-blur-3xl backdrop-filter '>
      <div className='flex h-full w-full flex-row'>
        <div className='relative left-[8px] top-[8px] h-[94px] w-[94px] basis-1/3 '>
          <Image
            className='rounded-xl object-cover'
            src={
              artist.artist_image
                ? artist.artist_image
                : 'https://via.placeholder.com/94x94'
            }
            alt=''
            fill
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%'
          />
        </div>
        <div className='flex w-full basis-2/3 flex-col pl-4'>
          <div className='text-xl font-bold text-white'>
            {artist.artist_name}
          </div>
          <div className='flex h-full w-full flex-row items-end gap-x-2 space-x-2 pb-2 pr-2 text-white'>
            <div className='basis-1/3'>
              <h4 className='mb-2 text-xs font-bold text-stone-300'>
                ギフト数
              </h4>
              <div className='relative flex h-6 w-full items-center justify-end rounded-[32px] bg-black pr-2'>
                <Image
                  src='/assets/icons/icon_gift.svg'
                  height={16}
                  width={16}
                  alt=''
                  className='absolute left-[6px]'
                />
                {artist?.artist_gift_count}
              </div>
            </div>
            <div className='basis-2/3'>
              <h4 className='mb-2 text-xs font-bold text-stone-300'>
                ギフト売上価格
              </h4>
              <div className='relative flex h-6 w-full items-center justify-end rounded-[32px] bg-black pr-2'>
                <Image
                  src='/assets/icons/icon_currency.svg'
                  height={16}
                  width={16}
                  alt=''
                  className='absolute left-[4px]'
                />
                {artist?.artist_gift_price}円
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
