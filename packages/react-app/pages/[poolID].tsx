import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pool } from '@/interfaces/types';
import { getPoolsData } from '@/data/pools';
import { convertBlockTimestampToDate, truncateAddr } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const PoolDetails = () => {
  const router = useRouter();

  const { address } = useAccount();

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
      <div className='flex flex-col space-y-3'>
        <div className='flex flex-col '>
          <h1 className='font-bold text-2xl'>{selectedPool.poolName}</h1>
          <p>{selectedPool.poolDescription}</p>
        </div>
        <div className='flex flex-col '>
          <h1>
            Pool Owner:{' '}
            <span className='font-bold'>
              {truncateAddr(selectedPool.owner)}
            </span>
          </h1>
        </div>
      </div>

      {/* Pool Details */}
      <div className='py-3'>
        <h2 className='text-lg font-bold pb-4'>Pool Details</h2>
        <Card className='w-full my-4'>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex justify-between items-center pt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <h2 className='font-semibold text-sm'>Pool Status</h2>
                  <div
                    className={`text-sm font-semibold ${
                      selectedPool.isRestrictedPool
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {selectedPool.isRestrictedPool
                      ? 'Restricted'
                      : 'Not Restricted'}
                  </div>{' '}
                </div>{' '}
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm'>Max Participants</h2>
                  <h2 className='font-normal '>
                    {selectedPool.maxParticipants}
                  </h2>
                </div>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>
                    Contribution Amount
                  </h2>
                  <h2 className='font-normal self-end'>
                    {' '}
                    {selectedPool.contributionPerParticipant} cUSD
                  </h2>
                </div>{' '}
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>
                    Current Turn
                  </h2>
                  <h2 className='font-normal'> {selectedPool.currentTurn}</h2>
                </div>{' '}
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>
                    Duration Per Turn
                  </h2>
                  <h2 className='font-normal self-end'>
                    {selectedPool.durationPerTurn}
                  </h2>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm'>Start Date</h2>
                  <h2 className='font-normal '>
                    {convertBlockTimestampToDate(selectedPool.startTime)}
                  </h2>
                </div>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>Status</h2>
                  <div
                    className={`text-sm font-semibold ${
                      selectedPool.isActive ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {selectedPool.isActive ? 'Inactive' : 'Active'}
                  </div>{' '}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pool participants */}
      <div className=''>
        <h2 className='text-lg font-bold pb-4'>Pool Participants</h2>
        <Card className='w-full my-4'>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex justify-between items-center pt-4'>
                <div className='flex flex-col space-y-1.5'>
                  <div className='flex justify-between space-x-16 mb-2 w-full'>
                    <p className='font-semibold'>Participant</p>
                    <p className='font-semibold self-end'>Has Received</p>
                  </div>
                  {Object.entries(selectedPool.hasReceived).map(
                    ([address, hasReceived]) => (
                      <div
                        key={address}
                        className='flex justify-between  w-full'
                      >
                        <p>{truncateAddr(address)}</p>
                        <p
                          className={
                            hasReceived ? 'text-green-500' : 'text-red-500'
                          }
                        >
                          {hasReceived ? 'Yes' : 'No'}
                        </p>
                      </div>
                    )
                  )}
                </div>{' '}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className='text-lg font-bold pb-4'>Contribute</h2>

        <Card>
          <CardContent>
            <div className='flex flex-col w-full py-4'>
              {selectedPool.participants.includes(address as `0x${string}`) ? (
                <form className='flex flex-col space-y-1'>
                  <div>
                    <Label>Contribution Amount</Label>
                    <Input type='number' placeholder='Amount in cUSD' />
                  </div>

                  <Button className='' variant='default'>
                    Contribute
                  </Button>
                </form>
              ) : (
                <>
                  <p className='py-2 font-semibold'>
                    Join the Pool to contribute
                  </p>
                  <Button className='' variant='secondary'>
                    Join Pool
                  </Button>
                </>
              )}{' '}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className='text-lg font-bold py-4'>Claim Turn</h2>

        <Card>
          <CardContent>
            <div className='flex flex-col w-full py-4'>
              {selectedPool.participants.includes(address as `0x${string}`) ? (
                <form className='flex flex-col space-y-1'>
                  <div>
                    <Label>Contribution Amount</Label>
                    <Input type='number' placeholder='Amount in cUSD' />
                  </div>

                  <Button className='' variant='default'>
                    Contribute
                  </Button>
                </form>
              ) : (
                <>
                  <p className='py-2 font-semibold'>
                    You cannot claim this turn.
                  </p>
                  <Button className='' variant='secondary' disabled>
                    Claim Turn
                  </Button>
                </>
              )}{' '}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PoolDetails;
