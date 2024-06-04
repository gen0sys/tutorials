'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getGift } from '@/api/gift-flow/get-gift';
import { submitGiftComment } from '@/api/gift-flow/submit-gift-comment';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { GiftResult } from '@/types';

interface IFormInput {
  comment: string;
}

export const SubmitComment = ({
  gift_log_hash,
  status,
  giftData,
}: {
  gift_log_hash: string;
  status: string;
  giftData?: GiftResult;
}) => {
  const [giftImage, setGiftImage] = useState<string | undefined>(
    giftData?.return_file
  );

  const { register, handleSubmit } = useForm<IFormInput>();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  async function onSubmit(values: IFormInput) {
    await submitGiftComment({
      comment: values.comment,
      gift_log_hash: searchParams.get('hash')!,
    });
    const res = await getGift({
      post_type: 'gift-log',
      hash_var: searchParams.get('hash')!,
      gift_action: 'thanks',
    });
    setGiftImage(() => res.return_file);
    router.replace(pathname);
    await queryClient.invalidateQueries({ queryKey: ['event-artist'] });
  }

  return (
    <div className='mx-auto max-w-xs pb-3 md:max-w-lg'>
      {status === 'waiting_for_comment' || status === 'payment_complete' ? (
        <form
          className='relative flex flex-col items-center gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='absolute left-0 top-0 inline-flex h-16 w-16 items-center justify-center p-1'>
            <Image
              width={64}
              height={64}
              alt=''
              className='h-full w-full rounded-[32px]'
              src='/assets/icons/icon_avatar.webp'
            />
          </div>
          <Input
            {...register('comment')}
            placeholder='メッセージを入力'
            className='h-16 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] pl-16 text-lg placeholder:text-white/60'
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2'
            id='reply-button'
          >
            <div className='absolute left-0 top-0 h-12 w-12'>
              <div className='absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-[32px] bg-neon-green'>
                <Image
                  src='/assets/icons/icon_arrow_up.svg'
                  height={11}
                  width={11}
                  alt=''
                />
              </div>
            </div>
          </button>
        </form>
      ) : (
        <div className='mb-8 flex flex-col items-center justify-center rounded-2xl p-4'>
          <p className='mb-3 text-base font-bold'>
            ギフトをお贈りいただき、ありがとうございます。
            <br />
            アーティストより御礼が届いています。
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button>
                <Image
                  src='/assets/buttons/btn_gift.svg'
                  width={256}
                  height={256}
                  alt=''
                  className='mb-3'
                />
              </button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className='bg-[rgba(0,_0,_0,_0.08)] backdrop-blur-3xl backdrop-filter' />

              <DialogContent className='justify-center border-0 bg-transparent shadow-none'>
                <DialogHeader>
                  <DialogTitle className='white text-2xl font-bold uppercase'>
                    {giftData?.artist_name}からの御礼品
                  </DialogTitle>
                </DialogHeader>
                {!giftImage ? (
                  <Skeleton className='h-72 w-72' />
                ) : (
                  <Image
                    src={giftImage}
                    height={288}
                    width={288}
                    alt=''
                    className='rounded-2xl border-4 border-neon-green'
                  />
                )}
                <Link href='/mypage?action=gift'>
                  <Image
                    src='/assets/buttons/btn_get.svg'
                    height={80}
                    width={272}
                    alt=''
                  />
                </Link>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      )}
    </div>
  );
};
