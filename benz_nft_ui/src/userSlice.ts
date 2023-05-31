import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Owner } from "./servicers/userApi";
import { RootState } from "./store";

const initialState = {
  owner: null,
  activeWallet: null,
  isAuthenticated: false,
  userNftList:[]
} as {
  owner: null | Owner;
  isAuthenticated: boolean;
  activeWallet: string | null;
  userNftList:any[];
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticated: (state, action: PayloadAction<Owner>) => {
      state.isAuthenticated = true;
      state.owner = action.payload;
    },
    walletConnected: (state, action: PayloadAction<string>) => {
      state.activeWallet = action.payload;
    },
    userNftFetched: (state, action: PayloadAction<any[]>) => {
      state.userNftList = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(postsApi.endpoints.login.matchPending, (state, action) => {
  //       console.log('pending', action)
  //     })
  //     .addMatcher(postsApi.endpoints.login.matchFulfilled, (state, action) => {
  //       console.log('fulfilled', action)
  //       state.user = action.payload.user
  //       state.token = action.payload.token
  //     })
  //     .addMatcher(postsApi.endpoints.login.matchRejected, (state, action) => {
  //       console.log('rejected', action)
  //     })
  // },
});

export const { authenticated } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
