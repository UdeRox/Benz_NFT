import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRegisterUserMutation } from "../servicers/userApi";
import { useAppDispatch, useTypedSelector } from "../store";
import { authenticated } from "../actions";

const NftUserRegistration = () => {
  const [nric, setNric] = useState<string>("");
  const [registerUser, { data, isLoading, error, isSuccess }] =
    useRegisterUserMutation();
  const { activeWallet = "" } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const registerUserEvent = () => {
    console.log(nric);
    registerUser({ nric, walletAddress: activeWallet })
      .then((result) => {
        dispatch(authenticated({ walletAddress: activeWallet, nric }));
        console.log("Succfully registered!!", result);
      })
      .catch((error) => console.log("Error while registering user", error));
  };
  return (
    <Box sx={{ paddingTop: 2 }}>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="body1">
            Wallert Address: {`${activeWallet}`}
          </Typography>
          <Typography variant="body2">
            To start mint NFT, please enter your NRIC here.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            autoFocus
            margin="dense"
            id="nric"
            value={nric}
            placeholder="NRIC Number"
            fullWidth
            variant="standard"
            onChange={(event) => setNric(event.target.value)}
          />
          <Grid item>
            <Button
              variant="outlined"
              color="inherit"
              onClick={registerUserEvent}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <Button variant="outlined" color="inherit" onClick={handleClose}>
            Cancel
          </Button> */}
      {/* <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert  severity="error" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
        </Snackbar> */}
      <Alert severity={isSuccess ? "success" : "error"}>
        <AlertTitle>{isSuccess ? data?.message : error?.data.error}</AlertTitle>
      </Alert>
    </Box>
  );
};

export default NftUserRegistration;
