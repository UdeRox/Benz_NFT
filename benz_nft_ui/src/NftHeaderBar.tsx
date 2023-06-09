import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined'
import { Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { walletConnected } from './actions'
import { NftBackDrop, NftMiddleEllipsis } from './components'
import { connectToWallet, getTheContract } from './connectToWallet'
import { AppBar, Box, Button, Toolbar, Typography } from './lib/mui'
import { useGetOwnerForConnectedWalletQuery } from './servicers/userApi'
import { useAppDispatch, useTypedSelector } from './store'
import { authenticated } from './userSlice'

export const NftHeaderBar = () => {
  const { owner, activeWallet } = useTypedSelector((state) => state.user)
  const [mintingPeriod, setMintingPeriod] = useState<any>()
  const dispatch = useAppDispatch()
  const [showToolTip, setShowToolTip] = useState<boolean>(false)
  const {
    data = {},
    isLoading,
    error,
    isSuccess = false,
  } = useGetOwnerForConnectedWalletQuery(activeWallet, {
    skip: !activeWallet,
  })

  const onClickConnectToWallet = async () => {
    if (activeWallet) {
      await navigator.clipboard.writeText(activeWallet)
      setShowToolTip(true)
    } else {
      const { account, balance } = await connectToWallet()
      console.log('Account - ', account)
      dispatch(walletConnected(account))
    }
  }

  useEffect(() => {
    const getValidityPeriod = async () => {
      const { contract } = await getTheContract()
      const validDate = await contract.getMintingPeriod()
      setMintingPeriod(validDate)
    }

    getValidityPeriod()
  }, [activeWallet])

  useEffect(() => {
    if (isSuccess) {
      console.log('Data Results ')
      dispatch(authenticated({ ...data }))
    }
  }, [data])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'whitesmoke', color: 'black' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BENZ NFT
          </Typography>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            {/* {(parseInt(mintingPeriod)* 1000)} */}
            {new Date(mintingPeriod * 1000).toLocaleDateString()}
          </Typography>
          <Tooltip
            title="Copied"
            open={showToolTip}
            onClose={() => setShowToolTip(false)}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={onClickConnectToWallet}
              endIcon={<WalletOutlinedIcon />}
            >
              <NftMiddleEllipsis text={activeWallet ?? `Connect Wallet`} />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <NftBackDrop open={isLoading} />
    </Box>
  )
}
