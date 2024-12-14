// Import the Marketplace ABI(Interface)
import { SavingsPoolAddress2, SavingsPoolABI2, SavingsPoolAddress, SavingsPoolABI } from '@/constants/constants';
import { BigNumber } from 'ethers';
import { useWriteContract, useSimulateContract } from 'wagmi';

export const useContractSend = (functionName: string, args: Array<any>) => {
  const gasLimit = BigNumber.from(1000000);

  const { config } = useSimulateContract({
    address: SavingsPoolAddress2,
    abi: SavingsPoolABI2,
    functionName,
    args,
    // overrides: {
    //   gasLimit,
    // },

    onError: (err) => {
      console.log({ err });
    },
  });

  // Write to the smart contract using the prepared config
  const { data, isSuccess, write, writeAsync, error, isLoading } =
    useWriteContract(config);

  return { data, isSuccess, write, writeAsync, isLoading, error };
};
