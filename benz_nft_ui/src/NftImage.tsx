import { ethers } from 'ethers'
import { File as NFTFile, NFTStorage } from 'nft.storage'
import { useRef, useState } from 'react'
import { getTheContract } from './connectToWallet'
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from './lib/mui'
import { useTypedSelector } from './store'
export const nftStorageKey = import.meta.env.VITE_NFT_STORAGE_API_KEY

export const NftImage = () => {
  const [isMinted, setIsMinted] = useState(false)
  const [metaURI, setMetaURI] = useState<string>('')
  const [name, setName] = useState('')
  const [description, setDescrition] = useState('')
  const [uploadImge, setUploadImge] = useState<any>(null)
  const [ipfsImage, setIpfsImage] = useState<any>(null)
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const { owner, activeWallet } = useTypedSelector((state) => state.user)
  const [minting, setMinting] = useState(false)

  const uploadImageTOIPFS = async () => {
    const nftstorage = new NFTStorage({
      token: nftStorageKey,
      // token: process.env.REACT_APP_NFT_STORAGE_API_KEY ?? "",
    })
    const { ipnft } = await nftstorage.store({
      image: new NFTFile([ipfsImage], 'image.png', { type: 'image/png' }),
      name: name,
      description: description,
    })
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    setMetaURI(url)
    return url
  }

  const uploadImageFromBrowser = async (e: any) => {
    // setIpfsImage(e.target.files && e.target.files[0]);
    setIpfsImage(e)
    // setUploadImge(URL.createObjectURL(e.target.files && e.target.files[0]));
    setUploadImge(URL.createObjectURL(e))
  }

  const mintToken = async () => {
    if (!description && !name) {
      setDescriptionError('Description is required!')
      setNameError('Name is required!')
      return
    }
    if (!description) {
      setDescriptionError('Description is required!')
      return
    }
    if (!name) {
      setNameError('Name is required!')
      return
    }

    setMinting(true)
    const ipfsURI = await uploadImageTOIPFS()
    const { contract } = await getTheContract()
    const result = await contract.payToMint(activeWallet, ipfsURI, {
      value: ethers.utils.parseEther('0.05'),
      //   gasLimit: ethers.utils.parseEther("0.10"),
      gasLimit: 300000,
    })
    console.log('REsult check1 ')
    console.log('REsult check1 -', result)
    const resultofMind = await result.wait()
    console.log('REsult of minting ')
    console.log('REsult of minting ', resultofMind)
    // const owned = await contract.isContentOwned(ipfsImage);
    // console.log("Minigin completed! - ", owned)
    setIsMinted(result)
    setMinting(false)
  }

  const fileInputRef = useRef<any>(null)

  return (
    <Box
      component="form"
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        border: '1px solid rgb(229, 232, 235)',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={minting}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Box>
            {/* <img
              style={{ height: "400px", width: "500px" }}
              src={uploadImge ?? "./imgs/placeholder.jpeg"}
              alt={`NFT #`}
            /> */}
            <Card
              raised
              sx={{
                maxWidth: 280,
                margin: '0 auto',
                padding: '0.1em',
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={uploadImge ?? './imgs/placeholder.jpeg'}
                alt={'alt'}
                title={'titleasdasdsada'}
                sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid item>
          <>
            <FileUploadButton onFileSelect={uploadImageFromBrowser} />
          </>
        </Grid>
        <Grid item>
          <TextField
            name="name"
            variant="standard"
            error={Boolean(nameError)}
            placeholder="Name"
            helperText={nameError}
            onChange={(event) => {
              setName(event.target.value)
              setNameError('')
            }}
            sx={{ width: '300px' }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="description"
            error={Boolean(descriptionError)}
            placeholder="Description"
            variant="outlined"
            multiline
            rows={3}
            helperText={descriptionError}
            onChange={(event) => {
              setDescrition(event.target.value)
              setDescriptionError('')
            }}
            sx={{ width: '300px' }}
          />
        </Grid>
        <Grid item>
          {!isMinted && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={mintToken}
              disabled={!uploadImge || !name || !description} // Disable the button if image, name, or description is not filled
            >
              Mint This Image as NFT
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
export default NftImage

const FileUploadButton = ({ onFileSelect }: any) => {
  const fileInputRef = useRef<any>(null)
  const [previewImage, setPreviewImage] = useState<any>(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0]
    onFileSelect(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept="image/*"
      />
      <Button
        variant="outlined"
        color="inherit"
        component="label"
        onClick={handleButtonClick}
      >
        <Typography>Upload the Image</Typography>
      </Button>
    </>
  )
}
