import * as React from "react";
import { useEffect } from "react";
import { getTheContract } from "./connectToWallet";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "./lib/mui";
import { useTypedSelector } from "./store";

const getOwnedTokens = async (walletAddress: string | null) => {
  try {
    const { contract } = await getTheContract();
    const count = await contract.totalSupply();
    console.log("Wallert addres", walletAddress);
    console.log("Token supply ", parseInt(count));
    const ownedTokens = await contract.getOwnedTokens(walletAddress);
    const tokenPromises = ownedTokens.map(async (tokenId: number) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      return { tokenId, metadata };
    });
    const tokens = await Promise.all(tokenPromises);
    return tokens;
  } catch (error) {
    console.error("Error retrieving owned tokens:", error);
    return [];
  }
};

const NftUserNftList = () => {
  const [nfts, setNFTs] = React.useState<any>([]);
  const {
    isAuthenticated,
    owner,
    activeWallet = "",
  } = useTypedSelector((state) => state.user);
  useEffect(() => {
    const asyncGetTokens = async () => {
      console.log("Wallet Address", activeWallet);
      const ownedTokens = await getOwnedTokens(activeWallet);
      setNFTs(ownedTokens);
      console.log("Owned tokens:", ownedTokens);
    };
    if (!!activeWallet && isAuthenticated) asyncGetTokens();
  }, [activeWallet, isAuthenticated]);

  return (
    <React.Fragment>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "auto",
          paddingTop: "15px",
          width: "fit-content",
        }}
      >
        <Grid container>
          {nfts.length === 0 && <LinearProgress />}
          {nfts.map((nft: any, index: number) => {
            const nftJSON = nft.metadata;
            return (
              <Grid key={index}>
                <ImageHolder {...nftJSON} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default NftUserNftList;

interface NFTImage {
  name: string;
  description: string;
  image: string;
}

const ImageHolder = ({ name, description, image }: NFTImage) => {
  const imageUrl = image.replace("ipfs://", "");

  return (
    <Paper variant="outlined" square>
      <Card sx={{}}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`https://ipfs.io/ipfs/${imageUrl}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="inherit">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="inherit">
            View Meta
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};
