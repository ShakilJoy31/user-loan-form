"use client";

import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForgetPasswordRequestMutation } from "@/redux/features/user/forgetPasswordApi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";

interface ApiError {
  data?: {
    message?: string;
  };
}

export const AdminSellerForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [, setTimeLeft] = useState(0);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const timerRef = useRef<number | null>(null);

  const [forgetPasswordRequest, { isLoading: isSendingOtp }] = useForgetPasswordRequestMutation();

  // Check for existing verification state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('forgetPasswordState');
    if (savedState) {
      const { email, otpSent, otpVerified, expiry } = JSON.parse(savedState);
      const now = new Date().getTime();

      if (expiry > now) {
        setEmail(email);
        setOtpSent(otpSent);
        setOtpVerified(otpVerified);

        if (otpSent && !otpVerified) {
          const remainingTime = Math.max(0, Math.floor((expiry - now) / 1000));
          setTimeLeft(remainingTime);
          startTimer(remainingTime);
        }
      } else {
        // Clear expired state
        localStorage.removeItem('forgetPasswordState');
        Cookies.remove("otpForgetToken");
      }
    }
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (otpSent && !otpVerified && otpInputRefs.current[0]) {
      otpInputRefs.current[0]?.focus();
    }
  }, [otpSent, otpVerified]);

  const startTimer = (duration: number) => {
    setTimeLeft(duration);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };



  const saveStateToStorage = (state: {
    email: string;
    otpSent: boolean;
    otpVerified: boolean;
    expiry?: number;
  }) => {
    localStorage.setItem('forgetPasswordState', JSON.stringify(state));
  };

  const clearStateFromStorage = () => {
    localStorage.removeItem('forgetPasswordState');
    Cookies.remove("otpForgetToken");
  };

  const handleResetForm = () => {
    setEmail("");
    setOtpSent(false);
    setOtpVerified(false);
    setTimeLeft(0);
    clearStateFromStorage();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid email address");
      return;
    }

    try {
      const response = await forgetPasswordRequest({ email }).unwrap();
      if (response.success) {
        Cookies.set("otpForgetToken", response.token, { expires: 5 / 60 / 24 }); // 5 minutes
        setOtpSent(true);

        // Set OTP expiry time (2 minutes from now)
        const expiryTime = new Date().getTime() + 2 * 60 * 1000;
        saveStateToStorage({
          email,
          otpSent: true,
          otpVerified: false,
          expiry: expiryTime
        });

        startTimer(2 * 60);

        toast.success("OTP has been sent to your email address.");
      }
    } catch (err: unknown) {
      console.error("Send OTP error:", err);
      const apiError = err as ApiError;
      toast(apiError?.data?.message || "An unknown error occurred");
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !otpSent && email) {
      handleSendOtp();
    }
  };

  const handleBack = () => {
    if (!otpSent) {
      router.back();
    } else if (otpSent && !otpVerified) {
      handleResetForm();
    } else if (otpVerified) {
      setOtpVerified(false);
    }
  };

  return (
    <div className="max-w-[463px] w-full px-[20px] lg:px-0 dark:text-white">
      <div className="mb-4 lg:mb-[100px] text-[#EE5A2C] text-[16px]">
        <Button
          variant="outline"
          className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
          onClick={handleBack}
        >
          <IoMdArrowBack />
          Back
        </Button>
      </div>

      <div className="lg:mr-[63px]">
        <h2 className="text-3xl lg:text-[52px] font-bold md:font-normal mb-5 mt-[40px] md:mt-0 lg:mb-[40px] text-center">
          {!otpSent ? "Forgot Password" :
            otpSent && !otpVerified ? "Verify Code" :
              "Password reset"}
        </h2>

        <div className="max-w-[384px]">
          {!otpSent ? (
            <>
              <p className="text-gray-600 mb-6 ml-2 text-[16px] text-center md:text-start">
                Don&apos;t worry! It happens. Please enter the email address associated with your account.
              </p>

              <form className="space-y-4 w-full ml-2" onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full rounded-full h-auto max-h-[63px] text-[16px] py-[18px] bg-[#EE5A2C] text-white md:rounded-md hover:bg-orange-800 transition mt-6"
                >
                  {isSendingOtp ? <ButtonLoader></ButtonLoader> : "Continue"}
                </Button>
              </form>
            </>
          ) : otpSent && !otpVerified && (
           <h1 className="text-center text-gray-500">Password Reset line has been sent to <span className="text-black">{email}</span>. Please check span folder too. </h1>
          )}
        </div>
      </div>
    </div>
  );
};