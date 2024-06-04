'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';

export const checkGiftLogStatus = async (gift_log_hash: string) => {
  const session = await getSession();
  const token = session?.user.token;

  const form = new FormData();
  form.append('gift_log_hash', gift_log_hash);
  return await axios
    .post(
      'https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/check_gift_log_status',
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': process.env.API_KEY,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};
