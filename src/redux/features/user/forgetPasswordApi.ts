import { apiSlice } from "@/redux/api/apiSlice";

export const forgetPasswordApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // LOGIN
        // FORGOT PASSWORD FLOW
        otpGenerateForget: builder.mutation({
            query: ({ contactNo }) => ({
                url: "/auth/otp-generate-forget",
                method: "POST",
                body: { contactNo },
            }),
        }),

        verifyOtpForget: builder.mutation({
            query: ({ token, otp }) => ({
                url: `/auth/verify-otp-forget?token=${token}`,
                method: "POST",
                body: { otp },
            }),
        }),

        forgetPassword: builder.mutation({
            query: ({ token, newPassword, confirmPassword }) => ({
                url: `/auth/forget-password?token=${token}`,
                method: "POST",
                body: { newPassword, confirmPassword },
            }),
        }),


        forgetPasswordRequest: builder.mutation({
            query: (body) => ({
                url: `/auth/forget-password-request`,
                method: "POST",
                body,
            }),
        }),


    }),
});

// Export all hooks together
export const {
    useOtpGenerateForgetMutation,
    useVerifyOtpForgetMutation,
    useForgetPasswordMutation,
    useForgetPasswordRequestMutation



} = forgetPasswordApi;
