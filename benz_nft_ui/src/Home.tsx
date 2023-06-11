import { NftHeaderBar } from '@/NftHeaderBar'
import NftImage from '@/NftImage'
import NftUserNftList from '@/NftToeknList'
import WalletList from '@/NftWalletList'
import { walletConnected } from '@/actions'
import NftUserRegistration from '@/components/NftUsesrRegistration'
import { connectToWallet } from '@/connectToWallet'
import { useUpdateOwnerWithWalletMutation } from '@/servicers/userApi'
import { useAppDispatch, useTypedSelector } from '@/store'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box, Grid } from './lib/mui'
import { selectUser } from './userSlice'
export const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS

export const Home = () => {
  const { owner, activeWallet } = useTypedSelector(selectUser)
  const dispatch = useAppDispatch()
  const [wallet, setWallet] = useState<string | null>(null)
  const [updateOwnerWithWallet, { isLoading: isUpdating }] =
    useUpdateOwnerWithWalletMutation()

  const onClickConnectToWallet = async () => {
    const { account } = await connectToWallet()
    setWallet(account)
    dispatch(walletConnected(account))
    if (owner?.nric) {
      await updateOwnerWithWallet({
        nric: owner?.nric,
        wallets: [{ address: account }],
      })
    }
  }

  return (
    <>
      <ToastContainer limit={1} position="bottom-center" theme="colored" />
      <NftHeaderBar />
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container direction={'column'} alignContent={'center'}>
          <Grid item>
            <NftUserNftList />
          </Grid>
          <Grid item>
            <Box hidden={!!activeWallet} sx={{ width: '100%' }}>
              {!activeWallet && (
                <>
                  <WalletList connectToWallet={onClickConnectToWallet} />
                  <NftUserRegistration />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export const NftMindBox = () => {
  const {
    isAuthenticated,
    owner,
    activeWallet = '',
    userNftList = [],
  } = useTypedSelector((state) => state.user)
  return (
    <>
      {isAuthenticated && userNftList.length === 0 && (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            border: '1px solid rgb(229, 232, 235)',
          }}
        >
          <Grid container justifyContent="center">
            <NftImage />
          </Grid>
        </Box>
      )}
    </>
  )
}
