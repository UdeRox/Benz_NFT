import { ethers } from "hardhat";
import { expect } from "chai";
import { BenzToken } from "../typechain-types/contracts/BenzTk.sol";
import { Signer } from "ethers";

describe("BenzToken", function () {
  let benzToken: BenzToken;
  let owner: Signer;
  let otherAccount: Signer;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();

    const BenzTokenFactory = await ethers.getContractFactory("BenzToken");
    benzToken = (await BenzTokenFactory.deploy()) as BenzToken;
    await benzToken.deployed();
  });

  it("Should mint an NFT with the specified URI", async function () {
    const uri = "https://mocknft.com/nft-metadata";

    await benzToken.safeMint(await owner.getAddress(), uri);

    const tokenId = 0;
    expect(await benzToken.balanceOf(await owner.getAddress())).to.equal(1);
    expect(await benzToken.ownerOf(tokenId)).to.equal(await owner.getAddress());
    expect(await benzToken.tokenURI(tokenId)).to.equal(uri);
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
      benzToken.payToMint(await owner.getAddress(), uri, { value })
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
    await benzToken.payToMint(await owner.getAddress(), uri2, { value });

    expect(await benzToken.totalSupply()).to.equal(2);
  });

  it("Should return the validity period", async function () {
    expect(await benzToken.getValidityPeriod()).to.equal(30);
  });

  it("Should return the list of owned tokens for a wallet", async function () {
    const uri1 = "https://mocknft.com/nft-metadata-1";
    const uri2 = "https://mocknft.com/nft-metadata-2";
    const value = ethers.utils.parseEther("0.05"); // 0.05 ETH

    await benzToken.payToMint(await owner.getAddress(), uri1, { value });
    await benzToken.payToMint(await owner.getAddress(), uri2, { value });

    const ownedTokens = await benzToken.getOwnedTokens(
      await owner.getAddress()
    );

    expect(ownedTokens).to.have.lengthOf(2);
    expect(ownedTokens[0]).to.equal(0);
    expect(ownedTokens[1]).to.equal(1);
  });
});
