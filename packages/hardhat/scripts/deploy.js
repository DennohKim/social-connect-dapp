const { ethers } = require('hardhat');

async function main() {
  // Deploy Management contract
  const Management = await ethers.getContractFactory('Management');
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
