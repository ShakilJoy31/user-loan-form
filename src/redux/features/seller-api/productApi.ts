import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query({
            query: () => ({
                url: `brand/get-brand-all`,
                method: 'GET'
            }),
            providesTags: ["seller-login"],
        }),

        createProduct: builder.mutation({
            query: (productPayload) => ({
                url: "/product/create-product",
                method: "POST",
                body: productPayload,
            }),
            invalidatesTags: ["seller-login"],
        }),

        // Getting all products
        getAllProducts: builder.query({
            query: (data: { page?: number; size?: number; search?: string; sort?: string, type?: string }) => ({
                url: `/product/get-products?page=${data?.page || 1}&size=${data?.size || fallback.querySize
                    }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}&type=${data?.type || "Published"}`,
            }),
            providesTags: ["seller-login"],
        }),


        getProductById: builder.query({
            query: (productLink: string) => ({
                url: `product/get-product-by-id/${productLink}`,
            }),
            providesTags: ["seller-login"],
        }),

         getProductByIdForEdit: builder.query({
            query: (productLink: string) => ({
                url: `product/edit-get-product/${productLink}`,
            }),
            providesTags: ["seller-login"],
        }),

        editProductById: builder.mutation({
            query: ({
                id,
                data,
            }) => ({
                url: `/product/update-product/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["seller-login"],
        }),


        // Delete product by id
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/delete-product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["seller-login"],
        }),

        //single seller products
         getSellerProductById: builder.query({
            query: (slug) => ({
                url: `user/get-shop-page/${slug}`,
            }),
            providesTags: ["seller-login"],
        }),


    }),
});

export const {
    useCreateProductMutation,
    useGetBrandsQuery,
    useGetAllProductsQuery,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useEditProductByIdMutation,
    useGetSellerProductByIdQuery,
    useGetProductByIdForEditQuery
} = authApi;