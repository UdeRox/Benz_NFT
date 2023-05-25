import { api } from "./api";
interface User {
  id?: string;
  username?: string;
  nric?: string;
  address?: string;
}
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: `user`,
          method: "POST",
          body,
        };
      },
    //   invalidatesTags: ["Posts"],
    }),
    getPost: build.query<User, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Posts", id }],
    }),
    updatePost: build.mutation<User, Partial<User>>({
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

export const { useRegisterUserMutation } = userApi;
