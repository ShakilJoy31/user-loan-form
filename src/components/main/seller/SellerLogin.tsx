"use client";

import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useLoginSellerMutation } from "@/redux/features/seller-auth/sellerLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { appConfiguration } from "@/utils/constant/appConfiguration";

export const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginSeller] = useLoginSellerMutation();
  const [signUpLoader, setSignUpLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpLoader(true);

    try {
      const payload = { email, password };
      const response = await loginSeller(payload).unwrap();
      console.log(response)
      if (response?.success === true) {
        shareWithCookies(
          "set",
          `${appConfiguration.appCode}token`,
          1440,
          response?.accessToken
        );
        router.push('/add-product');
      }

    } catch (error: unknown) {
      let errorMessage = 'Login failed';

      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as { data?: { message?: string } };
        console.log(apiError)
        errorMessage = apiError.data?.message || errorMessage;
        toast(errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        toast(errorMessage);
      }
    } finally {
      setSignUpLoader(false)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-600 mb-6 text-center">
          Login to your seller account
        </p>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email*
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password*
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#EE5A2C] text-white py-3 rounded-md hover:bg-orange-800 transition mt-6"
        >
          {signUpLoader ? <ButtonLoader /> : 'Sign in'}
        </Button>
      </form>

      <div className="flex justify-center mt-5 lg:mt-10 w-full">
        <Button variant={"outline"} className="w-full py-[18px]">
          <FcGoogle />
          <span className="ml-1 text-[16px] font-normal">Sign Up with Google</span>
        </Button>
      </div>
    </div>
  );
};