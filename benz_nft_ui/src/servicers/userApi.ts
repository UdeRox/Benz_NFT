import { api } from "./api";
interface Owner {
  id?: string;
  username?: string;
  nric?: string;
  walletAddress?: string;
}
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<Owner, Partial<Owner>>({
      query(body) {
        return {
          url: `owners/`,
          method: "POST",
          body,
        };
      },
      //   invalidatesTags: ["Posts"],
    }),
    getOwners: build.query<Owner, void>({
      query: () => "owners/",
    }),
    getOwnerForConnectedWallert: build.query<Owner, string>({
      query: (address) => `owners/${address}`,
    }),
    getPost: build.query<Owner, number>({
      query: (id) => `posts/${id}/`,
      providesTags: (_result, _err, id) => [{ type: "Posts", id }],
    }),
    updatePost: build.mutation<Owner, Partial<Owner>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `posts/${id}`,
          method: "PUT",
          body,
        };
      },
      // invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (post) => [{ type: "Posts", id: post?.id }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetOwnersQuery,
  useGetOwnerForConnectedWallertQuery,
} = userApi;
