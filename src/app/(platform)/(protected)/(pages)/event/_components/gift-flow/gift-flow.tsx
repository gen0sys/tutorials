import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { GiftResult } from '@/types';

import { DisplayQRCode } from './display-qr-code';
import { SubmitComment } from './submit-comment';

export const GiftFlow = ({
  giftLogStatus,
  gift_log_hash,
  isPending,
  giftData,
}: {
  giftLogStatus: { status: string };
  isPending: boolean;
  gift_log_hash?: string;
  giftData?: GiftResult;
}) => {
  return (
    <div className='flex flex-col justify-center '>
      <div
        className={cn(
          giftLogStatus?.status === 'pending' ||
            giftLogStatus?.status === 'awaiting_confirmation' ||
            giftLogStatus?.status === 'complete'
            ? 'mb-12 rounded-[32px] border-2 border-white/[0.16] bg-black/[0.08] px-12 pt-12 backdrop-blur-[32px] backdrop-filter'
            : ''
        )}
      >
        {!giftLogStatus ? (
          <div className='mx-auto max-w-xs pb-3 md:max-w-lg'>
            <Skeleton className='mb-3 h-[400px] w-[320px]' />
          </div>
        ) : giftLogStatus.status === 'pending' ||
          giftLogStatus.status === 'awaiting_confirmation' ? (
          <DisplayQRCode
            isPending={isPending}
            qr_code_url={giftData?.qr_code_url}
            key='qrcode'
          />
        ) : (
          <SubmitComment
            gift_log_hash={gift_log_hash!}
            status={giftLogStatus.status}
            key='comment'
            giftData={giftData}
          />
        )}
      </div>
      <div className='mx-auto flex flex-wrap gap-x-6'></div>
    </div>
  );
};
