import { expect } from "chai";
import { ethers } from "hardhat";

const tokens = (n: string) => {
  return ethers.utils.parseEther(n);
};

describe("BenzToken", function () {
  let benzToken;
  let owner;

  async function deployBnzTk() {
    const [owner, otherAccount] = await ethers.getSigners();
    const BenzToken = await ethers.getContractFactory("BenzToken");
    const bnztkn = await BenzToken.deploy();
    return { bnztkn, owner, otherAccount };
  }

  beforeEach(async function () {
    const { owner: returnOwner, bnztkn } = await deployBnzTk();
    owner = returnOwner;
    benzToken = bnztkn;
  });

  it("Should mint an NFT with the specified URI", async function () {
    const uri = "https://example.com/nft-metadata";

    await benzToken.safeMint(owner.address, uri);

    const tokenId = 0;
    expect(await benzToken.balanceOf(owner.address)).to.equal(1);
    expect(await benzToken.ownerOf(tokenId)).to.equal(owner.address);
    expect(await benzToken.tokenURI(tokenId)).to.equal(uri);
  });

  it("Should require payment to mint an NFT", async function () {
    const uri = "https://example.com/nft-metadata";
    const value = tokens("0.05"); // 0.05 ETH

    await expect(benzToken.payToMint(owner.address, uri, { value })).to.emit(
      benzToken,
      "Transfer"
    );
    const tokenId = 0;
    expect(await benzToken.balanceOf(owner.address)).to.equal(1);
    expect(await benzToken.ownerOf(tokenId)).to.equal(owner.address);
    expect(await benzToken.tokenURI(tokenId)).to.equal(uri);
  });

  it("Should revert if the NFT with the same URI is already minted", async function () {
    const uri = "https://example.com/nft-metadata";
    const value = tokens("0.05"); // 0.05 ETH

    await benzToken.payToMint(owner.address, uri, { value });

    await expect(
      benzToken.payToMint(owner.address, uri, { value })
    ).to.be.revertedWith("NFT already Minted");
  });

  it("Should revert if the payment amount is less than the required amount", async function () {
    const uri = "https://example.com/nft-metadata";
    const value = tokens("0.03"); // 0.03 ETH

    await expect(
      benzToken.payToMint(owner.address, uri, { value })
    ).to.be.revertedWith("Need to pay up");
  });
});
