'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback } from 'react';

import { checkGiftLogStatus } from '@/api/gift-flow/check-gift-log-status';
import { getGift } from '@/api/gift-flow/get-gift';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

import { GiftFlow } from './gift-flow';

export const GiftFlowDrawer = ({ open }: { open: string }) => {
  const session = useSession();
  const role = session.data?.user.role;
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (params: URLSearchParams, name: string, value: string) => {
      params.set(name, value);
      return params;
    },
    []
  );

  const { isPending, data: giftData } = useQuery({
    queryKey: ['giftData', searchParams.toString()],
    queryFn: () =>
      getGift({
        post_type: !!searchParams.get('action') ? 'gift-log' : 'event-artist',
        hash_var: !!searchParams.get('hash')
          ? searchParams.get('hash')!
          : (params.slug as string),
        gift_action: !!searchParams.get('action')
          ? searchParams.get('action')!
          : 'default',
      }),
    staleTime: 60 * 1000,
    enabled: role === 'listener',
  });

  const gift_log_hash = giftData?.gift_log_hash;

  const { data: giftLogStatus } = useQuery({
    queryKey: ['gift_log_status'],
    queryFn: async () => {
      const res = await checkGiftLogStatus(gift_log_hash as string);
      if (
        res.status.includes('payment_complete') ||
        res.status.includes('waiting_for_comment')
      ) {
        const params = new URLSearchParams(searchParams.toString());

        createQueryString(params, 'action', 'comment');
        createQueryString(params, 'hash', gift_log_hash!);

        router.replace(pathname + '?' + params.toString());
      }
      return res;
    },
    enabled:
      !!gift_log_hash &&
      !!searchParams.get('action') !== true &&
      role === 'listener',
    // Refetch the data every 5 seconds
    refetchInterval: (data) => {
      if (data.state.data?.status) {
        const status = data.state.data.status;
        if (status === 'pending' || status === 'awaiting_confirmation') {
          return 5000;
        } else {
          return false;
        }
      }
      return 5000;
    },
  });

  return (
    <Drawer
      open={open === 'gift'}
      modal={false}
      fixed
    >
      <DrawerContent
        className={cn(
          'gift group px-4 pb-28 focus:outline-none',
          giftLogStatus?.status === 'pending' ||
            giftLogStatus?.status === 'complete' ||
            giftLogStatus?.status === 'awaiting_confirmation'
            ? 'qrcode border-none bg-transparent'
            : 'rounded-t-[32px] border-[1px] border-[rgba(255,255,255,0.16)] backdrop-blur-3xl backdrop-filter',
          giftLogStatus?.status === 'waiting_for_comment' ||
            giftLogStatus?.status === 'payment_complete'
            ? 'min-h-0 bg-[rgba(0,_0,_0,_0.08)] backdrop-blur-3xl backdrop-filter'
            : 'min-h-[50%]'
        )}
      >
        <GiftFlow
          giftLogStatus={giftLogStatus}
          gift_log_hash={gift_log_hash}
          isPending={isPending}
          giftData={giftData}
        />
      </DrawerContent>
    </Drawer>
  );
};
