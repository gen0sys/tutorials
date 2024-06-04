import React from 'react';
import QRCode from 'react-qr-code';

export const LivehouseQRCodeContainer = () => {
  return (
    <div className='mx-auto max-w-xs md:max-w-lg '>
      <div className='rounded-[48px] border-2 border-white/[0.16] bg-black/[0.08] px-8 pt-8 backdrop-blur-xl backdrop-filter'>
        <div className='rounded-2xl p-4 outline outline-[16px] outline-offset-2 outline-white/30'>
          <div className='outline outline-[16px] outline-offset-2 outline-black/[0.04]'>
            <div className='h-full w-full bg-white p-3'>
              <QRCode
                value='https://eggs-donation-frontend.skelxlab.io/checkin?event_id=600'
                className='h-auto w-full'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-row pb-3 pt-8 text-white'>
          <p>※&nbsp;</p>
          <p className='text-base'>
            リスナー用のCheck-IN QRコードです。
            <br />
            受付などに表示してください。
          </p>
        </div>
      </div>
    </div>
  );
};
