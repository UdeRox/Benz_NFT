import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useGetOwnerForConnectedWallertQuery
} from "../servicers/userApi";
import RegistrationDialog from "./RegistrationDialog";
const NavBar = () => {
  // const [accounts, setAccounts] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [connectedAccount, setConnectedAccount] = useState<any>();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  // const { data: users } = useGetOwnersQuery();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { data, isLoading, isSuccess = false } =
    useGetOwnerForConnectedWallertQuery(connectedAccount,{ skip: !connectedAccount });
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() =>{
    console.log("Is cuccess", data)
    if(isSuccess || !connectedAccount)
    setOpenDialog(false)
    else setOpenDialog(true)
  },[isSuccess, data,connectedAccount])

  const connectToTheWallet = async () => {
    console.log("{}{}{}{}{", isLoading);
    // console.log("{}{}{}{}{ ", users);
    if (window.ethereum) {
      try {
        // Request access to the user's accounts
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Selected accounts", accounts[0]);
        setConnectedAccount(accounts[0]);
        // setOpenDialog(true);
        // console.log("Show connected accounts ", accts);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Please install MetaMask to use this application.");
    }
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My NFTs</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  // function handleClose(event: SyntheticEvent<Element, Event>): void {
  //   // throw new Error("Function not implemented.");
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ width: "100%" }} position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BenzNFT
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button
              onClick={connectToTheWallet}
              sx={{ backgroundColor: "white" }}
            >
              {connectedAccount ? connectedAccount : "Connect To Wallet"}
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {/* <MoreIcon /> */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <RegistrationDialog
        walletAddress={connectedAccount}
        openDalog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      {/* <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          This is a success message!
        </Alert> */}
      {/* </Snackbar> */}
    </Box>
  );
};

export default NavBar;
