import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';

import { LivehouseQRCodeContainer } from './livehouse-qrcode-container';

export const LivehouseQRCodeModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative mt-3 flex h-12 w-[235px] items-center justify-center rounded-[32px] bg-neon-green'>
          <p className='text-center text-base font-bold text-black'>
            Check-IN QRコードを表示
          </p>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          className='bg-cover bg-center bg-no-repeat'
          style={{
            background: 'url(/assets/concert_background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Image
            src='/assets/buttons/btn_back.svg'
            alt=''
            width={40}
            height={40}
            className='absolute left-4 top-4'
          />
        </DialogOverlay>
        <DialogContent className='justify-center border-0 border-none bg-transparent shadow-none focus:outline-none'>
          <LivehouseQRCodeContainer />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
