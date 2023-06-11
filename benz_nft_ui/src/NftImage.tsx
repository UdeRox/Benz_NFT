import { NftBackDrop } from '@/components'
import { getTheContract } from '@/connectToWallet'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@/lib/mui'
import { useRef, useState } from '@/lib/react'
import { useTypedSelector } from '@/store'
import { ethers } from 'ethers'
import { File as NFTFile, NFTStorage } from 'nft.storage'
import { useUpdateMintedReceiptMutation } from './servicers/userApi'
import { selectUser } from './userSlice'
export const IPFS_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_API_KEY

export const NftImage: React.FC = () => {
  const [mintedReceipt, setMintedReceipt] = useState<string>('')
  const [metaURI, setMetaURI] = useState<string>('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [uploadImge, setUploadImge] = useState<any>(null)
  const [ipfsImage, setIpfsImage] = useState<any>(null)
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const { owner, activeWallet } = useTypedSelector(selectUser)
  const [minting, setMinting] = useState(false)
  const [mintingStatus, setMintingStatus] = useState<string>()
  const [updateMintedReceipt] = useUpdateMintedReceiptMutation()

  const uploadImageTOIPFS = async () => {
    const nftstorage = new NFTStorage({
      token: IPFS_STORAGE_KEY,
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
    setIpfsImage(e)
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
    console.log('Beofore minting start ')
    const transaction = await contract.payToMint(activeWallet, ipfsURI, {
      value: ethers.utils.parseEther('0.05'),
      gasLimit: 30000000,
    })
    const receipt = await transaction.wait()
    setMintedReceipt(transaction.hash)
    setMinting(false)
    await updateMintedReceipt({
      wallet: activeWallet,
      receipt: transaction.hash,
    })
    const filter = contract.filters.NFTMinted()
    contract.on(filter, (tokenId, metadataURI) => {
      setMintingStatus(`NFT minted with ID ${tokenId} -- ${metadataURI}`)
    })
  }

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
      <NftBackDrop open={minting} />
      <span>{`Minting Stattus >>>> ${mintingStatus}`}</span>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Card
            raised
            sx={{
              maxWidth: '100%',
              margin: '0 auto',
              padding: '0.1em',
            }}
          >
            <CardMedia
              component="img"
              image={uploadImge ?? './imgs/placeholder.jpeg'}
              alt={'alt'}
              title={name}
            />
          </Card>
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
              setDescription(event.target.value)
              setDescriptionError('')
            }}
            sx={{ width: '300px' }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="inherit"
            onClick={mintToken}
            disabled={!uploadImge || !name || !description} // Disable the button if image, name, or description is not filled
          >
            Mint This Image as NFT
          </Button>
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
