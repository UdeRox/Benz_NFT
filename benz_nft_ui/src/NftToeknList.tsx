import { Grow } from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { NftMindBox } from './Home'
import { NftBackDrop } from './components'
import { ImageProps, NFTImage } from './components/types'
import { getTheContract } from './connectToWallet'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from './lib/mui'
import { useTypedSelector } from './store'
import { selectUser } from './userSlice'

const LazyLoadedImage: React.FC<ImageProps> = ({ title, src }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const onload = () => {
    setIsLoaded(true)
  }
  return (
    <LazyLoad once>
      <Grow
        in={isLoaded}
        style={{ transformOrigin: '0 0 0' }}
        {...(isLoaded ? { timeout: 5000 } : {})}
      >
        <CardMedia
          component="img"
          alt={'alt'}
          title={title}
          sx={{ objectFit: 'contain', display: isLoaded ? 'block' : 'none' }}
          onLoad={onload}
          image={src}
        />
      </Grow>
    </LazyLoad>
  )
}

const getOwnedTokens = async (walletAddress: string | null) => {

  try {
    const { contract } = await getTheContract()
    const count = await contract.totalSupply()
    console.log('Wallert addres', walletAddress)
    console.log('Token supply ', parseInt(count))
    const ownedTokens = await contract.getOwnedTokens(walletAddress)
    const tokenPromises = ownedTokens.map(async (tokenId: number) => {
      const tokenURI = await contract.tokenURI(tokenId)
      const response = await fetch(tokenURI)
      const metadata = await response.json()
      return { tokenId, metadata }
    })
    const tokens = await Promise.all(tokenPromises)
    return tokens
  } catch (error) {
    console.error('Error retrieving owned tokens:', error)
    return []
  }
}

const NftUserNftList: React.FC = () => {
  const { isAuthenticated, owner, activeWallet } = useTypedSelector(selectUser)
  const [isLoadingNFTs, setIsLoadingNFTs] = useState<boolean>(false)
  const [nfts, setNFTs] = React.useState<any>([])
  
  useEffect(() => {
    const asyncGetTokens = async () => {
      setIsLoadingNFTs(true)
      try {
        console.log('Wallet Address', activeWallet)
        const ownedTokens = await getOwnedTokens(activeWallet)
        console.log('Owned tokens:', ownedTokens)
        setNFTs(ownedTokens)
      } catch (err) {
        console.error('Error gettin', err)
      } finally {
        setIsLoadingNFTs(false)
      }
    }
    if (!!activeWallet && isAuthenticated) asyncGetTokens()
  }, [activeWallet, isAuthenticated, getOwnedTokens])

  const displayNftListComponent = activeWallet && nfts.length > 0
  return (
    <React.Fragment>
      {displayNftListComponent && (
        <Grow
          in={isAuthenticated}
          style={{ transformOrigin: '0 0 0' }}
          {...(isAuthenticated ? { timeout: 5000 } : {})}
        >
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              paddingTop: '15px',
              width: 'fit-content',
            }}
          >
            <Grid container>
              {nfts.map((nft: any, index: number) => {
                const nftJSON = nft.metadata
                return (
                  <Grid key={index}>
                    <NftImageHolder {...nftJSON} />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Grow>
      )}
      {!isLoadingNFTs && !displayNftListComponent && activeWallet && <NftMindBox />}
      <NftBackDrop open={isLoadingNFTs} />
    </React.Fragment>
  )
}

export default NftUserNftList

const NftImageHolder: React.FC<NFTImage> = ({
  name,
  description,
  image,
}: NFTImage) => {
  const imageUrl = image.replace('ipfs://', '')
  const [ipfsImageUrl, setIpfsImageUrl] = useState('')

  useEffect(() => {
    const fetchIpfsImage = async () => {
      const ipfsImageUrl = `https://ipfs.io/ipfs/${imageUrl}`
      setIpfsImageUrl(ipfsImageUrl)
    }
    fetchIpfsImage()
  }, [])
  return (
    <Paper variant="outlined" square>
      <Grow
        in={!!ipfsImageUrl}
        style={{ transformOrigin: '0 0 0' }}
        {...(ipfsImageUrl ? { timeout: 5000 } : {})}
      >
        <Card
          raised
          sx={{
            margin: '0 auto',
            padding: '0.1em',
          }}
        >
          <CardActionArea>
            <LazyLoadedImage
              src={`https://ipfs.io/ipfs/${imageUrl}`}
              title={name}
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
      </Grow>
    </Paper>
  )
}
