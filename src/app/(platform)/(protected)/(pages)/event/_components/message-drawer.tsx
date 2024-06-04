'use client';

import { ArtistCardMessage } from '@/components/artist-card-message';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { GiftLogs } from '@/types';

export const MessageDrawer = ({
  giftLogs,
  open,
}: {
  giftLogs: GiftLogs | undefined;
  open: string;
}) => {
  return (
    <Drawer
      open={open === 'messages'}
      modal={false}
      fixed
    >
      <DrawerContent className='gift group z-[17] flex h-[60dvh] flex-col rounded-t-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] px-4 pb-12 backdrop-blur-3xl backdrop-filter focus:outline-none'>
        <div className='fade-bottom-dashboard h-full w-full pb-3 pl-3 pr-2'>
          <div className='mb-6 flex flex-row items-start text-white'>
            <h2 className='text-center text-2xl font-bold'>メッセージ</h2>
          </div>
          <div className='h-full overflow-y-auto pb-44'>
            <div className='grid grid-cols-1 justify-items-center gap-2'>
              {giftLogs
                ? Object.entries(giftLogs).map(([id, giftLog]) => {
                    if (giftLog.comment === null) {
                      return;
                    }
                    return (
                      <ArtistCardMessage
                        key={giftLog.gift_log_hash}
                        giftLog={giftLog}
                      />
                    );
                  })
                : 'メッセージはありません'}
              {giftLogs &&
                Object.values(giftLogs).every((log) => log.comment === null) &&
                'メッセージはありません'}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
