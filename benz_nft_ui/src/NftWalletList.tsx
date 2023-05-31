import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "./lib/mui";

const WalletList = ({ connectToWallet }: { connectToWallet: () => void }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "background.paper",
        border: "1px solid rgb(229, 232, 235)",
      }}
    >
      <Box>
        <List sx={{ width: "200px" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={connectToWallet}>
              <ListItemIcon sx={{ height: "30px" }}>
                <img src="./metamask-fox.svg" />
              </ListItemIcon>
              <ListItemText primary="MetaMask" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
    </Box>
  );
};

export default WalletList;
