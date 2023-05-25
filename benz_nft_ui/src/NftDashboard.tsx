import React, { useState, useEffect } from "react";
import NFTContract from "./abi/BenzNFT.json";
import { Box, Button, Grid, Paper, styled } from "@mui/material";
import web3 from "./web3";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NftDashboard = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  // const [connectedWallets, setConnectedWallets] = useState<{nftContract:string,account:string}>()
  const [connectedWallets, setConnectedWallets] = useState<any>();
  const conectToChain = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's accounts
        await window.ethereum.enable();

        // Create a Web3 instance
        // const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        // Update the accounts state variable
        setAccounts(accounts);
        console.log("Show connected accounts ", accounts);

        // Load the NFT contract
        const networkId = await web3.eth.net.getId();
        console.log("network id ", networkId);
        // const nftCon = NFTContract as any;
        // const contractData = NFTContract.networks[networkId];
        // console.log("Contract data", contractData)
        // if (contractData) {
        //   const nftContract = new web3.eth.Contract(
        //     NFTContract.abi as any, // Use "any" type for ABI
        //     contractData
        //   );
        const account = accounts[0];
        //   setConnectedWallets({nftContract, account})

        console.log("Connected Contracts ", connectedWallets);
        // Perform contract interactions here...
        // } else {
        //   console.error("NFT contract not deployed on the current network.");
        // }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Please install MetaMask to use this application.");
    }
  };

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 12, md: 8 }}
      >
        {[1, 2, 3, 4, 5].map((tokenId, index) => (
          <Grid item xs={1} sm={2} md={4} key={index}>
            <Box sx={{ width: "100%" }}>
              <img src={`./imgs/${tokenId}.png`} alt={`NFT #${tokenId}`} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NftDashboard;
