import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const SEPOLIA_PRIVATE_KEY = "YOUR SEPOLIA PRIVATE KEY";
const INFURA_API_KEY = "KEY";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY],
    // },
    hardhat: {
      // chainId: 1337
    },
  },
};

export default config;
