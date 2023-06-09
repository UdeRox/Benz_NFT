import { api } from './api'
export interface Owner {
  id?: string
  username?: string
  nric?: string
  wallets?: string[]
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
      //   invalidatesTags: ["Posts"],
    }),
    getOwners: build.query<OwnerResponse, void>({
      query: () => 'owners/',
    }),
    getOwnerForConnectedWallet: build.query<
      OwnerResponse,
      string | undefined | null
    >({
      query: (address) => `owners/${address}`,
    }),
    updatePost: build.mutation<Owner, Partial<Owner>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `posts/${id}`,
          method: 'PUT',
          body,
        }
      },
      // invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useGetOwnersQuery,
  useGetOwnerForConnectedWalletQuery,
} = userApi
