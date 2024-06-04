'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { EventArtistResponse } from '@/types';

export const getEventArtist = async (
  params: string
): Promise<EventArtistResponse> => {
  const session = await getSession();
  const token = session?.user.token;

  const form = new FormData();
  form.append('event_artist_hash', params);

  try {
    const response = await axios.post(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_event_artist`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': process.env.API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      artist_image: '',
      artist_name: '',
      role: '',
      event_name: '',
      gift_logs: {},
      status: '',
    };
  }
};
