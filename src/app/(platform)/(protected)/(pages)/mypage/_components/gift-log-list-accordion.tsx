import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GiftLogsResponse } from '@/types';

import { GiftLogMessage } from './gift-log-message';

export const GiftLogListAccordion = ({ data }: { data?: GiftLogsResponse }) => {
  return (
    <div className='fade-bottom h-full w-full grow overflow-auto'>
      <div className='mx-auto mb-[200px]'>
        {data &&
          Object.values(data.gift_logs).every(
            (log) => log.comment === null
          ) && <p className='text-center'>ギフトはありません</p>}

        <Accordion
          type='single'
          collapsible
          className='w-full space-y-3'
        >
          {data && data.gift_logs ? (
            Object.entries(data.gift_logs).map(([id, giftLog]) => {
              if (giftLog.comment === null) {
                return;
              }
              return (
                <AccordionItem
                  value={id}
                  className='relative rounded-[32px] bg-white'
                  key={id}
                >
                  {giftLog.read_flag === false ||
                    (giftLog.read_flag === null && (
                      <div className='absolute right-0 top-0 h-5 w-5 rounded-full border-2 border-white bg-red-700' />
                    ))}
                  <AccordionTrigger>
                    <GiftLogMessage giftLog={giftLog} />
                  </AccordionTrigger>
                  <AccordionContent className='pl-[96px]'>
                    <p>{giftLog.comment}</p>
                    {giftLog.comment_reply ? (
                      <p className='font-bold'>{giftLog.comment_reply}</p>
                    ) : (
                      <p className=' text-xs text-neutral-400'>
                        アーティストからお返事を待ちます。。。
                      </p>
                    )}
                    {giftLog.item_url && (
                      <Image
                        src={giftLog.item_url}
                        height={250}
                        width={250}
                        alt=''
                        className='mt-2 rounded-[32px] border-4 border-neon-green'
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })
          ) : (
            <p className='text-center'>ギフトはありません</p>
          )}
        </Accordion>
      </div>
    </div>
  );
};
