'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { GiftResult } from '@/types';

export const submitGiftComment = async (param: {
  gift_log_hash: string;
  comment: string;
}): Promise<GiftResult> => {
  const session = await getSession();
  const token = session?.user.token;

  const form = new FormData();
  form.append('gift_log_hash', param.gift_log_hash);
  form.append('comment', param.comment);

  return await axios
    .post(
      'https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/gift_comment',

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
