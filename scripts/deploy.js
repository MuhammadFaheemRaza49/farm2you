import { ethers } from "hardhat";

async function main() {
  // Compile automatically
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  const Farm2YouPayment = await ethers.getContractFactory("Farm2YouPayment");
  const contract = await Farm2YouPayment.deploy();

  await contract.deployed();

  console.log("Farm2YouPayment deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
