'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { GiftResult } from '@/types';

export const getGift = async (params: {
  post_type: string;
  hash_var: string;
  gift_action: string;
}): Promise<GiftResult> => {
  const session = await getSession();
  const token = session?.user.token;

  const form = new FormData();
  form.append('post_type', params.post_type);
  form.append('hash_var', params.hash_var);
  form.append('gift_action', params.gift_action);

  return await axios
    .post(
      'https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_gift',
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
      return {};
    });
};
