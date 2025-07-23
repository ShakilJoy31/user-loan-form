"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

interface CustomerLoginProps {
  setActiveTab: (tab: "login" | "create") => void;
}

export const CustomerLogin = ({ setActiveTab }: CustomerLoginProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <form className="space-y-4">
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
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
          />
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
               />
               <button
                 type="button"
                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                 onClick={() => setShowPassword(!showPassword)}
               >
                 {showPassword ? <FaEyeSlash /> : <FaEye />}
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
        >
          Sign In
        </Button>
      </form>

       <div className="font-medium text-[14px] mt-[16px]">
              <p className="text-gray-300">Already have an account?   <Link href="" onClick={(e) => {
            e.preventDefault(); 
            setActiveTab("create"); 
          }}>
            <span className="text-[#EE5A2C] hover:underline">Sign Up</span>
          </Link>
          </p>
            </div>

      <div className="text-gray-300 flex justify-between items-center mt-[35px] md:hidden">
        <hr className="w-[30%] border border-gray-300" />
        <p className="text-[14px]">Or Sign in with</p>
        <hr className="w-[30%] border border-gray-300" />
      </div>

      <div className="hidden md:block">
        <div className="flex justify-center mt-5 lg:mt-10 w-full ">
          <Button variant={"outline"} className="w-full py-[18px]">
            <FcGoogle />
            <span className="ml-1 text-[16px] font-normal">
              Sign Up with Google
            </span>
          </Button>
        </div>
      </div>
      <div className="flex gap-[11px] justify-center mt-[22px] md:hidden">
        <Button variant={"outline"} className="rounded-full">
          <FcGoogle />
        </Button>
        <Button variant={"outline"} className="rounded-full ">
          <RiFacebookCircleFill />
        </Button>
        <Button variant={"outline"} className="rounded-full ">
          <FaApple />
        </Button>
      </div>
    </div>
  );
};
