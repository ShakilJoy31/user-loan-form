"use client";

import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useLoginSellerMutation } from "@/redux/features/seller-auth/sellerLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface SellerLoginProps {
  setActiveTab: (tab: "login" | "create") => void;
}

export const SellerLogin = ({ setActiveTab }: SellerLoginProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginSeller] = useLoginSellerMutation();
  const [signUpLoader, setSignUpLoader] = useState(false);
  const { translate } = useCustomTranslator();
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
        loadUserFromToken(dispatch);
        router.push('/add-product');
      }

    } catch (error: unknown) {
      let errorMessage = 'Login failed';

      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as { data?: { message?: string } };
        console.log(apiError)
        errorMessage = apiError.data?.message || errorMessage;
        toast.error(errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        toast.error(errorMessage);
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
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <p onClick={() => router.push('/admin-seller-forget-password')} className="text-md text-orange-500 mt-1 underline cursor-pointer hover:text-orange-600 dark:text-white">
          {translate("বর্তমান পাসওয়ার্ড ভুলে গেছেন? এখানে ক্লিক করুন", "Forgot Current Password? Click here")}
        </p>

        <Button
          type="submit"
          className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
        >
          {signUpLoader ? <ButtonLoader /> : 'Sign in'}
        </Button>
      </form>

      <div className="font-medium text-[14px] mt-[16px] text-center">
        <p className="text-gray-300">Already have an account?   <Link href="" onClick={(e) => {
          e.preventDefault();
          setActiveTab("create");
        }}>
          <span className="text-[#EE5A2C] hover:underline">Sign Up</span>
        </Link>
        </p>
      </div>

    </div>
  );
};