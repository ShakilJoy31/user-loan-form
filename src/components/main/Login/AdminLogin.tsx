"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const AdminLogin = () => {
      const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="max-w-[460px] w-full px-[20px] lg:px-0  dark:text-white mt-10 lg:mt-20">
    <form className="space-y-4">
      <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
        Login to your account
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
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
    </div>

      <Button
        type="submit"
        className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
      >
        Sign In
      </Button>
    </form>
    </div>
  );
};