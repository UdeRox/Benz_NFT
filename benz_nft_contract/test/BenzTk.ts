import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { GasTracker } from "hardhat-gas-trackooor/dist/src/GasTracker";
import { BenzToken } from "../typechain-types/contracts/BenzToken";

describe("BenzToken", function () {
  let benzToken: GasTracker;
  let owner: Signer;
  let otherAccount: Signer;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const cost = ethers.utils.parseEther("0.05");
    const maxSupply = 5;
    const mintStartDate = Math.floor(Date.now() / 1000);
    const mintEndDate = mintStartDate + 30 * 24 * 60 * 60;
    const BenzTokenFactory = await ethers.getContractFactory("BenzToken");
    benzToken = new GasTracker(
      (await BenzTokenFactory.deploy(
        cost,
        maxSupply,
        mintStartDate,
        mintEndDate
      )) as BenzToken,
      { logAfterTx: true }
    );
  });

  it("Should require payment to mint an NFT", async function () {
    const uri = "https://mocknft.com/nft-metadata";
    const value = ethers.utils.parseEther("0.05"); // 0.05 ETH

    await expect(
      benzToken.payToMint(await owner.getAddress(), uri, { value })
    ).to.emit(benzToken, "Transfer");

    const tokenId = 0;
    expect(await benzToken.balanceOf(await owner.getAddress())).to.equal(1);
    expect(await benzToken.ownerOf(tokenId)).to.equal(await owner.getAddress());
    expect(await benzToken.tokenURI(tokenId)).to.equal(uri);
  });

  it("Should revert if the NFT with the same URI is already minted", async function () {
    const uri = "https://mocknft.com/nft-metadata";
    const value = ethers.utils.parseEther("0.05"); // 0.05 ETH

    await benzToken.payToMint(await owner.getAddress(), uri, { value });

    await expect(
      benzToken.payToMint(await otherAccount.getAddress(), uri, { value })
    ).to.be.revertedWith("NFT already Minted");
  });

  it("Should revert if the payment amount is less than the required amount", async function () {
    const uri = "https://mocknft.com/nft-metadata";
    const value = ethers.utils.parseEther("0.03"); // 0.03 ETH

    await expect(
      benzToken.payToMint(await owner.getAddress(), uri, { value })
    ).to.be.revertedWith("Insufficient payment");
  });

  it("Should return the total supply of tokens", async function () {
    const uri1 = "https://mocknft.com/nft-metadata-1";
    const uri2 = "https://mocknft.com/nft-metadata-2";
    const value = ethers.utils.parseEther("0.05"); // 0.05 ETH

    await benzToken.payToMint(await owner.getAddress(), uri1, { value });
    await benzToken.payToMint(await otherAccount.getAddress(), uri2, { value });

    expect(await benzToken.totalSupply()).to.equal(2);
  });

  it("Should return the minting period", async function () {
    const mintStartDate = Math.floor(Date.now() / 1000);
    const mintEndDate = mintStartDate + 30 * 24 * 60 * 60;

    expect(await benzToken.getMintingPeriod()).to.deep.equal([
      mintStartDate,
      mintEndDate,
    ]);
  });

  it("Should return the list of owned tokens for a wallet", async function () {
    const uri1 = "https://mocknft.com/nft-metadata-1";
    const uri2 = "https://mocknft.com/nft-metadata-2";
    const value = ethers.utils.parseEther("0.05"); // 0.05 ETH

    await benzToken.payToMint(await owner.getAddress(), uri1, { value });
    await benzToken.payToMint(await otherAccount.getAddress(), uri2, { value });

    const ownedTokens = await benzToken.getOwnedTokens(
      await owner.getAddress()
    );

    expect(ownedTokens).to.have.lengthOf(1);
    expect(ownedTokens[0]).to.equal(0);
  });
});
