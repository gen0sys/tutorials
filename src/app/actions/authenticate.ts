'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

export async function authenticate(
  prevState: boolean | { error: string },
  formData: FormData
) {
  try {
    const callbackUrl = formData.get('callbackUrl') as string;
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      username: formData.get('username'),
      password: formData.get('password'),
      redirectTo: callbackUrl || '/dashboard',
    });
    return true;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
}
