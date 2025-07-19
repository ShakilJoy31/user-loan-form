"use client";

import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import resetImage from "@/assets/reset/Screenshot 2025-07-19 103010.png"

export const ForgetPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    if (step === "email") {
      router.back();
    } else if (step === "verify") {
      setStep("email");
    } else if (step === "reset") {
      setStep("verify");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("verify");
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length === 5) {
      setStep("reset");
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="max-w-[463px] w-full px-[20px] lg:px-0 mx-auto text-center  dark:text-white">
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
          className="w-full rounded-full lg:max-w-[400px] h-auto max-h-[63px] py-[18px] text-[16px]  bg-[#EE5A2C] text-white  md:rounded-md hover:bg-orange-800 transition"
        >
          Go Back to Login
        </Button>
      </div>
      </div>
    );
  }

  return (
    <div className="max-w-[463px] w-full px-[20px] lg:px-0  dark:text-white">
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
          {step === "email" ? "Forgot Password" : 
           step === "verify" ? "Verify Code" : 
           "Password reset"}
        </h2>

        <div className="max-w-[384px]">
          {step === "email" ? (
            <>
              <p className="text-gray-600 mb-6 ml-2 text-[16px] text-center md:text-start">
                Don’t worry! It happens. Please enter the email associated with your account.
              </p>

              <form className="space-y-4 w-full ml-2" onSubmit={handleEmailSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full h-auto max-h-[63px] text-[16px] py-[18px] bg-[#EE5A2C] text-white md:rounded-md hover:bg-orange-800 transition mt-6"
                >
                  Continue
                </Button>
              </form>
            </>
          ) : step === "verify" ? (
            <>

              <form className="space-y-4 w-full ml-2" onSubmit={handleVerifyCode}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                   Please enter the code, just sent to email <br /> <span className="text-[#EE5A2C]">{email}</span>
                  </label>
                  <div className="flex justify-between gap-2">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={verificationCode[i] || ""}
                        onChange={(e) => {
                          const newCode = verificationCode.split("");
                          newCode[i] = e.target.value.replace(/\D/g, "");
                          setVerificationCode(newCode.join(""));
                          if (e.target.value && i < 4) {
                            const nextInput = document.getElementById(`code-input-${i + 1}`);
                            if (nextInput) nextInput.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !verificationCode[i] && i > 0) {
                            const prevInput = document.getElementById(`code-input-${i - 1}`);
                            if (prevInput) prevInput.focus();
                          }
                        }}
                        id={`code-input-${i}`}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-auto max-h-[63px] bg-[#EE5A2C] text-white text-[16px] py-[18px] md:rounded-md rounded-full hover:bg-orange-800 transition mt-6"
                >
                  Verify
                </Button>
              </form>
            </>
          ) : (
            <>

              <form className="space-y-4 w-full ml-2" onSubmit={handlePasswordReset}>
                <div className="relative">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Create Password*
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={password.newPassword}
                    onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={password.confirmPassword}
                    onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
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
                  className="w-full h-auto max-h-[63px] bg-[#EE5A2C] text-white text-[16px] py-[18px] md:rounded-md rounded-full hover:bg-orange-800 transition mt-6"
                >
                  Continue
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};