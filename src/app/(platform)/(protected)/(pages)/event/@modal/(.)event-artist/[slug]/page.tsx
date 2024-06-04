'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { createPortal } from 'react-dom';

import { getEventArtist } from '@/api/get-event-artist';

import { SelectedArtist } from './selected-artist';

export default function ArtistModal() {
  const params = useParams();

  const { isPending, data: pageInfo } = useQuery({
    queryKey: ['event-artist', params.slug],
    queryFn: () => getEventArtist(params.slug as string),
  });

  if (isPending) {
    <></>;
  }

  const selectArtist = document.getElementById(params.slug as string);
  const rect = selectArtist
    ?.getElementsByTagName('img')[0]
    ?.getBoundingClientRect();

  return createPortal(
    <SelectedArtist
      artist={pageInfo}
      isPending={isPending}
      rect={rect}
    />,
    document.body
  );

  return <></>;
}
