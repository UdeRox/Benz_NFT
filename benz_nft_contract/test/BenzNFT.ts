import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BenzNFT } from "../typechain-types";

const tokens = (n:number) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
describe("BenzNFT", function () {
  let benzNFT: BenzNFT;
  const NAME = "BENZ_NFT"
  const SYMBOL = "BZNFT"
  const COST = tokens(1)

  beforeEach(async function () {
    const BenzNFT = await ethers.getContractFactory("BenzNFT");
    benzNFT = await BenzNFT.deploy(NAME,SYMBOL, COST);
    await benzNFT.deployed();
  });

  it("should mint an NFT and emit NFTMinted event", async function () {
    const tokenURI = "https://example.com/metadata/1";
    const tokenId = 1;
    const [owner, otherAccount] = await ethers.getSigners();

    await expect(benzNFT.mintNFT(owner.address, tokenId, tokenURI))
      .to.emit(benzNFT, "NFTMinted")
      .withArgs(owner.address, tokenId, tokenURI);

    expect(await benzNFT.ownerOf(tokenId)).to.equal(owner.address);
    expect(await benzNFT.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("should prevent minting NFT with invalid token ID", async function () {
    const tokenURI = "https://example.com/metadata/2";
    const tokenId = 10;
    const [owner] = await ethers.getSigners();

    await expect(
      benzNFT.mintNFT(owner.address, tokenId, tokenURI)
    ).to.be.revertedWith("Invalid token ID");
  });

  it("should prevent minting NFT already claimed by the wallet", async function () {
    const tokenURI = "https://example.com/metadata/3";
    const tokenId = 3;
    const [owner] = await ethers.getSigners();

    await benzNFT.mintNFT(owner.address, tokenId, tokenURI);

    await expect(
      benzNFT.mintNFT(owner.address, tokenId, tokenURI)
    ).to.be.revertedWith("Token already claimed for this wallet");
  });

  it("should return correct claim status for a token", async function () {
    const tokenURI = "https://example.com/metadata/4";
    const tokenId = 4;
    const [owner, otherAccount] = await ethers.getSigners();

    await benzNFT.mintNFT(owner.address, tokenId, tokenURI);

    expect(await benzNFT.isTokenClaimed(owner.address, tokenId)).to.equal(true);
    expect(
      await benzNFT.isTokenClaimed(await otherAccount.address, tokenId)
    ).to.equal(false);
  });
});
