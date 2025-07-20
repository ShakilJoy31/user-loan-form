import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

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
    

    createSeller: builder.mutation({
      query: (credentials) => ({
        url: "/auth/create-seller",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["seller-login"],
    }),


     // CREATE CITY
    addCity: builder.mutation({
      query: (data) => ({
        url: "/city/create-city",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-login"],
    }),

    // GET ALL CITIES
    getAllCities: builder.query({
      query: (data) => ({
        url: `/city/get-city-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["seller-login"],
    }),

    // GET CITY BY ID
    getCityById: builder.query({
      query: (id) => ({
        url: `/city/get-city-by-id/${id}`,
      }),
      providesTags: ["seller-login"],
    }),

    // UPDATE CITY
    updateCity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/city/update-city/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["seller-login"],
    }),

    // DELETE CITY
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/city/delete-city/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["seller-login"],
    }),

    // area

     addArea: builder.mutation({
      query: (data: { cityId: number; name: string }) => ({
        url: "/area/create-area",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-login"],
    }),

    // GET ALL AREAS
    getAllAreas: builder.query({
      query: (data: { page?: number; size?: number; search?: string; sort?: string }) => ({
        url: `/area/get-area-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["seller-login"],
    }),

    // GET AREA BY ID
    getAreaById: builder.query({
      query: (id: number | string) => ({
        url: `/area/get-area-by-id/${id}`,
      }),
      providesTags: ["seller-login"],
    }),

    // UPDATE AREA
    updateArea: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: number | string;
        data: { cityId: number; name: string };
      }) => ({
        url: `/area/update-area/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["seller-login"],
    }),

    // DELETE AREA
    deleteArea: builder.mutation({
      query: (id: number | string) => ({
        url: `/area/delete-area/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["seller-login"],
    }),

    //seller req list api
     // GET ALL SELLER REQUESTS
    getAllSellerRequests: builder.query({
      query: (data: { page?: number; size?: number; search?: string; sort?: string }) => ({
        url: `/user/get-seller-request?page=${data?.page || 1}&size=${
          data?.size || 10
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "desc"}`,
      }),
      providesTags: ["seller-login"],
    }),

    // UPDATE SELLER STATUS (e.g., approve/reject)
    updateSellerStatus: builder.mutation({
      query: ({ id, data }: { id: number | string; data: { status: string } }) => ({
        url: `/user/update-seller-status/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["seller-login"],
    }),


    //all seller list
      // GET ALL SELLERS
    getAllSellers: builder.query({
      query: (data: { page?: number; size?: number; search?: string; sort?: string }) => ({
        url: `/user/get-seller-all?page=${data?.page || 1}&size=${
          data?.size || 10
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "desc"}`,
      }),
      providesTags: ["seller-login"],
    }),


  }),
});

export const {
  useLoginSellerMutation,
  useCreateSellerMutation,
  //city
  useAddCityMutation,
  useGetAllCitiesQuery,
  useGetCityByIdQuery,
  useUpdateCityMutation,
  useDeleteCityMutation,
  //area
   useAddAreaMutation,
  useGetAllAreasQuery,
  useGetAreaByIdQuery,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
  //seller req list
  useGetAllSellerRequestsQuery,
  useUpdateSellerStatusMutation,
  //seller all list
  useGetAllSellersQuery,
} = authApi;