'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Dispatch, ElementRef, SetStateAction, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { submitArtistComment } from '@/api/gift-flow/submit-artist-comment';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EventArtistResponse } from '@/types';

function updateCommentReply(
  data: EventArtistResponse,
  targetHash: string,
  newReply: string
) {
  const newData = data;
  for (let logKey in newData.gift_logs) {
    if (data.gift_logs[logKey].gift_log_hash === targetHash) {
      data.gift_logs[logKey].comment_reply = newReply;
      break; // Exit the loop once the target is found and updated
    }
  }
  return newData;
}

interface IFormInput {
  comment_reply: string;
}

export const ArtistReplyForm = ({
  giftLogHash,
  eventHash,
  setValue,
}: {
  giftLogHash: string;
  eventHash: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const inputRef = useRef<ElementRef<'input'>>(null);

  const queryClient = useQueryClient();
  const form = useForm<IFormInput>();

  const { mutate } = useMutation({
    mutationFn: (newComment: string) =>
      submitArtistComment({
        comment_reply: newComment,
        gift_log_hash: giftLogHash,
      }),
    onMutate: (newComment) => {
      const previousArtistDetail: EventArtistResponse =
        queryClient.getQueryData(['event-artist', eventHash])!;

      queryClient.setQueryData(
        ['event-artist', eventHash],
        (oldData: EventArtistResponse) =>
          updateCommentReply(oldData, giftLogHash, newComment)
      );
      return { previousArtistDetail };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueryData(
        ['event-artist', eventHash],
        context!.previousArtistDetail
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['event-artist', eventHash] });
      form.reset();
    },
    mutationKey: ['addComment', giftLogHash],
  });

  async function onSubmit(values: IFormInput) {
    setValue('');
    mutate(values.comment_reply);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  return (
    <Form {...form}>
      <form
        className='relative flex flex-col items-center gap-4 pt-1'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='comment_reply'
          render={({ field }) => (
            <FormControl>
              <Input
                placeholder='返信を入力...'
                {...field}
                className='h-16 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-black/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] pl-6 text-lg text-black placeholder:text-black/60'
              />
            </FormControl>
          )}
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
    </Form>
  );
};
