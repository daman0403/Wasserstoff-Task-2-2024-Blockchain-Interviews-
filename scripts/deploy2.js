const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Deploy ProxyLoadBalancer contract

  const ProxyLoadBalancer = await hre.ethers.deployContract(
    "ProxyLoadBalancer"
  );
  await ProxyLoadBalancer.waitForDeployment();
  console.log("ProxyLoadBalancer deployed to:", ProxyLoadBalancer.target);

  // Deploy TokenTransfer contract
  const TokenTransfer = await hre.ethers.deployContract("TokenTransfer");
  await TokenTransfer.waitForDeployment();
  console.log("TokenTransfer deployed to:", TokenTransfer.target);

  // Deploy Staking contract
  const Staking = await hre.ethers.deployContract("Staking");
  await Staking.waitForDeployment();
  console.log("Staking deployed to:", Staking.target);

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
