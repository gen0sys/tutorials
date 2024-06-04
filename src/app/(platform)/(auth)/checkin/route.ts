import axios from 'axios';
import { type NextRequest } from 'next/server';

import { signIn } from '@/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('event_id');

  const form = new FormData();
  form.append('event_id', id as string);

  try {
    const res = await axios.post(
      'https://eggs-donation.skelxlab.io/wp-json/eggs-donation/v1/checkin',
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': process.env.API_KEY,
        },
      }
    );
    const data = await res.data;
    await signIn('credentials', {
      username: data.role,
      password: data.token,
      redirect: false,
    });
    const { nextUrl } = request;

    return Response.redirect(new URL('/event', nextUrl));
  } catch (error) {
    console.error(error);
  }
}
