'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';

export const submitGiftDonation = async (param: {
  price: string;
  gift_log_hash: string;
}): Promise<void> => {
  const session = await getSession();
  const token = session?.user.token;

  const form = new FormData();
  form.append('gift_price', param.price);
  form.append('gift_log_hash', param.gift_log_hash);

  await axios
    .post(
      'https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/gift_price',
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': process.env.API_KEY,
        },
      }
    )
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};
