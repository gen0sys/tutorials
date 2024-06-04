'use client';

import Image from 'next/image';

import { GiftLog } from '@/types';

export const GiftLogMessage = ({
  giftLog,
}: {
  giftLog: GiftLog | undefined;
}) => {
  return (
    <div className='relative flex h-[64px] w-full flex-row items-center justify-between rounded-[32px] bg-white'>
      <div className='relative flex h-16 w-[96px] items-center justify-start rounded-[32px] bg-white'>
        <Image
          width={60}
          height={60}
          alt=''
          className='rounded-[32px] border-4 border-white'
          src={
            giftLog?.listener_avatar
              ? giftLog?.listener_avatar
              : 'https://via.placeholder.com/64x64'
          }
        />
        {giftLog?.artist_avatar && (
          <Image
            width={60}
            height={60}
            alt=''
            className='absolute left-8 top-1/2 z-10 -translate-y-1/2  rounded-[32px] border-4 border-white'
            src={giftLog?.artist_avatar}
          />
        )}
      </div>
      <div className='flex h-full grow flex-col'>
        <div className='pt-2'>
          <h4 className='text-left text-base font-bold text-black'>
            {giftLog?.artist_name}
          </h4>
        </div>
        <div className='flex flex-row items-end gap-6 pb-2'>
          <div className='relative flex h-6 w-20 items-center justify-end rounded-[32px] bg-black pr-2 text-white'>
            <Image
              src='/assets/icons/icon_gift.svg'
              height={16}
              width={16}
              alt=''
              className='absolute left-[6px]'
            />
            {giftLog?.gift_price}
          </div>
          <div>
            <p className='text-right text-xs font-bold text-neutral-400'>
              2024年12月12日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
