import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL PRODUCT
    getProducts: builder.query({
      query: (data) => ({
        url: `/product/get-products?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data.search || ""}&sortOrder=${data?.sort || "asc"}&type=${
          data?.type || "Published"
        }`,
      }),
      providesTags: ["products"],
    }),

    //filter
    getProductsByFilter: builder.mutation({
  query: (data) => ({
    url: "/product/get-products-wite-filter", 
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["products"], 
}),
  }),
});

export const {
useGetProductsQuery,
useGetProductsByFilterMutation
} = productApi;
