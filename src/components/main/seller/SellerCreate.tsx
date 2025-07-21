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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateSellerMutation,
  useGetAllAreasQuery,
  useGetAllCitiesQuery,
} from "@/redux/features/seller-auth/sellerLogin";
import {
  RegisterDataProps,
  registerSchema,
} from "@/schema/authSchema/sellerRegistrationSchema";
import toast from "react-hot-toast";
import { useGetAllCategoryQuery } from "@/redux/features/product/categoryApi";

interface Category {
  id: number;
  name: string;
}
interface City {
  id: number;
  name: string;
}
interface Area {
  id: number;
  cityId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  city: City;
}

const SellerCreate = () => {
  const { translate } = useCustomTranslator();
  const [activeTab, setActiveTab] = useState<"create" | "login">("create");
  const [currentStep, setCurrentStep] = useState<
    "shop" | "personal" | "verify" | "password"
  >("shop");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // API hooks
  const [createSeller, { isLoading }] = useCreateSellerMutation();
  const { data: citiesData } = useGetAllCitiesQuery({});
  const { data: areasData } = useGetAllAreasQuery({});
  const { data: categoriesData } = useGetAllCategoryQuery({});

  const cities = citiesData?.data || [];
  const areas = areasData?.data || [];
  const categories = categoriesData?.data || [];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<RegisterDataProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNo: "",
      companyInfo: {
        shopName: "",
        ownerName: "",
        designation: "",
        city: "",
        area: "",
        tradeLicense: "",
      },
      categories: [],
    },
    mode: "onChange",
  });

  const selectedCity = watch("companyInfo.city");
  const selectedCategories = watch("categories");
  const filteredCategories = categories.filter((category: Category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleCategorySelect = (categoryId: number) => {
    const currentCategories = watch("categories");
    if (currentCategories.includes(categoryId)) {
      setValue(
        "categories",
        currentCategories.filter((id) => id !== categoryId)
      );
    } else {
      setValue("categories", [...currentCategories, categoryId]);
    }
    setSearchTerm("");
    trigger("categories");
  };

  const removeCategory = (categoryId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(
      "categories",
      watch("categories").filter((id) => id !== categoryId)
    );
    trigger("categories");
  };

  const clearSelection = () => {
    setValue("categories", []);
    setSearchTerm("");
    inputRef.current?.focus();
    trigger("categories");
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleBack = () => {
    if (currentStep === "personal") setCurrentStep("shop");
    if (currentStep === "verify") setCurrentStep("personal");
    if (currentStep === "password") setCurrentStep("verify");
  };

  const handleResendCode = () => {
    alert(
      translate(
        "আপনার ফোন নম্বরে ভেরিফিকেশন কোড পুনরায় পাঠানো হয়েছে",
        "Verification code resent to your phone number"
      )
    );
  };

const onSubmit = async (data: RegisterDataProps) => {
  // Create a new object without confirmPassword
  const { confirmPassword, ...submitData } = data;
   console.log(confirmPassword)
  
  try {
    await createSeller(submitData).unwrap();
    toast.success(translate("নিবন্ধন সফল হয়েছে!", "Registration successful!"));
    reset();
    setCurrentStep("shop");
    setActiveTab("login");
  } catch (error) {
    console.error("Registration failed:", error);
    toast.error(translate("নিবন্ধন ব্যর্থ হয়েছে!", "Registration failed!"));
  }
};

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case "shop":
        return await trigger([
          "companyInfo.shopName",
          "companyInfo.ownerName",
          "companyInfo.designation",
          "companyInfo.city",
          "companyInfo.area",
          "categories",
        ]);
      case "personal":
        return await trigger(["name", "email", "contactNo"]);
      case "verify":
        return verificationCode.length === 5;
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
      case "shop":
        setCurrentStep("personal");
        break;
      case "personal":
        setCurrentStep("verify");
        break;
      case "verify":
        setCurrentStep("password");
        break;
    }
  };

  const isStepValid = async (step: typeof currentStep) => {
    const values = getValues();
    
    if (step === "shop") {
      return (
        values.companyInfo.shopName &&
        values.companyInfo.ownerName &&
        values.companyInfo.designation &&
        values.companyInfo.city &&
        values.companyInfo.area &&
        values.categories.length > 0
      );
    }
    
    if (step === "personal") {
      return values.name && values.email && values.contactNo;
    }
    
    if (step === "verify") {
      return verificationCode.length === 5;
    }
    
    return false;
  };

  console.log(isStepValid)

  return (
    <div className="max-w-[460px] w-full px-[20px] lg:px-0 dark:text-white">
      <div className="mb-4 lg:mb-[30px] text-[#EE5A2C] text-[16px]">
        {currentStep !== "shop" && (
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

                  <form className="space-y-4">
                    {/* Shop Name */}
                    <div>
                      <label
                        htmlFor="shopName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {translate("দোকানের নাম*", "Shop Name*")}
                      </label>
                      <input
                        id="shopName"
                        {...register("companyInfo.shopName")}
                        placeholder={translate(
                          "আপনার কোম্পানির নাম লিখুন",
                          "Enter your company name"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      />
                      {errors.companyInfo?.shopName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyInfo.shopName.message}
                        </p>
                      )}
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
                        id="ownerName"
                        {...register("companyInfo.ownerName")}
                        placeholder={translate(
                          "মালিকের নাম লিখুন",
                          "Enter owner name"
                        )}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                      />
                      {errors.companyInfo?.ownerName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyInfo.ownerName.message}
                        </p>
                      )}
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
                        {...register("companyInfo.designation")}
                        className="w-full dark:bg-black dark:text-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
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
                      {errors.companyInfo?.designation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyInfo.designation.message}
                        </p>
                      )}
                    </div>

                    {/* City and Area */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {translate("শহর*", "City*")}
                        </label>
                        <select
                          id="city"
                          {...register("companyInfo.city")}
                          className="w-full px-4 dark:bg-black dark:text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
                        >
                          <option value="">
                            {translate(
                              "একটি শহর নির্বাচন করুন",
                              "Select a city"
                            )}
                          </option>
                          {cities.map((city: City) => (
                            <option key={city.id} value={city.id}>
                              {translate(city.name, city.name)}
                            </option>
                          ))}
                        </select>
                        {errors.companyInfo?.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.companyInfo.city.message}
                          </p>
                        )}
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
                          {...register("companyInfo.area")}
                          disabled={!selectedCity}
                          className="w-full dark:bg-black dark:text-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            {translate(
                              "একটি এলাকা নির্বাচন করুন",
                              "Select an area"
                            )}
                          </option>
                          {areas
                            .filter(
                              (area: Area) =>
                                area.cityId.toString() === selectedCity ||
                                area.city.id.toString() === selectedCity
                            )
                            .map((area: Area) => (
                              <option key={area.id} value={area.id}>
                                {translate(area.name, area.name)}
                              </option>
                            ))}
                        </select>
                        {errors.companyInfo?.area && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.companyInfo.area.message}
                          </p>
                        )}
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
                        id="tradeLicense"
                        {...register("companyInfo.tradeLicense")}
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
                        {translate("দোকানের বিভাগ*", "Shop Category*")}
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
                              {selectedCategories.map((categoryId) => {
                                const category = categories.find(
                                  (c: { id: number }) => c.id === categoryId
                                );
                                return (
                                  <div
                                    key={categoryId}
                                    className="bg-gray-100 dark:bg-black dark:text-white px-2 py-1 rounded-md text-sm flex items-center justify-between"
                                  >
                                    <span className="truncate">
                                      {category
                                        ? translate(
                                            category.name,
                                            category.name
                                          )
                                        : ""}
                                    </span>
                                    <button
                                      onClick={(e) =>
                                        removeCategory(categoryId, e)
                                      }
                                      className="ml-1 text-gray-400 hover:text-gray-600"
                                    >
                                      <FiX size={14} />
                                    </button>
                                  </div>
                                );
                              })}
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
                            className="flex-1 min-w-[100px] outline-none bg-transparent"
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
                              filteredCategories.map((category: Category) => (
                                <div
                                  key={category.id}
                                  className={`px-4 py-2 cursor-pointer hover:dark:text-black hover:bg-gray-100 flex items-center ${
                                    selectedCategories.includes(category.id)
                                      ? "bg-gray-100"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleCategorySelect(category.id)
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                      category.id
                                    )}
                                    readOnly
                                    className="mr-2 h-4 w-4 text-[#EE5A2C] focus:ring-[#EE5A2C] border-gray-300 rounded"
                                  />
                                  <span
                                    className={
                                      selectedCategories.includes(category.id)
                                        ? "text-[#EE5A2C]"
                                        : ""
                                    }
                                  >
                                    {translate(category.name, category.name)}
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
                      {errors.categories && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.categories.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                      onClick={handleContinue}
                      disabled={isLoading}
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

            <div className="">
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
                    {...register("contactNo")}
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
                  disabled={isLoading}
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

                        if (e.target.value && index < 4) {
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
                  type="button"
                  className="w-full bg-[#EE5A2C] text-white h-auto max-h-[63px] py-[18px] rounded-full md:rounded-md hover:bg-orange-800 transition mt-6"
                  onClick={handleContinue}
                  disabled={verificationCode.length !== 5 || isLoading}
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
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
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
                  disabled={isLoading}
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