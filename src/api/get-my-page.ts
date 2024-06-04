'use server';

import axios from 'axios';

import { getSession } from '@/app/actions/get-session';

export const getMyPage = async (): Promise<{
  avatar?: string;
  role?: string;
  status?: string;
}> => {
  const session = await getSession();
  const token = session?.user.token;

  try {
    const response = await axios.postForm(
      `https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/get_mypage`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': process.env.API_KEY,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
    };
  }
};
