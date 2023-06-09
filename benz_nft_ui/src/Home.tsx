import { NftHeaderBar } from "@/NftHeaderBar";
import NftImage from "@/NftImage";
import NftUserNftList from "@/NftToeknList";
import WalletList from "@/NftWalletList";
import { walletConnected } from "@/actions";
import NftInstallPlugin from "@/components/NftIntallPlugin";
import NftUserRegistration from "@/components/NftUsesrRegistration";
import { connectToWallet } from "@/connectToWallet";
import { Countdown } from "@/lib/countdown";
import { useGetOwnerForConnectedWalletQuery } from "@/servicers/userApi";
import { useAppDispatch, useTypedSelector } from "@/store";
import { Alert, AlertTitle, Box, Grid, Typography } from "./lib/mui";
export const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

const Completionist = () => <span>You are good to go!</span>;
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {days} :{hours}:{minutes}:{seconds}
      </span>
    );
  }
};

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
  return (
    <>
      <NftHeaderBar />
      {/* <Countdown date={Date.now() + 5000}>
      <Completionist />
    </Countdown> */}
      <Countdown date={Date.now() + 1.296e8} renderer={renderer} />
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <NftUserNftList />
        
        {/* {error && <NftNotification type={"error"} goResponse={error} />} */}
        {/* {isSuccess && !isAuthenticated && <NftUserRegistration />} */}
        {error && !isAuthenticated && <NftUserRegistration />}
        <Box hidden={!!activeWallet} sx={{ width: "70%" }}>
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
    </>
  );
};

export const NftMindBox = () => {
  const {
    isAuthenticated,
    owner,
    activeWallet = "",
    userNftList = [],
  } = useTypedSelector((state) => state.user);
  return (
    <>
      {isAuthenticated && userNftList.length === 0 && (
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
      )}
    </>
  );
};
