import { NftHeaderBar } from "./NftHeaderBar";
import NftImage from "./NftImage";
import NftUserNftList from "./NftToeknList";
import WalletList from "./NftWalletList";
import { walletConnected } from "./actions";
import { NftNotification } from "./components";
import NftInstallPlugin from "./components/NftIntallPlugin";
import NftUserRegistration from "./components/NftUsesrRegistration";
import { connectToWallet } from "./connectToWallet";
import { Alert, AlertTitle, Box, Grid, Typography } from "./lib/mui";
import { useGetOwnerForConnectedWalletQuery } from "./servicers/userApi";
import { useAppDispatch, useTypedSelector } from "./store";
export const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

export const Home = () => {
  const {
    isAuthenticated,
    owner,
    activeWallet,
    userNftList = [],
  } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    data = {},
    isLoading,
    error,
    isSuccess = false,
  } = useGetOwnerForConnectedWalletQuery(activeWallet, {
    skip: !activeWallet,
  });

  const onClickConnectToWallet = async () => {
    const { account, balance } = await connectToWallet();
    dispatch(walletConnected(account));
  };

  if (!window.ethereum) {
    return <NftInstallPlugin />;
  }
  const displayNftListComponent =
    isAuthenticated && activeWallet && userNftList.length > 0;
  return (
    <Box sx={{ alignContent: "center", justifyContent: "center" }}>
      <NftHeaderBar />
      {isAuthenticated && userNftList.length === 0 && <NftMindBox />}
      {displayNftListComponent && <NftUserNftList />}
      {error && <NftNotification type={"error"} goResponse={error} />}
      {isSuccess && !isAuthenticated && <NftUserRegistration />}
      <Box hidden={!!activeWallet}>
        {!activeWallet && (
          <>
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
          </>
        )}
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          <Alert severity={isAuthenticated ? "success" : "error"}>
            <AlertTitle>
              {isAuthenticated
                ? "Succefully Connected!"
                : "You have to register to Start Minting!"}
            </AlertTitle>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

const NftMindBox = () => {
  return (
    <Box>
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
