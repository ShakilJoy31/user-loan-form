"use client";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { CustomerLogin } from "./CustomerLogin";
import { FcGoogle } from "react-icons/fc";

const CustomerCreate = () => {
  const [activeTab, setActiveTab] = useState<"create" | "login">("create");
  const [currentStep, setCurrentStep] = useState<"personal" | "verify" | "password">("personal");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showOTPField, setShowOTPField] = useState(false);



const handlePersonalDetailsSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!showOTPField) {
    // First step: collect personal details
    const form = e.target as HTMLFormElement;
    setPersonalDetails({
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    });
    setShowOTPField(true);
  } else {
    // Second step: verify OTP
    // Here you would typically verify the OTP with your backend
    // For now, we'll just assume it's valid and proceed
    if (verificationCode.length === 5) { // assuming 5-digit OTP
      setCurrentStep("password");
    } else {
      alert(translate("অনুগ্রহ করে একটি বৈধ ওটিপি লিখুন", "Please enter a valid OTP"));
    }
  }
};

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      alert(translate("পাসওয়ার্ড মেলে না!", "Passwords don't match!"));
      return;
    }

    // Submit all data to your backend
    const completeData = {
      ...personalDetails,
      password: password.newPassword,
    };
    console.log("Complete registration data:", completeData);

    // Reset form and redirect to login
    alert(translate("নিবন্ধন সফল হয়েছে!", "Registration successful!"));
    setActiveTab("login");
    setCurrentStep("personal");
    setShowOTPField(false);
  };

  const handleBack = () => {
    if (currentStep === "verify") {
      setCurrentStep("personal");
    } else if (currentStep === "password") {
      setCurrentStep("verify");
    }
  };

  const handleResendCode = () => {
    // Implement resend OTP logic here
    alert(
      translate(
        "আপনার ফোন নম্বরে ভেরিফিকেশন কোড পুনরায় পাঠানো হয়েছে",
        "Verification code resent to your phone number"
      )
    );
  };

  const { translate } = useCustomTranslator();

  return (
    <div className="max-w-[460px] w-full px-[20px] lg:px-0  dark:text-white">
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
                  className={`px-6 py-3 rounded-md transition ${
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

                  <form className="space-y-4" onSubmit={handlePersonalDetailsSubmit}>
                    {/* Username */}
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("ব্যবহারকারীর নাম*", "Username*")}
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder={translate(
                          "আপনার ব্যবহারকারীর নাম লিখুন",
                          "Enter your username"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      />
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
                        type="email"
                        id="email"
                        name="email"
                        placeholder={translate(
                          "আপনার ইমেইল লিখুন",
                          "Enter your email"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("ফোন নম্বর*", "Phone Number*")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder={translate(
                          "আপনার ফোন নম্বর লিখুন",
                          "Enter your phone number"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      />
                    </div>

                    {/* OTP Verification (shown after submitting personal details) */}
                    {showOTPField && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {translate("ওটিপি নম্বর লিখুন", "Enter OTP Number")}
                          </label>
                          <div className="flex justify-between gap-2 w-full">
                            {[0, 1, 2, 3, 4].map((index) => (
                              <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={verificationCode[index] || ""}
                                onChange={(e) => {
                                  const newCode = verificationCode.split("");
                                  newCode[index] = e.target.value.replace(/\D/g, "");
                                  setVerificationCode(newCode.join(""));

                                  // Auto focus to next input if a digit was entered
                                  if (e.target.value && index < 4) {
                                    const nextInput = document.getElementById(
                                      `code-input-${index + 1}`
                                    );
                                    if (nextInput) nextInput.focus();
                                  }
                                }}
                                onKeyDown={(e) => {
                                  // Handle backspace to move to previous input
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
                          <div className=" mt-2">
                            <button
                              type="button"
                              className="text-[#EE5A2C] hover:underline  gap-1 "
                              onClick={handleResendCode}
                            >
                              {translate("কোড পাইনি?", "Didn't receive a code?")}{" "}
                              {translate("আবার পাঠান", "Resend Code")}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                    >
                      {showOTPField 
                        ? translate("ওটিপি যাচাই করুন", "Verify OTP") 
                        : translate("চালিয়ে যান", "Continue")}
                    </Button>
                  </form>

                  <div className="text-[14px] mt-[16px] mb-[20px] lg:mb-[40px]">
                    <p className="text-gray-300">Already have an account? <span className="text-[#EE5A2C]">Log in</span></p>
                  </div>

                    <div className="hidden md:block">
                      <div className="text-gray-300 flex justify-between items-center mt-[35px] ">
                        <hr className="w-[30%] border border-gray-300" />
                        <p className="text-[14px]">Or Sign in with</p>
                        <hr className="w-[30%] border border-gray-300" />
                      </div>
                    </div>
                  
                     <div className="hidden md:block">
                       <div className="flex justify-center mt-5 lg:mt-10 w-full ">
                          <Button variant={"outline"} className="w-full py-[18px]">
                              <FcGoogle /> 
                              <span className="ml-1 text-[16px] font-normal">Sign Up with Google</span>
                          </Button>
                      </div>
                     </div>
                </>
              ) : (
                <CustomerLogin />
              )}
            </div>
          </>
        ) : currentStep === "password" ? (
          <div className="max-w-[400px]">
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {translate("পাসওয়ার্ড তৈরি করুন", "Create Password")}
            </h2>

            <div>
              <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                {/* New Password */}
                <div className="relative">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {translate("পাসওয়ার্ড তৈরি করুন*", "Create Password*")}
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword({ ...password, newPassword: e.target.value })
                    }
                    placeholder={translate(
                      "অন্তত ৬টি অক্ষর হতে হবে",
                      "Must be 6 characters"
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    {translate(
                      "অন্তত ৬টি অক্ষর হতে হবে",
                      "Must be at least 6 characters"
                    )}
                  </p>
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
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={password.confirmPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder={translate(
                      "পাসওয়ার্ড পুনরায় লিখুন",
                      "Repeat Password"
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] pr-10"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                >
                  {translate("সাইন ইন", "Sign In")}
                </Button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerCreate;