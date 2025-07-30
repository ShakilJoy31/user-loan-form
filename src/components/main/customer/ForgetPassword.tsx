"use client";

import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import resetImage from "@/assets/reset/change-password-success.gif";
import { useForgetPasswordMutation, useOtpGenerateForgetMutation, useVerifyOtpForgetMutation } from "@/redux/features/user/forgetPasswordApi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface ApiError {
  data?: {
    message?: string;
  };
}

export const ForgetPassword = () => {
  const router = useRouter();
  const [contactNo, setContactNo] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [resetSuccess, setResetSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const timerRef = useRef<number | null>(null);

  const [otpGenerateForget, { isLoading: isSendingOtp }] = useOtpGenerateForgetMutation();
  const [verifyOtpForget, { isLoading: isVerifyingOtp }] = useVerifyOtpForgetMutation();
  const [forgetPassword, { isLoading: isResetting }] = useForgetPasswordMutation();

  // Check for existing verification state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('forgetPasswordState');
    if (savedState) {
      const { contactNo, otpSent, otpVerified, expiry } = JSON.parse(savedState);
      const now = new Date().getTime();

      if (expiry > now) {
        setContactNo(contactNo);
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



  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const saveStateToStorage = (state: {
    contactNo: string;
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
    setContactNo("");
    setOtp("");
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
    if (!contactNo) {
      toast.error("Phone number is required");
      return;
    }

    // Check if phone number is exactly 11 digits
    if (!/^\d{11}$/.test(contactNo)) {
      toast("Phone number must be exactly 11 digits");
      return;
    }

    try {
      const response = await otpGenerateForget({ contactNo }).unwrap();
      if (response.success) {
        Cookies.set("otpForgetToken", response.token, { expires: 5 / 60 / 24 }); // 5 minutes
        setOtpSent(true);

        // Set OTP expiry time (2 minutes from now)
        const expiryTime = new Date().getTime() + 2 * 60 * 1000;
        saveStateToStorage({
          contactNo,
          otpSent: true,
          otpVerified: false,
          expiry: expiryTime
        });

        startTimer(2 * 60);

        toast.success("OTP has been sent to your phone number");
      }
    } catch (err: unknown) {
      console.error("Send OTP error:", err);
      const apiError = err as ApiError;
      toast(apiError?.data?.message || "An unknown error occurred");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) {
      const newOtp = otp.split('');
      newOtp[index] = value;
      const joinedOtp = newOtp.join('');
      setOtp(joinedOtp);

      // Auto focus to next input
      if (value && index < 5 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && otpInputRefs.current[index - 1]) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && otp.length === 6) {
      handleVerifyOtp();
    }
  };

  const handleVerifyOtp = async () => {
    const token = Cookies.get("otpForgetToken");
    if (!otp || otp.length !== 6 || !token) {
      toast("Please enter a valid 6-digit OTP");
      return;
    }

    if (timeLeft <= 0) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }

    try {
      const response = await verifyOtpForget({ token, otp }).unwrap();
      if (response.success) {
        // Update the token cookie with the new verified token
        Cookies.set("otpForgetToken", response.token, { expires: 10 / 60 / 24 }); // 10 minutes

        setOtpVerified(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        // Update state in storage
        saveStateToStorage({
          contactNo,
          otpSent: true,
          otpVerified: true,
          expiry: new Date().getTime() + 10 * 60 * 1000 // 10 minutes for password reset
        });

        toast.success("Your OTP has been verified");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  
  const handleResetPassword = async (e: React.FormEvent) => {
    console.log('I am called')
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const token = Cookies.get("otpForgetToken");

      const response = await forgetPassword({
        token,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response.success) {
        setResetSuccess(true);
        toast("Password reset successfully. You can now log in.");
        clearStateFromStorage();
        router.push("/login");
      }
    } catch (err) {
      console.error("Password reset error:", err);

      let errorMessage = "An unknown error occurred";

      // Check if it's an error with a message
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      // Check if it's your specific API error structure
      else if (typeof err === 'object' && err !== null && 'data' in err) {
        const apiError = err as { data: { message?: string } };
        if (apiError.data?.message) {
          errorMessage = apiError.data.message;
        }
      }

      toast(errorMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !otpSent && contactNo) {
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

  if (otpVerified && resetSuccess) {
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
            Go Back to Login
          </Button>
        </div>
      </div>
    );
  }

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
              <p className="text-gray-700 dark:text-gray-300 mb-6 ml-2 text-[16px] text-center md:text-start">
                Don&apos;t worry! It happens. Please enter the phone number associated with your account.
              </p>

              <form className="space-y-4 w-full ml-2" onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={contactNo}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setContactNo(value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full rounded-full h-auto max-h-[63px] text-[16px] py-[18px] bg-[#EE5A2C] text-white dark:border border-gray-300 md:rounded-md hover:bg-orange-800 transition mt-6"
                >
                  {isSendingOtp ? "Sending OTP..." : "Continue"}
                </Button>
              </form>
            </>
          ) : otpSent && !otpVerified ? (
            <form className="space-y-4 w-full ml-2" onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Please enter the code, just sent to phone number <br /> <span className="text-[#EE5A2C]">{contactNo}</span>
                  {timeLeft > 0 ? (
                    <div className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      OTP expires in: <span className="font-medium">{formatTime(timeLeft)}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="text-sm text-blue-600 hover:text-blue-800 ml-2 hover:cursor-pointer font-medium mt-2"
                    >
                      Resend OTP
                    </button>
                  )}
                </label>
                <div className="flex justify-between gap-2">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        if (el) {
                          otpInputRefs.current[i] = el;
                        }
                      }}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ""}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      required
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isVerifyingOtp || otp.length !== 6}
                className="w-full h-auto max-h-[63px] bg-[#EE5A2C] text-white text-[16px] py-[18px] md:rounded-md dark:border border-gray-300 rounded-full hover:bg-orange-800 transition mt-6"
              >
                {isVerifyingOtp ? "Verifying..." : "Verify"}
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-800 font-medium underline"
                >
                  Wrong number? Reset form
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-4 w-full ml-2" onSubmit={handleResetPassword}>
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
                  {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
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
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={isResetting}
                className="w-full h-auto max-h-[63px] bg-[#EE5A2C] text-white text-[16px] py-[18px] md:rounded-md rounded-full hover:bg-orange-800 transition mt-6"
              >
                {isResetting ? "Resetting..." : "Continue"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};