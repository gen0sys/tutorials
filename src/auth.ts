import axios from 'axios';
import NextAuth, { type DefaultSession } from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      token: string;
      role: string;
      nicename: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** From Wordpress */
    user: {
      id: string;
      email: string;
      token: string;
      name: string;
      nicename: string;
      role: string;
      emailVerified: Date;
    };
  }
}

interface User {
  id: string;
  email: string;
  token: string;
  name: string;
  nicename: string;
  role: string;
  emailVerified: Date;
}

export const config = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials.username === 'listener') {
          return {
            role: credentials.username,
            token: credentials.password,
          };
        }

        const form = new FormData();
        form.append('username', credentials.username as string);
        form.append('password', credentials.password as string);

        const res = await axios.post(
          `https://eggs-donation.skelxlab.io/wp-json/jwt-auth/v1/token`,
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-API-KEY': process.env.API_KEY,
            },
          }
        );

        const data = await res.data;
        if (res && data) {
          return {
            id: data.data.id,
            nicename: data.data.nicename,
            email: data.data.email,
            token: data.data.token,
            name: data.data.displayName,
            role: data.role,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
