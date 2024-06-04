'use client';

import { useMutationState } from '@tanstack/react-query';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { GiftLog } from '@/types';

export const ArtistCardMessage = ({
  giftLog,
}: {
  giftLog: GiftLog | undefined;
}) => {
  const variables = useMutationState<string>({
    filters: {
      mutationKey: ['addComment', giftLog?.gift_log_hash],
      status: 'pending',
    },
    select: (mutation) => mutation.state.variables as string,
  });

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-between rounded-[32px] bg-white',
        giftLog?.comment_reply || variables.length > 0 ? 'h-[85px]' : 'h-[64px]'
      )}
    >
      <div
        className={cn(
          'flex h-full w-full flex-row',
          giftLog?.comment_reply || variables.length > 0
            ? 'items-baseline'
            : 'items-center'
        )}
      >
        <div
          className={cn(
            'relative flex h-16 items-center justify-start rounded-[32px] bg-white',
            (giftLog?.artist_avatar && giftLog.comment_reply) ||
              variables.length > 0
              ? ' w-[96px]'
              : ' w-16'
          )}
        >
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
          {giftLog?.artist_avatar && variables.length > 0 && (
            <Image
              width={60}
              height={60}
              alt=''
              className='absolute left-8 top-1/2 z-10 -translate-y-1/2  animate-pulse rounded-[32px] border-4 border-white opacity-50'
              src={giftLog?.artist_avatar}
            />
          )}
          {giftLog?.artist_avatar && giftLog.comment_reply && (
            <Image
              width={60}
              height={60}
              alt=''
              className='absolute left-8 top-1/2 z-10 -translate-y-1/2  rounded-[32px] border-4 border-white'
              src={giftLog?.artist_avatar}
            />
          )}
        </div>
        <div
          className={cn(
            'grow text-left text-base text-black',
            giftLog?.comment_reply || variables.length > 0
              ? 'self-end pb-3'
              : 'self-center'
          )}
        >
          <p>{giftLog?.comment}</p>
          {variables.length > 0 ? (
            <p className='animate-pulse font-bold opacity-50'>{variables[0]}</p>
          ) : (
            <p className='font-bold'>{giftLog?.comment_reply}</p>
          )}
        </div>
      </div>
    </div>
  );
};
