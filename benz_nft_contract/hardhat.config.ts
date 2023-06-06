import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    mumbai: {
      url: process.env.MUMBAI_TESTNET_URL,
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
};

export default config;
