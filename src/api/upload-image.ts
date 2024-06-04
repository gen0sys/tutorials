'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';
import { ImageUploadResult } from '@/types';

export const uploadImage = async (
  param: FormData
): Promise<ImageUploadResult> => {
  const session = await getSession();
  const token = session?.user.token;

  return await axios
    .post(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/upload_image`,
      param,
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
      return {
        status: 'error',
      };
    });
};
