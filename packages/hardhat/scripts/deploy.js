const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  // Deploy Management contract
  const Management = await ethers.getContractFactory('ManagementContract');
  const management = await Management.deploy();
  console.log('Management contract address:', management.address);

  // Deploy SavingsPool contract
  const SavingsPool = await ethers.getContractFactory('SavingsPool');
  const savingsPool = await SavingsPool.deploy(management.address);
  console.log('SavingsPool contract address:', savingsPool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
