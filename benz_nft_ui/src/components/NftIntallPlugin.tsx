import React from "react";
import { Box, Typography, Button } from "../lib/mui";

const NftInstallPlugin = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Typography variant="h4">Follow the Link to install MetaMask</Typography>
      <img src="./metamask-fox.svg" alt="MetaMask Logo" style={{ width: "200px" }} />
      <Button
        variant="contained"
        color="inherit"
        href="https://metamask.io/download.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        MetaMask
      </Button>
    </Box>
  );
};

export default NftInstallPlugin;