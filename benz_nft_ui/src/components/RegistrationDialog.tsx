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
import { useState } from "react";
import { useRegisterUserMutation } from "../servicers/userApi";

interface RegistrationDialogType {
  openDalog: boolean;
  walletAddress?: string;
  setOpenDialog: (open: boolean) => void;
}
const RegistrationDialog = (props: RegistrationDialogType) => {
  const { walletAddress } = props;
  const [nric, setNric] = useState<string>("");
  const [registerUser] = useRegisterUserMutation();
  const handleClose = () => {
    props.setOpenDialog(false);
  };
  const registerUserEvent = () => {
    console.log(nric);
    registerUser({ nric, walletAddress: walletAddress })
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
            value={nric}
            placeholder="NRIC Number"
            fullWidth
            variant="standard"
            onChange={(event) => setNric(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={registerUserEvent}
          >
            Register
          </Button>
        </DialogActions>
        {/* <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert  severity="error" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
        </Snackbar> */}
      </Dialog>
    </Box>
  );
};

export default RegistrationDialog;
