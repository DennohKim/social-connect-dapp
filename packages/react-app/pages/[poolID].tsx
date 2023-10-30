import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pool } from '@/interfaces/types';
import { getPoolsData } from '@/data/pools';

const PoolDetails = () => {
  const router = useRouter();

  const { poolID } = router.query;

  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool>();

  useEffect(() => {
    // Here you would fetch the data from the server or generate the dummy data
    const data = getPoolsData(); // assuming this function is available and returns the dummy data
    setPools(data);
  }, []);

  useEffect(() => {
    if (pools.length > 0) {
      const pool = pools.find((pool) => pool.poolID === Number(poolID));
      setSelectedPool(pool);
    }
  }, [pools, poolID]);

  if (!selectedPool) {
    return <div>Pool not found</div>;
  }

  return (
    <>
      <div>{selectedPool.poolName}</div>
    </>
  ); 
};

export default PoolDetails;
