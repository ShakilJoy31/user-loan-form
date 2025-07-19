"use client";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiEyeOff,
  FiX,
} from "react-icons/fi";
import { SellerLogin } from "./SellerLogin";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const SellerCreate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"create" | "login">("create");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [currentStep, setCurrentStep] = useState<
    "shop" | "personal" | "verify" | "password"
  >("shop");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    designation: "",
    tradeLicense: "",
  });
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Position & Accessories",
    "Grocery",
    "Electronics & Appliances",
    "Home Docs",
    "Glucosilon & Radiomery",
    "Pharmacy",
    "Mobile & Limited",
    "Bus",
    "Dimensions",
  ];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSelection = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setSearchTerm("");
  };

  const removeCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const handleShopDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setFormData({
      shopName: (form.elements.namedItem("shopName") as HTMLInputElement).value,
      ownerName: (form.elements.namedItem("ownerName") as HTMLInputElement)
        .value,
      designation: (form.elements.namedItem("designation") as HTMLSelectElement)
        .value,
      tradeLicense: (
        form.elements.namedItem("tradeLicense") as HTMLInputElement
      ).value,
    });
    setCurrentStep("personal");
  };

  const handlePersonalDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setPersonalDetails({
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    });
    setCurrentStep("verify");
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the code with your backend
    setCurrentStep("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      alert(translate("পাসওয়ার্ড মেলে না!", "Passwords don't match!"));
      return;
    }

    // Here you would typically submit all data to your backend
    const completeData = {
      ...formData,
      city: selectedCity,
      area: selectedArea,
      categories: selectedCategories,
      ...personalDetails,
      password: password.newPassword,
    };
    console.log("Complete registration data:", completeData);

    // Reset form or redirect
    alert(translate("নিবন্ধন সফল হয়েছে!", "Registration successful!"));
    setCurrentStep("shop");
    setActiveTab("login");
  };

  const handleBack = () => {
    if (currentStep === "personal") setCurrentStep("shop");
    if (currentStep === "verify") setCurrentStep("personal");
    if (currentStep === "password") setCurrentStep("verify");
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
        <Button
          variant="outline"
          className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
          onClick={handleBack}
        >
          <IoMdArrowBack />
          {translate("পিছনে", "Back")}
        </Button>
      </div>

      <div className="px-[30px]">
        {currentStep === "shop" ? (
          <>
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {activeTab === "create"
                ? translate(
                    "বিক্রেতা অ্যাকাউন্ট তৈরি করুন",
                    "Create Seller account"
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
                      "আপনার তথ্য নিচে পূরণ করুন বা আপনার অ্যাকাউন্ট দিয়ে নিবন্ধন করুন",
                      "Fill your information below or register with your account."
                    )}
                  </p>

                  <form
                    className="space-y-4"
                    onSubmit={handleShopDetailsSubmit}
                  >
                    {/* Shop Name */}
                    <div>
                      <label
                        htmlFor="shopName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("দোকানের নাম*", "Shop Name*")}
                      </label>
                      <input
                        type="text"
                        id="shopName"
                        name="shopName"
                        placeholder={translate(
                          "আপনার কোম্পানির নাম লিখুন",
                          "Enter your company name"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      />
                    </div>

                    {/* Owner Name */}
                    <div>
                      <label
                        htmlFor="ownerName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("মালিকের নাম*", "Owner Name*")}
                      </label>
                      <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        placeholder={translate(
                          "মালিকের নাম লিখুন",
                          "Enter owner name"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      />
                    </div>

                    {/* Designation */}
                    <div>
                      <label
                        htmlFor="designation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("পদবী*", "Designation*")}
                      </label>
                      <select
                        id="designation"
                        name="designation"
                        className="w-full dark:bg-black dark:text-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        required
                      >
                        <option value="">
                          {translate(
                            "পদবী নির্বাচন করুন",
                            "Select designation"
                          )}
                        </option>
                        <option value="Director">
                          {translate("পরিচালক", "Director")}
                        </option>
                        <option value="Manager">
                          {translate("ম্যানেজার", "Manager")}
                        </option>
                        <option value="Owner">
                          {translate("মালিক", "Owner")}
                        </option>
                      </select>
                    </div>

                    {/* City and Area */}
                    <div className="flex flex-col sm:flex-row gap-4 dark:bg-black dark:text-white">
                      <div className="w-full sm:w-1/2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {translate("শহর*", "City*")}
                        </label>
                        <select
                          id="city"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full px-4 dark:bg-black dark:text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                          required
                        >
                          <option value="">
                            {translate(
                              "একটি শহর নির্বাচন করুন",
                              "Select a city"
                            )}
                          </option>
                          <option value="Dhaka">
                            {translate("ঢাকা", "Dhaka")}
                          </option>
                          <option value="Rajshahi">
                            {translate("রাজশাহী", "Rajshahi")}
                          </option>
                          <option value="Khulna">
                            {translate("খুলনা", "Khulna")}
                          </option>
                        </select>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          htmlFor="area"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {translate("এলাকা*", "Area*")}
                        </label>
                        <select
                          id="area"
                          value={selectedArea}
                          onChange={(e) => setSelectedArea(e.target.value)}
                          disabled={!selectedCity}
                          className="w-full dark:bg-black dark:text-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        >
                          <option value="">
                            {translate(
                              "একটি এলাকা নির্বাচন করুন",
                              "Select an area"
                            )}
                          </option>
                          {selectedCity === "Dhaka" && (
                            <>
                              <option value="Mirpur">
                                {translate("মিরপুর", "Mirpur")}
                              </option>
                              <option value="Dhanmondi">
                                {translate("ধানমন্ডি", "Dhanmondi")}
                              </option>
                              <option value="Gulshan">
                                {translate("গুলশান", "Gulshan")}
                              </option>
                            </>
                          )}
                          {selectedCity === "Rajshahi" && (
                            <>
                              <option value="Shaheb Bazar">
                                {translate("সাহেব বাজার", "Shaheb Bazar")}
                              </option>
                              <option value="Boalia">
                                {translate("বোয়ালিয়া", "Boalia")}
                              </option>
                            </>
                          )}
                          {selectedCity === "Khulna" && (
                            <>
                              <option value="Khalishpur">
                                {translate("খালিশপুর", "Khalishpur")}
                              </option>
                              <option value="Sonadanga">
                                {translate("সোনাডাঙ্গা", "Sonadanga")}
                              </option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Trade License */}
                    <div>
                      <label
                        htmlFor="tradeLicense"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate(
                          "ট্রেড লাইসেন্স (ঐচ্ছিক)",
                          "Trade License (optional)"
                        )}
                      </label>
                      <input
                        type="text"
                        id="tradeLicense"
                        name="tradeLicense"
                        placeholder={translate(
                          "ট্রেড লাইসেন্স লিখুন",
                          "Enter Trade License"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      />
                    </div>

                    {/* Shop Category */}
                    <div className="relative" ref={dropdownRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {translate("দোকানের বিভাগ", "Shop Category")}
                      </label>
                      <div className="relative">
                        <div
                          ref={inputRef}
                          className="w-full min-h-[42px] px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex flex-wrap gap-2 items-center"
                          onClick={handleInputClick}
                        >
                          {selectedCategories.length === 0 ? (
                            <span className="text-gray-400">
                              {translate(
                                "দোকানের বিভাগ নির্বাচন করুন",
                                "Select Shop Category"
                              )}
                            </span>
                          ) : (
                            <div className="grid grid-cols-3 gap-2 dark:bg-black dark:text-white">
                              {selectedCategories.map((category) => (
                                <div
                                  key={category}
                                  className="bg-gray-100 dark:bg-black dark:text-white px-2 py-1 rounded-md text-sm flex items-center justify-between"
                                >
                                  <span className="truncate">{category}</span>
                                  <button
                                    onClick={(e) => removeCategory(category, e)}
                                    className="ml-1 text-gray-400 hover:text-gray-600"
                                  >
                                    <FiX size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <input
                            type="text"
                            value={isOpen ? searchTerm : ""}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              if (!isOpen) setIsOpen(true);
                            }}
                            onFocus={() => {
                              if (!isOpen) setIsOpen(true);
                            }}
                            className="flex-1 min-w-[100px] outline-none bg-transparent "
                            placeholder={
                              selectedCategories.length === 0 ? "" : ""
                            }
                          />
                        </div>
                        <div className="absolute dark:bg-black dark:text-white right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          {selectedCategories.length > 0 && !isOpen && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                clearSelection();
                              }}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label={translate(
                                "নির্বাচন পরিষ্কার করুন",
                                "Clear selection"
                              )}
                            >
                              <FiX size={18} />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(!isOpen);
                              inputRef.current?.focus();
                            }}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label={translate(
                              "ড্রপডাউন টগল করুন",
                              "Toggle dropdown"
                            )}
                          >
                            {isOpen ? (
                              <FiChevronUp size={20} />
                            ) : (
                              <FiChevronDown size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="absolute dark:bg-black dark:text-white z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                          <div className="py-1">
                            {filteredCategories.length > 0 ? (
                              filteredCategories.map((category) => (
                                <div
                                  key={category}
                                  className={`px-4 py-2 cursor-pointer  hover:dark:text-black hover:bg-gray-100 flex items-center ${
                                    selectedCategories.includes(category)
                                      ? "bg-gray-100"
                                      : ""
                                  }`}
                                  onClick={() => handleCategorySelect(category)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                      category
                                    )}
                                    readOnly
                                    className="mr-2 h-4 w-4 text-[#EE5A2C] focus:ring-[#EE5A2C] border-gray-300 rounded"
                                  />
                                  <span
                                    className={
                                      selectedCategories.includes(category)
                                        ? "text-[#EE5A2C]"
                                        : ""
                                    }
                                  >
                                    {category}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-gray-500 dark:bg-black dark:text-white">
                                {searchTerm
                                  ? translate(
                                      "কোন বিভাগ পাওয়া যায়নি",
                                      "No categories found"
                                    )
                                  : translate(
                                      "অনুসন্ধান করতে টাইপ করুন",
                                      "Start typing to search"
                                    )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                    >
                      {translate("চালিয়ে যান", "Continue")}
                    </Button>
                  </form>
                </>
              ) : (
                <SellerLogin />
              )}
            </div>
          </>
        ) : currentStep === "personal" ? (
          <div className="max-w-[400px]">
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {translate("আপনার বিবরণ লিখুন", "Enter Your Details")}
            </h2>

            <div className=" ">
              <form
                className="space-y-4"
                onSubmit={handlePersonalDetailsSubmit}
              >
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

                <Button
                  type="submit"
                  className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                >
                  {translate("চালিয়ে যান", "Continue")}
                </Button>
              </form>
            </div>
          </div>
        ) : currentStep === "verify" ? (
          <div className="max-w-[400px]">
            <h2 className="text-3xl lg:text-[36px] font-normal mb-5 lg:mb-[40px] text-center">
              {translate("কোড যাচাই করুন", "Verify Code")}
            </h2>

            <div>
              <form className="space-y-6" onSubmit={handleVerificationSubmit}>
                <p className="text-gray-600 text-center">
                  {translate(
                    "আপনার ফোন নম্বরে পাঠানো ভেরিফিকেশন কোডটি লিখুন",
                    "Please enter the verification code sent to"
                  )}
                  <br />
                  <span className="font-medium">
                    {personalDetails.phone ||
                      translate("আপনার ফোন নম্বর", "your phone number")}
                  </span>
                </p>

                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={verificationCode[index] || ""}
                      onChange={(e) => {
                        const newCode = verificationCode.split("");
                        newCode[index] = e.target.value.replace(/\D/g, ""); // Only allow numbers
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

                {verificationCode.length === 5 && (
                  <p className="text-red-500 text-center">
                    {translate(
                      "ভুল কোড, আবার চেষ্টা করুন",
                      "Wrong code, please try again"
                    )}
                  </p>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    className="text-[#EE5A2C] hover:underline flex items-center justify-center gap-1 mx-auto"
                    onClick={handleResendCode}
                  >
                    {translate("আবার কোড পাঠান", "Send code again")}{" "}
                    <span className="text-gray-500">00:20</span>
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                >
                  {translate("চালিয়ে যান", "Continue")}
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
                  {translate("নিবন্ধন সম্পূর্ণ করুন", "Complete Registration")}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerCreate;
