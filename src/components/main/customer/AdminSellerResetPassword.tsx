// src/app/admin/reset-password/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useForgetPasswordMutation } from "@/redux/features/user/forgetPasswordApi";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";
import Image from "next/image";
import resetImage from "@/assets/reset/change-password-success.gif";
import { IoMdArrowBack } from "react-icons/io";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const tokenParam = url.searchParams.get("token");
      setToken(tokenParam);
    }
  }, []);
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [forgetPassword, { isLoading: isResetting }] = useForgetPasswordMutation();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await forgetPassword({
        token,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error("Failed to reset password. The link may have expired.");
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-[463px] w-full px-[20px] lg:px-0 mx-auto text-center dark:text-white">
        <div className="mb-4 lg:mb-[100px] text-[#EE5A2C] text-[16px]">
          <Button
            variant="outline"
            className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
            onClick={() => router.push("/login")}
          >
            <IoMdArrowBack />
            Back to Login
          </Button>
        </div>
        <div className="mb-10 mt-10 lg:mt-[173px]">
          <div>
            <Image
              width={471}
              height={263}
              src={resetImage}
              alt="resetImage"
              className="bg-cover"
            />
          </div>
          <h2 className="text-3xl lg:text-[30px] font-normal mb-5">Password changed</h2>
          <p className="text-gray-600 text-[16px] mb-8">
            Your password has been<br />changed successfully
          </p>
        </div>

        <div className="lg:px-[35px]">
          <Button
            onClick={() => router.push("/login")}
            className="w-full rounded-full lg:max-w-[400px] h-auto max-h-[63px] py-[18px] text-[16px] bg-[#EE5A2C] text-white md:rounded-md hover:bg-orange-800 transition"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[463px] w-full px-[20px] lg:px-0 mx-auto dark:text-white">
      <div className="mb-4 lg:mb-[100px] text-[#EE5A2C] text-[16px]">
        <Button
          variant="outline"
          className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
          onClick={() => router.push("/login")}
        >
          <IoMdArrowBack />
          Back to Login
        </Button>
      </div>

      <div className="lg:mr-[63px]">
        <h2 className="text-3xl lg:text-[52px] font-bold md:font-normal mb-5 mt-[40px] md:mt-0 lg:mb-[40px] text-center">
          Reset Password
        </h2>

        <div className="max-w-[384px] mx-auto">
          <form className="space-y-4 w-full" onSubmit={handleResetPassword}>
            <div className="relative">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Create Password*
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                minLength={6}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password*
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                minLength={6}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isResetting}
              className="w-full h-auto max-h-[63px] bg-[#EE5A2C] text-white text-[16px] py-[18px] md:rounded-md rounded-full hover:bg-orange-800 transition mt-6"
            >
              {isResetting ? <ButtonLoader /> : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}