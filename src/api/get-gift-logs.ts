'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { GiftLogsResponse } from '@/types';

export const getGiftLogs = async (): Promise<GiftLogsResponse> => {
  const session = await getSession();
  const token = session?.user.token;
  try {
    const response = await axios.postForm(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_gift_logs`,
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
    console.error(error);
    return {
      gift_logs: {},
    };
  }
};
