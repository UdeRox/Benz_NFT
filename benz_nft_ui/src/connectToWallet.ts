import { ethers } from "ethers";
export const contractAddress =  import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
import BenzToken from "./artifacts/contracts/BenzTk.sol/BenzToken.json";

export const connectToWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const balance = await provider.getBalance(account);
  return { account, balance };
};

export const getTheContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, BenzToken.abi, provider.getSigner());

  return {contract:contract};
};
