'use client';

import { EventDetails } from '@/types';

import { ArtistCard } from './artist-card';

export const ArtistList = ({
  eventTitle,
  data,
}: {
  eventTitle: string;
  data?: EventDetails;
}) => {
  if (data === undefined) {
    return <></>;
  }

  const artists = Object.values(data.event_artists);
  return (
    <div className='flex flex-col items-center gap-2 px-6 pb-28'>
      {artists.map((artist) => {
        return (
          <ArtistCard
            key={artist.artist_name}
            artist={artist}
            eventTitle={eventTitle}
          />
        );
      })}
    </div>
  );
};
