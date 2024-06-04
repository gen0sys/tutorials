'use client';

import { ElementRef, useRef, useState } from 'react';

import { ArtistCardMessage } from '@/components/artist-card-message';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GiftLogs } from '@/types';

import { ArtistReplyForm } from './artist-reply-form';

const ArtistCardMessageAccordion = ({
  giftLogs,
  eventHash,
}: {
  giftLogs: GiftLogs;
  eventHash: string;
}) => {
  const itemRef = useRef<ElementRef<'div'>>(null);
  const [value, setValue] = useState('');

  return (
    <div className='fade-bottom h-full w-full grow overflow-auto'>
      <div className='mx-auto mb-[200px]'>
        {giftLogs &&
          Object.values(giftLogs).every((log) => log.comment === null) && (
            <p className='text-center'>ギフトはありません</p>
          )}

        <Accordion
          type='single'
          collapsible
          className='w-full space-y-3'
          value={value}
          onValueChange={setValue}
        >
          {giftLogs && giftLogs ? (
            Object.entries(giftLogs).map(([id, giftLog]) => {
              if (giftLog.comment === null) {
                return;
              }
              return (
                <AccordionItem
                  value={id}
                  className='rounded-[32px] bg-white'
                  key={id}
                  ref={itemRef}
                >
                  <AccordionTrigger
                    className='group'
                    id='artist-message-accordion'
                  >
                    <ArtistCardMessage giftLog={giftLog} />
                  </AccordionTrigger>
                  <AccordionContent className='px-3'>
                    <ArtistReplyForm
                      giftLogHash={giftLog.gift_log_hash}
                      eventHash={eventHash}
                      setValue={setValue}
                    />
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

export default ArtistCardMessageAccordion;
