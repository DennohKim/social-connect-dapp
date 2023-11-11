
import SavingPoolABI from '../abi/SavingsPool.json';
import ManagementABI from '../abi/ManagementContract.json';

export const SavingsPoolAddress ='0xF115956e6819c8c4137175119d1cf486A63BBB60'; //Deployed to: 0x93b63165Ae71422D4567a6abB39860777B8A62Dd
export const SavingsPoolABI = SavingPoolABI.abi

export const ManagementAddress = '0x6417D3A10177662B83e362516492772D59329C8b'; //Deployed to: 0x7897CC6E4C544679cB40Dd9Ad4BD2A414812072b
export const ManagementContractABI = ManagementABI.abi

// forge create --rpc-url https://alfajores-forno.celo-testnet.org  --constructor-args 0x7897CC6E4C544679cB40Dd9Ad4BD2A414812072b   --private-key <key>
//  src/SavingsPool.sol:ChamaPool

export const ManagementAddress2 = '0x93b63165Ae71422D4567a6abB39860777B8A62Dd'
export const SavingsPoolAddress2 ='0x7897CC6E4C544679cB40Dd9Ad4BD2A414812072b';