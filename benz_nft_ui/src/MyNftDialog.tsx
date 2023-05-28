import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useEffect } from "react";

const MyNftDialog = (props: {
  openDalog: boolean;
  setOpenDialog: (open: boolean) => void;
  walletAddress: string|undefined;
}) => {
  const [open, setOpen] = React.useState(props.openDalog);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [nfts, setNFTs] = React.useState<any>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  useEffect(() => {
    setOpen(props.openDalog);
    props.setOpenDialog(!open);
  }, [props.walletAddress]);



  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>My NFTs</DialogTitle>
        <DialogContent>
          
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Grid container spacing={2}>
              {nfts.length === 0 && <Typography>No NFTs found.</Typography>}
              {nfts.map((nft: any) => (
                <Grid key={nft.tokenId} item xs={12} sm={6} md={4} lg={3}>
                  <img src={nft.tokenURI} alt={`NFT ${nft.tokenId}`} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MyNftDialog;
