import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE FAQ
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: data, 
      }),
      invalidatesTags: ["faq"],
    }),

    // GET ALL FAQS
    getAllFaqs: builder.query({
      query: (data) => ({
        url: `/faq/get-faq-all?page=${data?.page || 1}&size=${data?.size || fallback.querySize}&search=${data?.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["faq"],
    }),

    // GET FAQ BY ID
    getFaqById: builder.query({
      query: (id) => ({
        url: `/faq/get-faq-by-id/${id}`,
      }),
      providesTags: ["faq"],
    }),

    // UPDATE FAQ
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/update-faq/${id}`,
        method: "PUT",
        body: data, 
      }),
      invalidatesTags: ["faq"],
    }),

    // DELETE FAQ
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});


export const {
  useCreateFaqMutation,
  useGetAllFaqsQuery,
  useGetFaqByIdQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
