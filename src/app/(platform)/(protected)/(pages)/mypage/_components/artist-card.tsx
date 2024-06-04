'use client';

import Image from 'next/image';

import exampleArtist from '@/assets/example_artist.jpg';

export const ArtistCard = () => {
  return (
    <div className='relative h-[110px] w-full rounded-2xl border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] backdrop-blur-3xl backdrop-filter '>
      <div className='flex h-full w-full flex-row'>
        <div className='flex w-[110px] items-center justify-center p-2'>
          <Image
            className='h-full w-auto rounded-xl object-cover'
            src={exampleArtist}
            alt=''
          />
        </div>
        <div className='flex h-full grow flex-col px-4 pt-2'>
          <div className='flex w-full flex-row items-start justify-between'>
            <div className='text-xl font-bold text-black'>アーティスト名</div>
            <Image
              src={'/assets/icons/icon_star.svg'}
              alt=''
              height={26}
              width={26}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
