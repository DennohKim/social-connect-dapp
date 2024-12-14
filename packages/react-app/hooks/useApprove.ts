// This hook is used to approve the savingspool contract to spend the user's cUSD tokens

import { useSimulateContract, useWriteContract} from 'wagmi';
import Erc20Instance from '@/abi/erc20.json';
import { BigNumber } from 'ethers';
import { SavingsPoolAddress2 } from '@/constants/constants';

export const useContractApprove = (contributionPerPartipant: number) => {
  const { data: simulateData } = useSimulateContract({
    address: Erc20Instance.address as `0x${string}`,
    abi: Erc20Instance.abi,
    functionName: 'approve',
    args: [SavingsPoolAddress2, contributionPerPartipant],
  });

  const { data, isSuccess, writeContract: write, writeContractAsync: writeAsync, isPending } =
    useWriteContract();

  return { 
    data, 
    isSuccess, 
    write: () => simulateData?.request ? write(simulateData.request) : undefined,
    writeAsync: () => simulateData?.request ? writeAsync?.(simulateData.request) : undefined,
    isLoading: isPending 
  };
};
