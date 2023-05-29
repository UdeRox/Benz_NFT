import AppsIcon from "@mui/icons-material/Apps";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyNftDialog from "./MyNftDialog";

export const connectToWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const balance = await provider.getBalance(account);
  // setAccount(account);
  // setBalance(ethers.utils.formatEther(balance));
  return { account, balance };
};

export const HeaderBar = ({
  walletAddress,
}: {
  walletAddress: string | undefined;
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const balance = await provider.getBalance(account);
  };

  const loadMyNFTs = () => {};
  useEffect(() => {
    // connectToWallet();
  }, [walletAddress, getBalance]);

  useEffect(() =>{

  },[openDialog])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "whitesmoke", color: "black" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BENZ NFT
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            // onClick={getBalance}
            onClick={getBalance}
            endIcon={<WalletOutlinedIcon />}
          >
            {walletAddress ? `${walletAddress}` : `Connect Wallet`}
          </Button>
          <IconButton
            onClick={() => setOpenDialog(!openDialog)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, marginLeft: "5px" }}
          >
            <AppsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MyNftDialog openDalog={openDialog} walletAddress={walletAddress} setOpenDialog={setOpenDialog} />
    </Box>
  );
};
