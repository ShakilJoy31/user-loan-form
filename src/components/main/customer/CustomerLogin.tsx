"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const CustomerLogin = () => {
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
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#EE5A2C] text-white py-3 rounded-md hover:bg-orange-800 transition mt-6"
      >
        Sign In
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