import { Alert, AlertTitle, Box, Grid, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { HeaderBar, connectToWallet } from "./HeaderBar";
import NftImage from "./NftImage";
import WalletList from "./WalletList";
import BenzToken from "./artifacts/contracts/BenzTk.sol/BenzToken.json";
import RegistrationDialog from "./components/RegistrationDialog";
import { useGetOwnerForConnectedWallertQuery } from "./servicers/userApi";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
//Should be in config file
export const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

export const signer = provider.getSigner();

export const contract = new ethers.Contract(
  contractAddress,
  BenzToken.abi,
  signer
);
export const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [wallet, setWallert] = useState<string>("");
  const {
    data = {},
    isLoading,
    error,
    isSuccess = false,
  } = useGetOwnerForConnectedWallertQuery(wallet, { skip: !wallet });
  const [showMintPage, setShowMintPage] = useState<boolean>(false);
  const getCount = async () => {
    const count = await contract.totalSupply();
    setTotalMinted(parseInt(count));
  };

  useEffect(() => {
    //TODO data types should be handled here
    setShowMintPage(!data?.data?.nric && !data?.data?.walletAddress);
  }, [data, setShowMintPage]);

  useEffect(() => {
    getCount();
  }, [getCount]);

  useEffect(() => {
    if (error && wallet) setOpenDialog(true);
  }, [wallet, error]);

  const onClickConnectToWallet = async () => {
    const { account, balance } = await connectToWallet();
    setWallert(account);
  };

  return (
    <Box sx={{ alignContent: "center", justifyContent: "center" }}>
      <HeaderBar walletAddress={wallet} />
      <Box hidden={!showMintPage}>
        <Typography variant="body2">{error ? "Error occured!" : ""}</Typography>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            bgcolor: "background.paper",
            border: "1px solid rgb(229, 232, 235)",
          }}
        >
          <Typography variant="h5">Connect Your Wallet </Typography>
        </Box>
        <WalletList connectToWallet={onClickConnectToWallet} />
        <RegistrationDialog
          walletAddress={wallet}
          openDalog={openDialog}
          setOpenDialog={setOpenDialog}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          <Alert severity={isSuccess ? "success" : "error"}>
            <AlertTitle>
              {isSuccess
                ? "Succefully Connected!"
                : "You have to register to Start Minting!"}
            </AlertTitle>
          </Alert>
        </Box>
      </Box>
      <NftMindBox showMintPage={showMintPage} />
    </Box>
  );
};

const NftMindBox = ({ showMintPage }: { showMintPage: boolean }) => {
  return (
    <Box hidden={showMintPage}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          border: "1px solid rgb(229, 232, 235)",
        }}
      >
        <Grid container justifyContent="center">
          <NftImage />
        </Grid>
      </Box>
    </Box>
  );
};
