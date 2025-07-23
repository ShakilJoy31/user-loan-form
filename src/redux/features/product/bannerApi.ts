import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD BANNER
    addBanner: builder.mutation({
      query: (data) => ({
        url: "/banner/create-banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),
    // GET ALL BANNERS
    getBanners: builder.query({
      query: (data) => ({
        url: `/banner/get-banner-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["banner"],
    }),
    // GET SINGLE BANNER
    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/banner/get-banner-by-id/${id}`,
      }),
      providesTags: ["banner"],
    }),
    // UPDATE BANNER
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/banner/update-banner/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),
    // DELETE BANNER
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/delete-banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),

    //Advertise banner

      // CREATE ADVERTISE BANNER
    addAdvertiseBanner: builder.mutation({
      query: (data) => ({
        url: "/advertise-banner/create-advertise-banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    // GET ALL ADVERTISE BANNERS
    getAdvertiseBanners: builder.query({
      query: (data) => ({
        url: `/advertise-banner/get-advertise-banner-all?page=${data?.page || 1}&size=${
          data?.size || fallback.querySize
        }&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["banner"],
    }),

    // GET SINGLE ADVERTISE BANNER
    getSingleAdvertiseBanner: builder.query({
      query: (id) => ({
        url: `/advertise-banner/get-advertise-banner-by-id/${id}`,
      }),
      providesTags: ["banner"],
    }),

    // UPDATE ADVERTISE BANNER
    updateAdvertiseBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/advertise-banner/update-advertise-banner/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    // DELETE ADVERTISE BANNER
    deleteAdvertiseBanner: builder.mutation({
      query: (id) => ({
        url: `/advertise-banner/delete-advertise-banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetBannersQuery,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  //advertise banner
  useAddAdvertiseBannerMutation,
  useGetAdvertiseBannersQuery,
  useGetSingleAdvertiseBannerQuery,
  useUpdateAdvertiseBannerMutation,
  useDeleteAdvertiseBannerMutation,
} = bannerApi;
