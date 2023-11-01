import MyPoolsList from '@/components/MyPoolsList';
import CreatePoolForm from '@/components/modals/CreatePool';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
  const [userAddress, setUserAddress] = useState('');
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <>
      <div className='flex justify-between items-end'>
        <div>
          <h1 className='font-bold text-xl'>My Pools</h1>
        </div>
        <div>
          <CreatePoolForm />
        </div>
      </div>
      <div className='py-6'>
        <MyPoolsList />
      </div>
    </>
  );
}
