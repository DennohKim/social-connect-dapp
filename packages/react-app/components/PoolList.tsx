import { Pool } from '@/interfaces/types';
import { generateDummyData } from '@/lib/data';
import React, { useEffect, useState } from 'react'
import { PoolCard } from './PoolCard';
import { getPoolsData } from '@/data/pools';


const PoolList = () => {
	 const [pools, setPools] = useState<Pool[]>([]);

   useEffect(() => {
     // Here you would fetch the data from the server or generate the dummy data
     const data = getPoolsData(); // assuming this function is available and returns the dummy data
     setPools(data);
   }, []);

  return (
    <div>
      {pools.map((pool, index) => (
        <PoolCard key={index} pool={pool} />
      ))}
    </div>
  );
}

export default PoolList