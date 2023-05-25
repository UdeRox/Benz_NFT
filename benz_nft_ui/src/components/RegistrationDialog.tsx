import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRegisterUserMutation, userApi } from "../servicers/userApi";

interface RegistrationDialogType {
  openDalog: boolean;
  walletAddress?: string;
  setOpenDialog: (open: boolean) => void;
}
const RegistrationDialog = (props: RegistrationDialogType) => {
  const [nric, setNric] = useState<string>("");
  const [registerUser, { isLoading: isUpdating }] = useRegisterUserMutation();
  const handleClose = () => {
    props.setOpenDialog(false);
  };
  const registerUserEvent = () => {
    console.log(nric);
    registerUser({ nric })
      .then((result) => {
        console.log("Succfully registered!!", result);
      })
      .catch((error) => console.log("Error while registering user", error));
  };
  return (
    <Box>
      <Dialog open={props.openDalog} onClose={handleClose}>
        <DialogTitle>NRIC</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">
              Wallert Address: {`${props.walletAddress}`}
            </Typography>
            <Typography variant="body2">
              To start mint NFT, please enter your NRIC here.
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nric"
            label="NRIC Number"
            value={nric}
            fullWidth
            variant="standard"
            onChange={(event) => setNric(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={registerUserEvent}>Register</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegistrationDialog;
