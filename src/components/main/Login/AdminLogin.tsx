"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDataProps, loginSchema } from "@/schema/authSchema/loginSchema";
import { useLoginMutation } from "@/redux/features/authenticationApi";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { ApiError } from "@/types/apiError";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";


export const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  //   const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const { translate } = useCustomTranslator();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDataProps) => {
    try {
      const result = await login(data).unwrap();
      console.log(result)
      const authData = jwtDecode(result?.accessToken || "");
      console.log(authData)

      if (result) {
        shareWithCookies(
          "set",
          `${appConfiguration.appCode}token`,
          1440,
          result?.accessToken
        );
      }

      router.push("/proyojon-admin-portal");
    }  catch (error) {
       const apiError = error as ApiError;
      toast.error(apiError?.data?.message || '');
    }
  };

  return (
    <div className="max-w-[460px] w-full px-[20px] lg:px-0 dark:text-white mt-10 lg:mt-20">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
          Admin account
        </h2>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password*
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <p onClick={()=> router.push('/admin-seller-forget-password')} className="text-md text-orange-500 mt-1 underline cursor-pointer hover:text-orange-600 dark:text-white">
          {translate("বর্তমান পাসওয়ার্ড ভুলে গেছেন? এখানে ক্লিক করুন", "Forgot Current Password? Click here")}
        </p>

        <Button
          type="submit"
          className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoader></ButtonLoader> : "Login"}
        </Button>


      </form>
    </div>
  );
};