import { ReloadIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { uploadImage } from '@/api/upload-image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { GiftResult } from '@/types';

export const ArtistUploadImage = ({
  event_artist_hash,
  gift_image,
  link,
}: {
  event_artist_hash: string;
  gift_image?: string;
  link: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      //onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button
          className='relative mt-3 flex h-12 w-[235px] items-center justify-center rounded-[32px] bg-neon-green'
          onClick={() => setOpen(true)}
        >
          <p className='text-center text-base font-bold text-black'>
            お返し画像
          </p>
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          className='bg-gray-400 bg-cover bg-center bg-no-repeat'
          // style={{
          //   background: 'url(/assets/concert_background.jpg)',
          //   backgroundSize: 'cover',
          //   backgroundPosition: '',
          //   backgroundRepeat: 'no-repeat',
          // }}
        ></DialogOverlay>
        <DialogContent className='h-full items-center justify-center border-0 border-none shadow-none focus:outline-none'>
          <Image
            src='/assets/buttons/btn_back.svg'
            alt=''
            width={40}
            height={40}
            className='absolute left-4 top-4'
            onClick={() => setOpen(false)}
          />
          <div className='flex flex-col gap-4'>
            <h2 className='text-center text-black'>お返し画像を設定する</h2>
            <ArtistUploadImageForm
              event_artist_hash={event_artist_hash}
              link={link}
              gift_image={gift_image}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

interface IFormInput {
  gift_image: FileList;
}

const ArtistUploadImageForm = ({
  event_artist_hash,
  link,
  gift_image,
}: {
  event_artist_hash: string;
  link: string;
  gift_image?: string;
}) => {
  const PARTS = link.split('/');
  const key = PARTS[PARTS.length - 2];
  const queryClient = useQueryClient();

  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  const { reset, register, handleSubmit } = useForm<IFormInput>();
  const { mutate, isPending } = useMutation({
    mutationFn: (newImage: File) => {
      const form = new FormData();
      form.append('gift_image', newImage);
      form.append('event_artist_hash', event_artist_hash);

      return uploadImage(form);
    },
    onMutate: async (newImage) => {
      const previousArtistDetail: GiftResult = queryClient.getQueryData([
        'event-artist',
        key,
      ])!;
      queryClient.setQueryData(['event-artist', key], (oldData: GiftResult) => {
        const url = URL.createObjectURL(newImage!);
        return {
          ...oldData,
          return_file: url,
        };
      });
      return { previousArtistDetail };
    },
    onError: (err, newImage, context) => {
      toast.error(err.message);
      queryClient.setQueryData(
        ['event-artist', key],
        context!.previousArtistDetail
      );
    },
    onSuccess: async () => {
      toast.success('設定しました');
      await queryClient.invalidateQueries({
        queryKey: ['event-artist', key],
      });
      setImageToUpload(null);
      reset();
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    event?.preventDefault();

    if (imageToUpload) {
      mutate(imageToUpload);
    }
  };

  return (
    <>
      <div className='relative h-72 w-80'>
        {imageToUpload && (
          <Button
            size='icon'
            variant='ghost'
            className='absolute -right-4 -top-4 z-20 rounded-full'
          >
            <Image
              src='/assets/buttons/btn_close.svg'
              alt=''
              width={40}
              height={40}
              onClick={() => {
                setImageToUpload(null);
                reset();
              }}
            />
          </Button>
        )}
        {gift_image && (
          <Image
            src={
              imageToUpload ? URL.createObjectURL(imageToUpload) : gift_image
            }
            fill
            alt=''
            className={cn(
              'object-contain',
              isPending && 'animate-pulse',
              imageToUpload && 'animate-pulse'
            )}
          />
        )}
      </div>
      <div className='flex w-full max-w-sm flex-col items-center gap-1.5 pt-4'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative flex max-w-sm flex-col items-center gap-2'
        >
          <input
            type='file'
            {...register('gift_image')}
            name='gift_image'
            accept='image/*'
            className='flex h-10 w-full rounded-md border border-input bg-background py-2 pr-3 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            onChange={(e) => {
              setImageToUpload(e.target.files![0]);
            }}
          />
          <Button
            type='submit'
            disabled={isPending}
          >
            {isPending ? (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                <p>アップロード中</p>
              </>
            ) : (
              <p>アップロード</p>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};
