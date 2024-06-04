'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { submitGiftDonation } from '@/api/gift-flow/submit-gift-donation';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn, wait } from '@/lib/utils';

interface IFormInput {
  amount: string;
}

const DonationDrawer = ({
  gift_log_hash,
}: {
  gift_log_hash: string | undefined;
}) => {
  const [open, setOpen] = useState(true);

  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, isSubmitted, isDirty },
  } = useForm<IFormInput>({
    defaultValues: { amount: '' },
  });

  const router = useRouter();

  async function onSubmit(values: IFormInput) {
    await submitGiftDonation({
      price: values.amount,
      gift_log_hash: gift_log_hash as string,
    });
    setOpen(false);
    wait(500).then(() => router.push('/scanner'));
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      modal={false}
      fixed
    >
      <DrawerTrigger asChild>
        <div className='flex h-full grow items-center justify-center'>
          {!open && (
            <Button
              variant='outline'
              className='text-black'
            >
              Open
            </Button>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className='gift group min-h-[50%] rounded-t-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] px-4 pb-24 backdrop-blur-3xl backdrop-filter focus:outline-none'>
        <form
          className='grid items-start gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='relative w-full'>
            <Image
              width={32}
              height={32}
              alt=''
              className='absolute left-4 top-1/2 -translate-y-1/2 rounded-[32px]'
              src='/assets/icons/icon_currency.svg'
            />
            <Input
              {...register('amount')}
              className='h-16 rounded-[32px] border-[1px] border-white/15 bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] pl-16 text-lg placeholder:text-white/60'
              disabled={isSubmitting || isSubmitted || isDirty === false}
            />
            <button
              type='submit'
              className={cn(
                'absolute right-1 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-[32px] border-[2px] border-white/15',
                isDirty === true && 'bg-neon-green',
                isSubmitting === true || isSubmitted === true
                  ? 'opacity-30'
                  : ''
              )}
              disabled={isSubmitting || isSubmitted || isDirty === false}
            >
              <Image
                src='/assets/icons/icon_arrow_up.svg'
                height={12}
                width={12}
                alt=''
              />
            </button>
          </div>
          <div className='py-4'>
            <Separator className='absolute inset-x-0 opacity-50' />
          </div>
        </form>
        <div className='mb-8 grid grid-cols-2 gap-3'>
          <button
            onClick={() => setValue('amount', '500', { shouldDirty: true })}
            className='h-12 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] '
          >
            <p className='text-xl font-semibold text-white'>¥500</p>
          </button>
          <button
            onClick={() => setValue('amount', '1000', { shouldDirty: true })}
            className='h-12 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] '
          >
            <p className='text-xl font-semibold text-white'>¥1,000</p>
          </button>
          <button
            onClick={() => setValue('amount', '1500', { shouldDirty: true })}
            className='h-12 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] '
          >
            <p className='text-xl font-semibold text-white'>¥1,500</p>
          </button>
          <button
            onClick={() => setValue('amount', '2000', { shouldDirty: true })}
            className='h-12 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] '
          >
            <p className='text-xl font-semibold text-white'>¥2,000</p>
          </button>
          <button
            onClick={() => setValue('amount', '2500', { shouldDirty: true })}
            className='h-12 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] '
          >
            <p className='text-xl font-semibold text-white'>¥2,500</p>
          </button>
          <button
            onClick={() => reset()}
            className='h-12 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] '
          >
            <p className='text-xl font-semibold text-white'>X</p>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DonationDrawer;
