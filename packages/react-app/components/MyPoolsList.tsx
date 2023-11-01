import { Pool } from '@/interfaces/types';
import { generateDummyData } from '@/lib/data';
import React, { useEffect, useState } from 'react';
import { PoolCard } from './PoolCard';
import { getPoolsData } from '@/data/pools';
import { useAccount } from 'wagmi';

const MyPoolsList = () => {
	const { address } = useAccount();
  const [myPools, setMyPools] = useState<Pool[]>([]);

  useEffect(() => {
    // Here you would fetch the data from the server or generate the dummy data
    const data = getPoolsData(); // assuming this function is available and returns the dummy data
	const ownedPools = data.filter((pool) => pool.owner === address);

    setMyPools(ownedPools);
  }, [address]);

  return (
    <div>
      {myPools.map((pool, index) => (
        <PoolCard key={index} pool={pool} />
      ))}
    </div>
  );
};

export default MyPoolsList;
