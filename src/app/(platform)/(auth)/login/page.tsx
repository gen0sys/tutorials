'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { authenticate } from '@/app/actions/authenticate';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const LoginPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className='fixed inset-0 -z-10 bg-standard-background bg-cover bg-center bg-no-repeat' />
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>
          <div className='flex h-full grow items-center justify-center'>
            {!open && (
              <Button
                variant='outline'
                className='text-black'
              >
                Login
              </Button>
            )}
          </div>
        </DrawerTrigger>
        <DrawerContent className='rounded-t-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-[rgba(255,_255,_255,_0.08)] backdrop-blur-3xl backdrop-filter focus:outline-none'>
          <LoginForm className='px-4' />
        </DrawerContent>
      </Drawer>
    </>
  );
};

function LoginForm({ className }: React.ComponentProps<'form'>) {
  const [_state, formAction] = useFormState(authenticate, true);

  return (
    <>
      <div className='pb-3 pl-4'>
        <h2 className='text-3xl'>Sign In</h2>
      </div>
      <form
        className={cn('grid items-start gap-4', className)}
        action={formAction}
      >
        <LoginFormComponents />
      </form>
    </>
  );
}

const LoginFormComponents = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl')!;
  const status = useFormStatus();
  return (
    <>
      <div className='grid gap-2'>
        <Label
          htmlFor='username'
          className='pl-4 text-base'
        >
          Your ID
        </Label>
        <Input
          className='h-16 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] pl-6 text-lg placeholder:text-white/60'
          type='text'
          id='username'
          name='username'
          placeholder='Please enter your ID'
          disabled={status.pending}
        />
      </div>
      <div className='grid gap-2'>
        <Label
          htmlFor='password'
          className='pl-4 text-base'
        >
          Password
        </Label>
        <Input
          className='h-16 rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/15 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)] pl-6 text-lg placeholder:text-white/60'
          id='password'
          placeholder='Please enter your password'
          type='password'
          name='password'
          disabled={status.pending}
        />
      </div>
      <input
        hidden
        name='callbackUrl'
        id='callbackUrl'
        value={callbackUrl === null ? '/dashboard' : callbackUrl}
        onChange={() => {}}
      />
      <div className='py-4'>
        <Separator className='absolute inset-x-0 opacity-50' />
      </div>
      <div className='flex items-center justify-center pb-8'>
        <div className='flex h-[80px] w-[272px] items-center justify-center rounded-[48px] border-[1px] border-[rgba(255,255,255,0.16)] bg-white/5 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)]'>
          <Button
            className={cn(
              'h-[64px] w-[256px] rounded-[32px] border-[1px] border-[rgba(255,255,255,0.16)] text-lg hover:bg-neon-green hover:text-black',
              status.pending
                ? 'bg-neon-green'
                : 'bg-white/5 bg-[linear-gradient(0deg,_0%,_100%),_linear-gradient(0deg,_rgba(255,_255,_255,_0.24)_0%,_rgba(255,_255,_255,_0.24)_100%)]'
            )}
            type='submit'
            disabled={status.pending}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
