'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { Event } from '@/types';

export const getEvents = async (): Promise<Event[]> => {
  const session = await getSession();
  const token = session?.user.token;

  try {
    const response = await axios.post(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_events`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-KEY': process.env.API_KEY,
        },
      }
    );
    return response.data.events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
