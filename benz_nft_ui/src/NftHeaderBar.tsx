import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { useEffect } from "react";
import { authenticated, userNftFetched, walletConnected } from "./actions";
import { connectToWallet, getTheContract } from "./connectToWallet";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
} from "./lib/mui";
import { Owner, useGetOwnerForConnectedWalletQuery } from "./servicers/userApi";
import { useAppDispatch, useTypedSelector } from "./store";


export const NftHeaderBar = () => {
  const { owner, activeWallet } = useTypedSelector((state) => state.user);

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
  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      const user: any = data.data as Owner;
      console.log("Data Results ");
      dispatch(authenticated({ ...user }));
    }
  }, [data]);

  useEffect(() => {
    const getUserNfts = async () => {
      const { contract } = await getTheContract();
      // @ts-ignore
      const resultNfts = await contract.getOwnedTokens(owner.walletAddress);
      console.log("Rresults ntsss ", resultNfts);
      dispatch(userNftFetched(resultNfts));
    };
    if (owner) getUserNfts();
  }, [owner]);
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
            onClick={onClickConnectToWallet}
            endIcon={<WalletOutlinedIcon />}
          >
            {activeWallet ? `${activeWallet}` : `Connect Wallet`}
          </Button>
        </Toolbar>
      </AppBar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
