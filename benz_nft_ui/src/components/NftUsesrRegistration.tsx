import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@/lib/mui'
import { authenticated, selectUser } from '@/userSlice'
import { useState } from 'react'
import { useRegisterUserMutation } from '../servicers/userApi'
import { useAppDispatch, useTypedSelector } from '../store'

const NftUserRegistration = () => {
  const [nric, setNric] = useState<string>('')
  const [registerUser, { data, isLoading, error, isSuccess }] =
    useRegisterUserMutation()
  const { activeWallet = '', owner } = useTypedSelector(selectUser)
  const dispatch = useAppDispatch()
  const registerUserEvent = () => {
    registerUser({ nric, walletAddress: activeWallet })
      .then((result) => {
        dispatch(authenticated({ walletAddress: activeWallet, nric }))
        console.log('Successfully registered!!', result)
      })
      .catch((error) => console.log('Error while registering user', error))
  }
  return (
    <Box sx={{ padding: 2 }} hidden={!!owner?.nric}>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item hidden={!activeWallet}>
          <Typography variant="body1">
            Wallet Address: {`${activeWallet}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">To mint your own NFT</Typography>
          <Typography variant="body2">
            Register today with your NRIC.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            autoFocus
            margin="dense"
            id="nric"
            value={nric}
            placeholder="NRIC Number"
            fullWidth
            variant="standard"
            // helperText="Incorrect entry."
            onChange={(event) => setNric(event.target.value)}
          />
          <Grid item>
            <Button
              variant="outlined"
              color="inherit"
              onClick={registerUserEvent}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default NftUserRegistration
