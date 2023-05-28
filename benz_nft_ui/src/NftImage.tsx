import { Box, Button, Grid, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { NFTStorage, File as NFTFile } from "nft.storage";
import { contract, signer } from "./Home";

export const NftImage = ({
  tokenId,
  getCount,
}: {
  tokenId?: string;
  getCount?: () => void;
}) => {
  const [isMinted, setIsMinted] = useState(false);
  const [metaURI, setMetaURI] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescrition] = useState("");
  const [uploadImge, setUploadImge] = useState<any>(null);
  const [ipfsImage, setIpfsImage] = useState<any>(null);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    getMintStatus();
  }, [isMinted]);

  const getMintStatus = async () => {
    const result = await contract.isContentOwned(metaURI);
    setIsMinted(result);
  };

  const uploadImageTOIPFS = async () => {
    const nftstorage = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI1Q2UyMzEwMjkxMjQ1RjA4MjcwODdlQzdlMTY2MTQyNEE4YmY1QWMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTExNjc2ODI3NCwibmFtZSI6ImJuel9uZnQifQ.uobDt_klTRJxEcv4g33FoeKdeCc3B4BVGHDhAARr-Ms",
      // token: process.env.REACT_APP_NFT_STORAGE_API_KEY ?? "",
    });
    const { ipnft } = await nftstorage.store({
      image: new NFTFile([ipfsImage], "image.png", { type: "image/png" }),
      name: name,
      description: description,
    });
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setMetaURI(url);
    return url;
  };

  const uploadImageFromBrowser = async (e: any) => {
    setIpfsImage(e.target.files && e.target.files[0]);
    setUploadImge(URL.createObjectURL(e.target.files && e.target.files[0]));
  };

  const mintToken = async () => {
    if (!description && !name) {
      setDescriptionError("Description is required!");
      setNameError("Name is required!");
      return;
    }
    if (!description) {
      setDescriptionError("Description is required!");
      return;
    }
    if (!name) {
      setNameError("Name is required!");
      return;
    }
    const ipfsURI = await uploadImageTOIPFS();
    const connection = contract.connect(signer);
    const addr = connection.address;
    console.log("Mint Addres", addr);
    console.log("Mint URI ", ipfsURI);
    const result = await contract.payToMint(addr, ipfsURI, {
      value: ethers.utils.parseEther("0.05"),
      //   gasLimit: ethers.utils.parseEther("0.10"),
      gasLimit: 300000,
    });
    await result.wait();
    await getMintStatus();
    getCount?.();
  };

  const getURI = async () => {
    console.log("token Id ", tokenId);
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  };

  return (
    <Box
      component="form"
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        bgcolor: "background.paper",
        border: "1px solid rgb(229, 232, 235)",
      }}
    >
      <Grid
        container
        direction="column"
        spacing={1}
        justifyContent="space-between"
        alignContent={"baseline"}
      >
        <Grid item>
          <Box>
            <img
              style={{ height: "400px", width: "500px" }}
              src={uploadImge ?? "./imgs/placeholder.jpeg"}
              alt={`NFT #`}
            />
          </Box>
        </Grid>
        <Grid item>
          <TextField
            name="name"
            variant="standard"
            error={Boolean(nameError)}
            placeholder="Name"
            helperText={nameError}
            onChange={(event) => {
              setName(event.target.value);
              setNameError("");
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="description"
            error={Boolean(descriptionError)}
            placeholder="Description"
            variant="standard"
            helperText={descriptionError}
            onChange={(event) => {
              setDescrition(event.target.value);
              setDescriptionError("");
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" color="inherit" onClick={mintToken}>
            Mint
          </Button>
        </Grid>
        <div>
          <h5>ID # {tokenId}</h5>
          {!isMinted ? (
            <Button variant="outlined" color="inherit" onClick={mintToken}>
              Mint
            </Button>
          ) : (
            <Button variant="outlined" color="inherit" onClick={getURI}>
              Taken!, show URI
            </Button>
          )}
          <input type="file" onChange={uploadImageFromBrowser} />
        </div>
      </Grid>
    </Box>
  );
};
export default NftImage;
