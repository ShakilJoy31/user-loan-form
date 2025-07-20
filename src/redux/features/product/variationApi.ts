import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

const variationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

      // CREATE VARIATION
    createVariation: builder.mutation({
      query: (data) => ({
        url: "/variation/create-variation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // GET ALL VARIATIONS
    getAllVariations: builder.query({
      query: (data) => ({
        url: `/variation/get-variation-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["variation"],
    }),

    // GET VARIATION BY ID
    getVariationById: builder.query({
      query: (id) => ({
        url: `/variation/get-variation-by-id/${id}`,
      }),
      providesTags: ["variation"],
    }),

    // UPDATE VARIATION
    updateVariation: builder.mutation({
      query: ({ id, name }) => ({
        url: `/variation/update-variation/${id}`,
        method: "PUT",
        body: { name } ,
      }),
      invalidatesTags: ["variation"],
    }),

    // DELETE VARIATION
    deleteVariation: builder.mutation({
      query: (id) => ({
        url: `/variation/delete-variation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["variation"],
    }),



    // ADD VARIATION OPTION
    createVariationOption: builder.mutation({
      query: (data) => ({
        url: "/variation-option/create-variation-option",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // GET ALL VARIATION OPTIONS
    getAllVariationOptions: builder.query({
      query: (data) => ({
        url: `/variation-option/get-variation-option-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["variation"],
    }),

    // GET VARIATION OPTION BY ID
    getVariationOptionById: builder.query({
      query: (id) => ({
        url: `/variation-option/get-variation-option-by-id/${id}`,
      }),
      providesTags: ["variation"],
    }),

    // UPDATE VARIATION OPTION
    updateVariationOption: builder.mutation({
      query: ({ id, data }) => ({
        url: `/variation-option/update-variation-option/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // DELETE VARIATION OPTION
    deleteVariationOption: builder.mutation({
      query: (id) => ({
        url: `/variation-option/delete-variation-option/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["variation"],
    }),


    //category wise variation

      // CREATE CATEGORY-WISE VARIATION
    addCategoryWiseVariation: builder.mutation({
      query: (data) => ({
        url: "/category-wise-variation/create-category-wise-variation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // GET ALL CATEGORY-WISE VARIATIONS
    getAllCategoryWiseVariations: builder.query({
      query: (data) => ({
        url: `/category-wise-variation/get-category-wise-variation-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["variation"],
    }),

    // GET CATEGORY-WISE VARIATION BY ID
    getCategoryWiseVariationById: builder.query({
      query: (id) => ({
        url: `/category-wise-variation/get-category-wise-variation-by-id/${id}`,
      }),
      providesTags: ["variation"],
    }),

    // UPDATE CATEGORY-WISE VARIATION
    updateCategoryWiseVariation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category-wise-variation/update-category-wise-variation/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // DELETE CATEGORY-WISE VARIATION
    deleteCategoryWiseVariation: builder.mutation({
      query: (id) => ({
        url: `/category-wise-variation/delete-category-wise-variation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["variation"],
    }),


  }),
});

export const {
  useCreateVariationMutation,  
  useGetAllVariationsQuery,
  useGetVariationByIdQuery,
  useUpdateVariationMutation,
  useDeleteVariationMutation,
  //variation option
  useCreateVariationOptionMutation,  
  useGetAllVariationOptionsQuery,
  useGetVariationOptionByIdQuery,
  useUpdateVariationOptionMutation,
  useDeleteVariationOptionMutation,
  //variation category wise
  useAddCategoryWiseVariationMutation,
  useGetAllCategoryWiseVariationsQuery,
  useGetCategoryWiseVariationByIdQuery,
  useUpdateCategoryWiseVariationMutation,
  useDeleteCategoryWiseVariationMutation,
} = variationApi;
