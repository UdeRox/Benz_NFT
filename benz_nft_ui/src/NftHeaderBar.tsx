import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined'
import { Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { walletConnected } from './actions'
import { NftBackDrop, NftMiddleEllipsis } from './components'
import { connectToWallet, getTheContract } from './connectToWallet'
import { AppBar, Box, Button, Toolbar, Typography } from './lib/mui'
import { useGetOwnerForConnectedWalletQuery } from './servicers/userApi'
import { useAppDispatch, useTypedSelector } from './store'
import { selectUser } from './userSlice'

export const NftHeaderBar = () => {
  const { activeWallet, owner } = useTypedSelector(selectUser)
  const [mintingPeriod, setMintingPeriod] = useState<any>()
  const dispatch = useAppDispatch()
  const [showToolTip, setShowToolTip] = useState<boolean>(false)
  const {
    isLoading,
    error,
    isSuccess = false,
  } = useGetOwnerForConnectedWalletQuery(
    { activeWallet, nric: owner?.nric },
    {
      skip: activeWallet == null,
    },
  )

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
