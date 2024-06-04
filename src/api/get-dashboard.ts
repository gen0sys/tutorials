'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { Dashboard } from '@/types';

export const getDashboard = async (): Promise<Dashboard> => {
  const session = await getSession();
  const token = session?.user.token;

  try {
    const response = await axios.post(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_dashboard`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-KEY': process.env.API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { main_image: '', avatar: '', role: '', events: [] };
  }
};
