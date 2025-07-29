import { apiSlice } from "@/redux/api/apiSlice";
import { fallback } from "@/utils/common/fallback";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL CUSTOMERS
    getCustomers: builder.query({
      query: (data) => ({
        url: `/user/get-customer-all?page=${data?.page || 1}&size=${data?.size || fallback.querySize
          }&search=${data.search || ""}&sortOrder=${data?.sort || "desc"
          }&orderCountFilterType=${data?.orderCount}&orderAmountFilterType=${data?.orderAmount
          }&sortBy=${data?.sortBy}`,
      }),
      providesTags: ["customer"],
    }),

    getAdmin: builder.query({
      query: (data) => ({
        url: `/user/get-admin-all?page=${data?.page || 1}&size=${data?.size || fallback.querySize
          }&search=${data.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["customer"],
    }),
    getUserNotification: builder.query({
      query: () => ({
        url: `/user/get-notification`,
      }),
      providesTags: ["customer"],
    }),

    // GET SINGLE CUSTOMER
    getSingleCustomer: builder.query({
      query: (id) => ({
        url: `/user/get-customer-by-id/${id}`,
      }),
      providesTags: ["customer"],
    }),

    // CREATE A NEW USER
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user/create-user",
        method: "POST",
        body: userData, // Send user data in the body
      }),
      invalidatesTags: ["customer"],
    }),

    getUsers: builder.query({
      query: (data) => ({
        url: `/user/get-user-all?page=${data?.page || 1}&size=${data?.size || fallback.querySize
          }&search=${data.search || ""}&sortOrder=${data?.sort || "asc"}`,
      }),
      providesTags: ["customer"],
    }),

    // GET SINGLE CUSTOMER
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/get-user-by-id/${id}`,
      }),
      providesTags: ["customer"],
    }),

    getDashboardActivityLog: builder.query({
      query: (params) => {
        const {
          page = 1,
          size = fallback.querySize,
          search = "",
          sort = "desc",
        } = params || {};
        return {
          url: `/dashboard/user-activity-log`,
          params: {
            page,
            size,
            search,
            sortOrder: sort,
          },
        };
      },
      providesTags: ["customer"],
    }),

    // GET USER ACTIVITY LOG
    getUserActivityLog: builder.query({
      query: (id) => ({
        url: `/user/get-user-activity-log/${id}`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    // UPDATE USER DETAILS
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["customer"],
    }),

    // DELETE A USER
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
    deleteCashe: builder.mutation({
      query: () => ({
        url: `/dashboard/delete-redis-cache`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer", "products"],
    }),

    //customer order api
    // CREATE ORDER
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["customer"],
    }),

    //home page filter api:
    getFilteredShops: builder.query({
      query: (params) => {
        const {
          city = "",
          area = "",
          categoryId = "",
          search = "",
        } = params || {};
        return {
          url: `/user/get-filter-shop`,
          params: {
            city,
            area,
            categoryId,
            search,
          },
        };
      },
      providesTags: ["customer"],
    }),

    //customer register
    // CREATE A NEW customer
    createCustomerRegister: builder.mutation({
      query: (userData) => ({
        url: "/auth/create-customer",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["customer"],
    }),

    //login customer
    loginCustomer: builder.mutation({
      query: (userData) => ({
        url: "/auth/login-customer",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["customer"],
    }),



    // Customer change password. 
    customerChangePassword: builder.mutation({
      query: (userData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["customer"],
    }),


      otpGenerate: builder.mutation({
      query: ({ contactNo }) => ({
        url: "/auth/otp-generate",
        method: "POST",
        body: { contactNo },
      }),
    }),

    //otp
     verifyOtp: builder.mutation({
      query: ({ token, otp }) => ({
        url: `/auth/verify-otp?token=${token}`,
        method: "POST",
        body: { otp },
      }),
    }),


     // Checking if the phone number is already registered
    verifyPhoneNumber: builder.mutation({
      query: ({ phone }) => ({
        url: `/user/get-customer-by-phone/${phone}`,
        method: "GET",
      }),
    }),




  }),
});

export const {
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useGetUsersQuery,
  useGetAdminQuery,
  useGetUserActivityLogQuery,
  useGetDashboardActivityLogQuery,
  useGetUserNotificationQuery,
  useDeleteCasheMutation,
  useCreateOrderMutation,
  useGetFilteredShopsQuery,
  useCreateCustomerRegisterMutation,
  useLoginCustomerMutation,
  useCustomerChangePasswordMutation,
  useOtpGenerateMutation,
  useVerifyOtpMutation,
  useVerifyPhoneNumberMutation,
} = userApi;
