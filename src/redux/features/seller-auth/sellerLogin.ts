import { apiSlice } from "@/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    loginSeller: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login-user",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["seller-login"],
    }),
    


  }),
});

export const {
  useLoginSellerMutation
} = authApi;