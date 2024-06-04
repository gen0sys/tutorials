import Image from 'next/image';

import { getGift } from '@/api/gift-flow/get-gift';

import DonationDrawer from './donation-drawer';

const Gift = async ({
  searchParams,
}: {
  searchParams: { action: string; gift_log_hash: string };
}) => {
  const res = (await getGift({
    post_type: 'gift-log',
    hash_var: searchParams.gift_log_hash,
    gift_action: 'confirm',
  })) as {
    link: string;
    thumbnail: string;
    event_name: string;
    artist_name: string;
  };
  return (
    <>
      <div className='absolute inset-0 -z-10 flex h-screen w-full items-center justify-center overflow-hidden'>
        <Image
          src={res.thumbnail}
          priority
          fill
          alt=''
          className='object-cover'
        />
      </div>
      <div className='flex grow flex-col overflow-auto px-4 pb-44 pt-8'>
        <h5 className='font-bold'>{res.event_name}</h5>
        <h3 className='text-5xl font-bold uppercase text-neon-green'>
          {res.artist_name}
        </h3>
        <DonationDrawer gift_log_hash={searchParams.gift_log_hash} />
      </div>
    </>
  );
};

export default Gift;
