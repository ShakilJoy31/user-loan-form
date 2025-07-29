import { apiSlice } from "@/redux/api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET REVIEW BY PRODUCT
    getReviewByProduct: builder.query({
      query: (id) => ({
        url: `/review/get-review-by-product/${id}`,
      }),
      providesTags: ["review"],
    }),
  }),
});

export const {
 useGetReviewByProductQuery,
} = reviewApi;
