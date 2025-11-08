require("@nomicfoundation/hardhat-toolbox"); // Hardhat toolbox includes ethers, waffle, chai, etc.
require("dotenv").config(); // Load environment variables from .env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // default local network
  networks: {
    hardhat: {
      chainId: 1337, // default local chain id
    },
    // Example: Testnet configuration (optional)
    goerli: {
      url: process.env.GOERLI_RPC_URL || "", // Alchemy/Infura RPC URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // deployer wallet private key
    },
  },
  solidity: {
    version: "0.8.28", // your contract version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts", // Solidity contracts
    tests: "./test",        // Test files
    cache: "./cache",       // Hardhat cache
    artifacts: "./artifacts", // Compiled artifacts
  },
};

