import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import 'solidity-coverage'
import "hardhat-gas-reporter"
import "hardhat-gas-trackooor"
import "@nomiclabs/hardhat-solhint";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers:[{
        version:"0.8.9",
        settings:{
          optimizer :{
            enabled:true,
            runs:200
          },
          viaIR:true
        }

      },
    ]
  },
  // coverage: {
  //   enable: true,
  //   outputDirectory: "coverage",
  //   solidityVersion: "0.8.9",
  // },
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
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  mocha:{

  },
};

export default config;
