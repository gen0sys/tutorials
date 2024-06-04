import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';

export const DisplayQRCode = ({
  isPending,
  qr_code_url,
}: {
  isPending: boolean;
  qr_code_url: string | undefined;
}) => {
  return (
    <div className='mx-auto max-w-xs pb-3 md:max-w-lg'>
      {isPending ? (
        <Skeleton className='mb-3 h-[320px] w-[320px]' />
      ) : (
        <div className='mb-8 rounded-2xl p-4 outline outline-[16px] outline-offset-2 outline-white/30 backdrop-blur-[32px] backdrop-filter'>
          <div className='outline outline-[16px] outline-offset-2 outline-black/[0.04]'>
            <Image
              src={
                qr_code_url
                  ? qr_code_url
                  : 'https://via.placeholder.com/320x320'
              }
              width={320}
              height={320}
              alt=''
              className=''
            />
          </div>
        </div>
      )}

      <div className='flex w-full flex-row text-white'>
        <p>※&nbsp;</p>
        <p>上記のQRコードをライブハウススタッフに提示してくさい</p>
      </div>
    </div>
  );
};
