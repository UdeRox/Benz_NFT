import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Owner, userApi } from './servicers/userApi'
import { RootState } from './store'

const initialState = {
  owner: null,
  activeWallet: null,
  isAuthenticated: false,
  userNftList: [],
  receipt: null,
} as {
  owner: null | Owner
  isAuthenticated: boolean
  activeWallet: string | null
  userNftList: any[]
  receipt: string | null
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticated: (state, action: PayloadAction<Partial<Owner>>) => {
      state.isAuthenticated = true
      state.owner = action.payload
    },
    walletConnected: (state, action: PayloadAction<string>) => {
      state.activeWallet = action.payload
    },
    userNftFetched: (state, action: PayloadAction<any[]>) => {
      state.userNftList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getOwnerForConnectedWallet.matchFulfilled,
        (state, action) => {
          const { data } = action.payload
          state.owner = data
          state.isAuthenticated = true
        },
      )
      .addMatcher(
        userApi.endpoints.getOwnerForConnectedWallet.matchRejected,
        (state, action) => {
          state.activeWallet = null
        },
      )
      .addMatcher(
        userApi.endpoints.updateMintedReceipt.matchFulfilled,
        (state, action) => {
          state.receipt = action.payload
        },
      )
  },
})

export const { authenticated } = slice.actions
export default slice.reducer

export const selectUser = (state: RootState) => state.user
