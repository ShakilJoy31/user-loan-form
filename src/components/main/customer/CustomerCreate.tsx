"use client";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { CustomerLogin } from "./CustomerLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerRegisterSchema } from "@/schema/authSchema/customerRegistrationSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { useCreateCustomerRegisterMutation, useOtpGenerateMutation,  } from "@/redux/features/user/userApi";
import { useVerifyOtpForgetMutation } from "@/redux/features/user/forgetPasswordApi";

type CustomerRegisterDataProps = z.infer<typeof customerRegisterSchema>;

const CustomerCreate = () => {
  const { translate } = useCustomTranslator();
  const [activeTab, setActiveTab] = useState<"login" | "create">("login");
  const [currentStep, setCurrentStep] = useState<"personal" | "verify" | "password">("personal");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpToken, setOtpToken] = useState(""); // Added token state

  // API hooks
  const [createCustomer, { isLoading: isRegistering }] = useCreateCustomerRegisterMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useOtpGenerateMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpForgetMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<CustomerRegisterDataProps>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNo: "",
    },
    mode: "onChange",
  });

  const handleBack = () => {
    if (currentStep === "verify") {
      setCurrentStep("personal");
      setOtpSent(false);
      setVerificationCode("");
      setOtpError("");
    } else if (currentStep === "password") {
      setCurrentStep("verify");
    }
  };

  const handleResendCode = async () => {
    const contactNo = getValues("contactNo");
    if (!contactNo) return;

    try {
      const response = await sendOtp({ contactNo }).unwrap();
      setOtpToken(response.token); // Store the token from response
      toast.success(translate("OTP পুনরায় পাঠানো হয়েছে", "OTP resent successfully"));
      startCountdown();
    } catch (error) {
      console.log(error)
      toast.error(translate("OTP পাঠানো ব্যর্থ হয়েছে", "Failed to resend OTP"));
    }
  };

  const startCountdown = () => {
    setCountdown(120); // 2 minutes
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (data: CustomerRegisterDataProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...submitData } = data;
    
    try {
      await createCustomer(submitData).unwrap();
      toast.success(translate("নিবন্ধন সফল হয়েছে!", "Registration successful!"));
      reset();
      setCurrentStep("personal");
      setVerificationCode("");
      setActiveTab("login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(translate("নিবন্ধন ব্যর্থ হয়েছে!", "Registration failed!"));
    }
  };

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case "personal":
        return await trigger(["name", "email", "contactNo"]);
      case "verify":
        return verificationCode.length === 6; // Changed to 6 digits
      case "password":
        return await trigger(["password", "confirmPassword"]);
      default:
        return false;
    }
  };

  const handleContinue = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    switch (currentStep) {
      case "personal":
        try {
          const contactNo = getValues("contactNo");
          const response = await sendOtp({ contactNo }).unwrap();
          setOtpToken(response.token); // Store the token from response
          setOtpSent(true);
          startCountdown();
          setCurrentStep("verify");
          toast.success(translate("OTP পাঠানো হয়েছে", "OTP sent successfully"));
        } catch (error) {
          console.log(error)
          toast.error(translate("OTP পাঠানো ব্যর্থ হয়েছে", "Failed to send OTP"));
        }
        break;
      case "verify":
        try {
           getValues("contactNo");
          await verifyOtp({ token: otpToken, otp: verificationCode }).unwrap();
          setCurrentStep("password");
          setOtpError("");
        } catch (error) {
          console.log(error)
          setOtpError(translate("ভুল OTP, আবার চেষ্টা করুন", "Invalid OTP, please try again"));
        }
        break;
    }
  };
  

  const isStepValid = async (step: typeof currentStep) => {
    const values = getValues();
    
    if (step === "personal") {
      return values.name && values.email && values.contactNo;
    }
    
    if (step === "verify") {
      return verificationCode.length === 6; // Changed to 6 digits
    }
    
    return false;
  };
  console.log(isStepValid)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-[460px] w-full px-[20px] lg:px-0 dark:text-white">
      <div className="mb-4 lg:mb-[30px] text-[#EE5A2C] text-[16px]">
        {currentStep !== "personal" && (
          <Button
            variant="outline"
            className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
            onClick={handleBack}
          >
            <IoMdArrowBack />
            {translate("পিছনে", "Back")}
          </Button>
        )}
      </div>

      <div className="md:px-[30px]">
        {currentStep === "personal" ? (
          <>
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {activeTab === "create"
                ? translate(
                    "ব্যক্তিগত অ্যাকাউন্ট তৈরি করুন",
                    "Create personal account"
                  )
                : translate(
                    "আপনার অ্যাকাউন্টে লগইন করুন",
                    "Login to your account"
                  )}
            </h2>

            <div className="max-w-[400px]">
              <div className="flex max-w-[330px] mx-auto mb-6 p-1 rounded-md bg-[#fdefea]">
                <Button
                  onClick={() => setActiveTab("create")}
                  className={`px-6 py-3 rounded-md mr-1 transition ${
                    activeTab === "create"
                      ? "bg-[#EE5A2C] text-white shadow-sm"
                      : "bg-transparent text-gray-400 hover:bg-transparent"
                  }`}
                >
                  {translate("অ্যাকাউন্ট তৈরি করুন", "Create Account")}
                </Button>

                <Button
                  onClick={() => setActiveTab("login")}
                  className={`px-6 py-3 rounded-md w-full transition ${
                    activeTab === "login"
                      ? "bg-[#EE5A2C] text-white shadow-sm"
                      : "bg-transparent text-gray-400 hover:bg-transparent"
                  }`}
                >
                  {translate("লগ ইন", "Log in")}
                </Button>
              </div>

              {activeTab === "create" ? (
                <>
                  <p className="text-gray-600 mb-6 text-center">
                    {translate(
                      "আপনার তথ্য নিচে পূরণ করুন",
                      "Fill in your details below"
                    )}
                  </p>

                  <form className="space-y-4">
                    {/* Username */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("ব্যবহারকারীর নাম*", "Username*")}
                      </label>
                      <input
                        id="name"
                        {...register("name")}
                        placeholder={translate(
                          "আপনার ব্যবহারকারীর নাম লিখুন",
                          "Enter your username"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("ইমেইল*", "Email*")}
                      </label>
                      <input
                        id="email"
                        {...register("email")}
                        placeholder={translate(
                          "আপনার ইমেইল লিখুন",
                          "Enter your email"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contactNo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("ফোন নম্বর*", "Phone Number*")}
                      </label>
                      <input
                        id="contactNo"
                        {...register("contactNo", {
      maxLength: {
        value: 11,
        message: translate(
          "ফোন নম্বর সর্বোচ্চ ১১ ডিজিট হতে পারে",
          "Phone number must be at most 11 digits"
        )
      }
    })}
                        placeholder={translate(
                          "আপনার ফোন নম্বর লিখুন",
                          "Enter your phone number"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      />
                      {errors.contactNo && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contactNo.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                      onClick={handleContinue}
                      disabled={isSendingOtp}
                    >
                      {isSendingOtp 
                        ? translate("পাঠানো হচ্ছে...", "Sending...") 
                        : translate("চালিয়ে যান", "Continue")}
                    </Button>
                  </form>
                </>
              ) : (
                <CustomerLogin setActiveTab={setActiveTab} />
              )}
            </div>
          </>
        ) : currentStep === "verify" ? (
          <div className="max-w-[400px]">
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {translate("কোড যাচাই করুন", "Verify Code")}
            </h2>

            <div>
              <form className="space-y-6">
                <p className="text-gray-600 text-center">
                  {translate(
                    "আপনার ফোন নম্বরে পাঠানো ভেরিফিকেশন কোডটি লিখুন",
                    "Please enter the verification code sent to"
                  )}
                  <br />
                  <span className="font-medium">{watch("contactNo")}</span>
                </p>

                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => ( // Changed to 6 inputs
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={verificationCode[index] || ""}
                      onChange={(e) => {
                        const newCode = verificationCode.split("");
                        newCode[index] = e.target.value.replace(/\D/g, "");
                        setVerificationCode(newCode.join(""));

                        if (e.target.value && index < 5) { // Changed to 5
                          const nextInput = document.getElementById(
                            `code-input-${index + 1}`
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !verificationCode[index] &&
                          index > 0
                        ) {
                          const prevInput = document.getElementById(
                            `code-input-${index - 1}`
                          );
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      id={`code-input-${index}`}
                      className="w-12 h-12 px-2 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      required
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-red-500 text-center">{otpError}</p>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    className="text-[#EE5A2C] hover:underline flex items-center justify-center gap-1 mx-auto"
                    onClick={handleResendCode}
                    disabled={countdown > 0 || isSendingOtp}
                  >
                    {translate("আবার কোড পাঠান", "Send code again")}{" "}
                    {countdown > 0 && (
                      <span className="text-gray-500">({formatTime(countdown)})</span>
                    )}
                  </button>
                </div>

                <Button
                  type="button"
                  className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                  onClick={handleContinue}
                  disabled={verificationCode.length !== 6 || isVerifyingOtp} // Changed to 6
                >
                  {isVerifyingOtp 
                    ? translate("যাচাই করা হচ্ছে...", "Verifying...") 
                    : translate("চালিয়ে যান", "Continue")}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-[400px]">
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {translate("পাসওয়ার্ড তৈরি করুন", "Create Password")}
            </h2>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* New Password */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {translate("পাসওয়ার্ড তৈরি করুন*", "Create Password*")}
                  </label>
                  <input
                    id="password"
                    type={showNewPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder={translate(
                      "অন্তত ৬টি অক্ষর হতে হবে",
                      "Must be 6 characters"
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FiEye size={18} />
                    ) : (
                      <FiEyeOff size={18} />
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    {translate(
                      "অন্তত ৬টি অক্ষর হতে হবে",
                      "Must be at least 6 characters"
                    )}
                  </p>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {translate("পাসওয়ার্ড নিশ্চিত করুন*", "Confirm Password*")}
                  </label>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder={translate(
                      "পাসওয়ার্ড পুনরায় লিখুন",
                      "Repeat Password"
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEye size={18} />
                    ) : (
                      <FiEyeOff size={18} />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                  disabled={isRegistering}
                >
                  {isRegistering
                    ? translate("প্রক্রিয়াকরণ...", "Processing...")
                    : translate("নিবন্ধন সম্পূর্ণ করুন", "Complete Registration")}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCreate;