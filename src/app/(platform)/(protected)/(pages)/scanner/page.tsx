'use client';

import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

const ScannerPage = () => {
  const [scanning, setIsScanning] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className='px-4'>
        <Header>Donation Scan</Header>
      </div>
      <div className='flex grow flex-col items-center justify-center pb-44'>
        {/* <Button
          variant='default'
          disabled={scanning}
          onClick={() => {
            setIsScanning(true);
          }}
          className='mb-6 w-1/2 bg-green-500'
        >
          Scan
        </Button> */}
        <div className='h-3/4 w-3/4'>
          <Scanner
            onResult={(text, result) => {
              setIsScanning(false);
              router.push(text);
            }}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      </div>
    </>
  );
};

export default ScannerPage;
