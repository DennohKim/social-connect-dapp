const { ethers } = require('hardhat');

async function main() {
  // Load the marketplace contract artifacts
  const BatchPaymentsFactory = await ethers.getContractFactory(
    'BatchPayments'
  );

  // Deploy the contract
  const BatchPaymentsContract = await BatchPaymentsFactory.deploy();

  // Wait for deployment to finish
  await BatchPaymentsContract.deployed();

  // Log the address of the new contract
  console.log('BatchPayments deployed to:',BatchPaymentsContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
