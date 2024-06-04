import Image from 'next/image';
import Link from 'next/link';

import { Artist } from '@/types';

export const ArtistCard = ({
  artist,
  eventTitle,
}: {
  artist: Artist;
  eventTitle: string;
}) => {
  const url = artist.artist_link;
  const parts = url.split('/');

  return (
    <>
      <div
        className='relative h-[110px] w-full rounded-2xl border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] backdrop-blur-3xl backdrop-filter'
        id={parts[4]}
      >
        <div className='flex h-full w-full flex-row'>
          <div className='relative left-[8px] top-[8px] h-[94px] w-[94px] basis-1/3 rounded-xl'>
            <Image
              className='rounded-xl object-cover'
              src={
                artist.artist_image
                  ? artist.artist_image
                  : 'https://via.placeholder.com/94x94'
              }
              alt=''
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
            />
          </div>
          <div className='flex w-full basis-2/3 flex-col pl-4 pt-2'>
            <div className='text-xl font-bold text-white'>
              {artist.artist_name}
            </div>
            <div className='flex h-full w-full flex-row items-end px-2 pb-2 text-white'>
              <Link
                href={`/event/event-artist/${parts[4]}`}
                className='w-full'
              >
                <div className='relative flex h-12 w-full flex-row items-center justify-start rounded-[32px] border border-white bg-white pl-4 '>
                  <p className='transform text-base font-bold text-black'>
                    Information
                  </p>
                  <div className='absolute right-[5px] top-[4px] h-10 w-10'>
                    <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-[32px] bg-neon-green'>
                      <Image
                        src='/assets/icons/icon_arrow.svg'
                        width={25}
                        height={25}
                        alt='home'
                        className='h-auto w-auto'
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
