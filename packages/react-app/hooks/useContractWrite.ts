// Import the Marketplace ABI(Interface)
import { SavingsPoolAddress2, SavingsPoolABI2, SavingsPoolAddress, SavingsPoolABI } from '@/constants/constants';
import { BigNumber } from 'ethers';
import { useWriteContract, useSimulateContract } from 'wagmi';

export const useContractSend = (functionName: string, args: Array<any>) => {
  const { data: simulateData } = useSimulateContract({
    address: SavingsPoolAddress2,
    abi: SavingsPoolABI2,
    functionName,
    args,
  });

  const { data, isSuccess, writeContract: write, writeContractAsync: writeAsync, error, isPending } =
    useWriteContract();

  return { 
    data, 
    isSuccess, 
    write: () => simulateData?.request ? write(simulateData.request) : undefined,
    writeAsync: () => simulateData?.request ? writeAsync?.(simulateData.request) : undefined,
    isLoading: isPending,
    error 
  };
};
