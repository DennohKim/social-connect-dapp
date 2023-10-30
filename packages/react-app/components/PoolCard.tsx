import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pool } from '@/interfaces/types';
import { truncateAddr } from '@/lib/utils';
import { poll } from 'ethers/lib/utils';
import Link from 'next/link';

interface PoolCardProps {
  pool: Pool;
}

export function PoolCard({ pool }: PoolCardProps) {
  return (
    <Link href={`/${pool.poolID}`}>
      <Card className='w-full my-4'>
        <CardHeader>
          <CardTitle>{pool.poolName}</CardTitle>
          <CardDescription>{pool.poolDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col space-y-1.5'>
                <h2 className='font-semibold text-sm'>Pool Owner</h2>
                <h2 className='font-normal'>{truncateAddr(pool.owner)}</h2>
              </div>
              <div className='flex flex-col space-y-1.5'>
                {/* <h2 className='font-semibold text-sm'>Pool Status</h2> */}
                <div
                  className={`text-sm font-semibold ${
                    pool.isRestrictedPool ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {pool.isRestrictedPool ? 'Restricted' : 'Not Restricted'}
                </div>{' '}
              </div>{' '}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col space-y-1.5'>
                <h2 className='font-semibold text-sm'>Max Participants</h2>
                <h2 className='font-normal '>{pool.maxParticipants}</h2>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <h2 className='font-semibold text-sm'>Contribution Amount</h2>
                <h2 className='font-normal self-end'>
                  {' '}
                  {pool.contributionPerParticipant} cUSD
                </h2>
              </div>{' '}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col space-y-1.5'>
                <h2 className='font-semibold text-sm'>Status</h2>
                <div
                  className={`text-sm font-semibold ${
                    pool.isActive ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {pool.isActive ? 'Inactive' : 'Active'}
                </div>{' '}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <h2 className='font-semibold text-sm'>Duration Per Turn</h2>
                <h2 className='font-normal self-end'>{pool.durationPerTurn}</h2>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button>Join Pool</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
