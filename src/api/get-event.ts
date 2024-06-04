'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { EventDetails } from '@/types';

export const getEvent = async (param: string): Promise<EventDetails> => {
  const session = await getSession();
  const token = session?.user.token;

  const form = new FormData();
  form.append('event_title', param);

  try {
    const response = await axios.post(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_event`,
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
      event_artists: {},
      thumbnail: '',
      total_gift_price: 0,
      total_gift_count: 0,
      role: '',
    };
  }
};
