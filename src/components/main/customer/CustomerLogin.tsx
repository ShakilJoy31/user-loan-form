"use client";

import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
// import { RiFacebookCircleFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useLoginCustomerMutation } from "@/redux/features/user/userApi";

interface CustomerLoginProps {
  setActiveTab: (tab: "login" | "create") => void;
}

export const CustomerLogin = ({ setActiveTab }: CustomerLoginProps) => {
  const dispatch = useDispatch();
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginCustomer] = useLoginCustomerMutation();
  const [signInLoader, setSignInLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInLoader(true);

    try {
      const payload = { contactNo, password };
      const response = await loginCustomer(payload).unwrap();
      
      if (response?.success === true) {
        shareWithCookies(
          "set",
          `${appConfiguration.appCode}token`,
          1440,
          response?.accessToken
        );
        loadUserFromToken(dispatch);
        router.push('/my-profile/update-profile'); 
      }

    } catch (error: unknown) {
      let errorMessage = 'Login failed';

      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as { data?: { message?: string } };
        errorMessage = apiError.data?.message || errorMessage;
        toast.error(errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        toast.error(errorMessage);
      }
    } finally {
      setSignInLoader(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          Login to your customer account
        </p>

        {/* Phone number */}
       <div>
  <label
    htmlFor="contactNo"
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    Contact No *
  </label>
  <input
  type="text"
  id="contactNo"
  placeholder="Enter your phone No"
  maxLength={11}
  value={contactNo}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setContactNo(value);
    }
  }}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] dark:bg-black dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
/>
</div>


        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password *
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
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <h2
          onClick={() => router.push("/forget-password")}
          className="text-[14px] text-end mt-[6px] hover:cursor-pointer"
        >
          Forgot password?
        </h2>

        <Button
          type="submit"
          className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
          disabled={signInLoader}
        >
          {signInLoader ? <ButtonLoader /> : 'Sign In'}
        </Button>
      </form>

      <div className="font-medium text-[14px] mt-[16px] text-center">
        <p className="text-gray-300">Don&apos;t have an account?{' '}
          <Link href="" onClick={(e) => {
            e.preventDefault(); 
            setActiveTab("create"); 
          }}>
            <span className="text-[#EE5A2C] hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>

      {/* <div className="text-gray-300 flex justify-between items-center mt-[35px] md:hidden">
        <hr className="w-[30%] border border-gray-300" />
        <p className="text-[14px]">Or Sign in with</p>
        <hr className="w-[30%] border border-gray-300" />
      </div>

      <div className="hidden md:block">
        <div className="flex justify-center mt-5 lg:mt-10 w-full">
          <Button variant={"outline"} className="w-full py-[18px]">
            <FcGoogle />
            <span className="ml-1 text-[16px] font-normal">
              Sign In with Google
            </span>
          </Button>
        </div>
      </div>
      <div className="flex gap-[11px] justify-center mt-[22px] md:hidden">
        <Button variant={"outline"} className="rounded-full">
          <FcGoogle />
        </Button>
        <Button variant={"outline"} className="rounded-full">
          <RiFacebookCircleFill />
        </Button>
        <Button variant={"outline"} className="rounded-full">
          <FaApple />
        </Button>
      </div> */}
    </div>
  );
};