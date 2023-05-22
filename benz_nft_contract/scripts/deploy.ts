import { ethers } from "hardhat";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

async function main() {
  // const tokenBalanceContract = await ethers.getContractFactory('BenzNFT')
  const tokenBalanceContract = await ethers.getContractFactory("BenzNFT");
  const NAME = "BENZ_NFT";
  const SYMBOL = "BZNFT";
  const COST = ethers.utils.parseUnits("1", "ether");
  const tokenBalance = await tokenBalanceContract.deploy(NAME, SYMBOL, COST);
  await tokenBalance.deployed();
  console.log(`deployed to ${tokenBalance.address}`);
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
