// Import the Marketplace ABI(Interface)
import { SavingsPoolAddress, SavingsPoolABI } from '@/constants/constants';
import { BigNumber } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

export const useContractSend = (functionName: string, args: Array<any>) => {
  const gasLimit = BigNumber.from(1000000);

  const { config } = usePrepareContractWrite({
    address: SavingsPoolAddress,
    abi: SavingsPoolABI,
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
    useContractWrite(config);
  return { data, isSuccess, write, writeAsync, isLoading };
};
