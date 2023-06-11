import { api } from './api'

interface Wallet {
  address: string
}
export interface Owner {
  id?: string
  username?: string
  nric?: string
  wallets?: Wallet[]
  walletAddress?: string | null
}

export interface OwnerResponse {
  data: Owner
  error: string
  success: boolean
  message: string
}
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<OwnerResponse, Partial<Owner>>({
      query(body) {
        return {
          url: `owners/`,
          method: 'POST',
          body,
        }
      },
    }),
    getOwnerForConnectedWallet: build.query<
      OwnerResponse,
      { activeWallet: string | null; nric: string | undefined }
    >({
      // query: (address) => `owners/${address}`,
      query: (address) => ({
        url: '/owners',
        params: {
          wallet: address.activeWallet,
          nric: address.nric,
          // param2: params.param2,
          // Add more parameters if needed
        },
      }),
    }),
    updateOwnerWithWallet: build.mutation<OwnerResponse, Partial<Owner>>({
      query(body) {
        return {
          url: `owners/`,
          method: 'PUT',
          body,
        }
      },
    }),
    updateMintedReceipt: build.mutation<any,{ wallet: string|null; receipt: string }>({
      query(body) {
        return {
          url: `receipt/`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useGetOwnerForConnectedWalletQuery,
  useUpdateOwnerWithWalletMutation,
  useUpdateMintedReceiptMutation
} = userApi
