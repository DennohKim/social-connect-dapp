// This hook is used to approve the savingspool contract to spend the user's cUSD tokens

import { useSimulateContract, useWriteContract} from 'wagmi';
import Erc20Instance from '@/abi/erc20.json';
import { BigNumber } from 'ethers';
import { SavingsPoolAddress2 } from '@/constants/constants';

export const useContractApprove = (contributionPerPartipant: number) => {
  const gasLimit = BigNumber.from(1000000);
  const { config } = useSimulateContract({
    address: Erc20Instance.address as `0x${string}`,
    abi: Erc20Instance.abi,
    functionName: 'approve',
    args: [SavingsPoolAddress2, contributionPerPartipant],
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
  return { data, isSuccess, write, writeAsync, isLoading };
};
