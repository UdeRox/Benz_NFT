import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const cost = ethers.utils.parseEther("0.05");
  const validityPeriodInDays = 30; // Set the desired validity period in days
  const mintStartDate = 1696908718000;
  const mintEndDate = 1699587118000;
  const maxSupply = 5;
  const BenzToken = await ethers.getContractFactory("BenzToken");
  const nftDeployment = await BenzToken.deploy(cost, maxSupply, mintStartDate, mintEndDate);
  const receipt = await nftDeployment.deployTransaction.wait();
  const gasUsed = receipt.gasUsed;
  const gasPriceInGwei = ethers.utils.formatUnits(gasUsed, "gwei");

  console.log("Used gas for the Deployment : ", gasPriceInGwei);
  console.log(`BenzToken deployed with cost per mint ${ethers.utils.formatEther(cost)}, validity period ${validityPeriodInDays} days, and unlock timestamp ${unlockTime} to address: ${
      nftDeployment.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
