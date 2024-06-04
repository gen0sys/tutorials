import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { QueryProvider } from '@/components/providers/query-provider';

const ProviderLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
};

export default ProviderLayout;
