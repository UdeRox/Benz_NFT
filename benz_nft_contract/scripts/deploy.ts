import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = ethers.utils.parseEther("0.001");
  const cost = ethers.utils.parseEther("0.05");
  const validityPeriodInDays = 30; // Set the desired validity period in days
  const maxSupply = 5
  const deploymentOptions = {
    gasLimit: 2000000, // Set the desired gas limit for deployment
  };

  const BenzToken = await ethers.getContractFactory("BenzToken");
  const nftDeployment = await BenzToken.deploy(
    cost,
    validityPeriodInDays,
    maxSupply
  );
  const receipt = await nftDeployment.deployTransaction.wait();
  const gasUsed = receipt.gasUsed;
  // const gasPrice = receipt.effectiveGasPrice;
  const gasPriceInGwei = ethers.utils.formatUnits(gasUsed, "gwei");

  console.log("Used gas for the Deployment : ", gasPriceInGwei)  
  console.log(
    `BenzToken deployed with cost per mint ${ethers.utils.formatEther(
      cost
    )}, validity period ${validityPeriodInDays} days, and unlock timestamp ${unlockTime} to address: ${
      nftDeployment.address
    }`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
