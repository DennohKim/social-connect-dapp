import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pool, PoolDetails } from '@/interfaces/types';
import { getPoolsData } from '@/data/pools';
import { convertBlockTimestampToDate, truncateAddr } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount, useContractRead } from 'wagmi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SavingsPoolABI2, SavingsPoolAddress2 } from '@/constants/constants';
import { ethers } from 'ethers';

const PoolDetails = () => {
  const router = useRouter();

  const { address } = useAccount();

  const { poolID } = router.query;


  const [selectedPool, setSelectedPool] = useState<PoolDetails>();

  const {
    data: savingsPool,
    isError,
    isLoading,
  } = useContractRead({
    address: SavingsPoolAddress2,
    abi: SavingsPoolABI2,
    functionName: 'getAllSavingPools',
  });


useEffect(() => {
  if (savingsPool && poolID) {
    const pool = Array.isArray(savingsPool)
      ? savingsPool.find(
          (pool: PoolDetails) => Number(pool.poolID) === Number(poolID)
        )
      : null;
	  console.log(pool)

    setSelectedPool(pool);
  }
}, [savingsPool, poolID]);


  if (!selectedPool) {
    return <div>Pool not found</div>;
  }

  return (
    <>
      <div className='flex flex-col space-y-3'>
        <div className='flex flex-col '>
          <h1 className='font-bold text-2xl'>{selectedPool.name}</h1>
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
                        ? 'text-red-600 bg-red-500/25 p-3 rounded-md'
                        : 'text-green-400 bg-green-500/25 p-3 rounded-md'
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
                    {Number(selectedPool.maxParticipants)}
                  </h2>
                </div>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>
                    Contribution Amount
                  </h2>
                  <h2 className='font-normal self-end'>
                    {' '}
                    {ethers.utils.formatEther(
                      selectedPool.contributionPerParticipant
                    )}{' '}
                    cUSD
                  </h2>
                </div>{' '}
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>
                    Current Turn
                  </h2>
                  <h2 className='font-normal'>
                    {' '}
                    {Number(selectedPool.currentTurn)}
                  </h2>
                </div>{' '}
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>
                    Duration Per Turn
                  </h2>
                  <h2 className='font-normal self-end'>
                    {Number(selectedPool.durationPerTurn)}
                  </h2>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm'>Start Date</h2>
                  <h2 className='font-normal '>
                    {/* {convertBlockTimestampToDate(selectedPool.startTime)} */}
                  </h2>
                </div>
                <div className='flex flex-col space-y-1'>
                  <h2 className='font-semibold text-sm self-end'>Status</h2>
                  <div
                    className={`text-sm font-semibold ${
                      selectedPool.active ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {selectedPool.active ? 'Inactive' : 'Active'}
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
                    {/* <p className='font-semibold self-end'>Has Received</p> */}
                  </div>
                  {selectedPool.participants.map((participant, index) => (
                    <div
                      key={`participant-${index}`}
                      className='flex justify-between  w-full'
                    >
                      <p>{truncateAddr(participant)}</p>
                      {/* <p
                          className={
                            hasReceived ? 'text-green-500' : 'text-red-500'
                          }
                        >
                          {hasReceived ? 'Yes' : 'No'}
                        </p> */}
                    </div>
                  ))}
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
              {selectedPool.isRestrictedPool === true && (
                <p className='py-2 font-semibold'>
                  You cannot contribute to this pool.
                </p>
              )}
              {selectedPool.isRestrictedPool === false &&
                selectedPool.participants.includes(
                  address as `0x${string}`
                ) && (
                  <div className='flex flex-col space-y-1'>
                    <Button className='' variant='default'>
                      Contribute
                    </Button>
                  </div>
                )}
              {selectedPool.isRestrictedPool === false &&
                !selectedPool.participants.includes(
                  address as `0x${string}`
                ) && (
                  <div className='flex flex-col space-y-1'>
                    <p className='py-2 font-semibold'>
                      Join to contribute to this pool.
                    </p>
                    <Button className='' variant='default'>
                      Join Pool
                    </Button>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className='text-lg font-bold py-4'>Claim Turn</h2>

        <Card>
          <CardContent>
            <div className='flex flex-col w-full py-4'>
              {selectedPool.userTurnAddress === address ? (
                <form className='flex flex-col space-y-1'>
                  <div>
                    <Label>You can claim this turn</Label>
                    <Input type='number' placeholder='Amount in cUSD' />
                  </div>

                  <Button className='' variant='default'>
                    Claim Turn
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
