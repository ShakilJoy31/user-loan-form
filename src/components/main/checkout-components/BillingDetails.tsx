"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import collectionBanner from "@/assets/Logo/payment-icons.png";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import toast from "react-hot-toast";

interface FormData {
  addressOption: string;
  addressLine1: string;
  city: string;
  zone: string;
  country: string;
  area: string;
  paymentMethod: string;
  promoCode: string;
  note: string;
}

const initialFormData: FormData = {
  addressOption: "new",
  addressLine1: "",
  city: "",
  zone: "",
  country: "",
  area: "",
  paymentMethod: "cash",
  promoCode: "",
  note: "",
};

const BillingAndPayment = () => {
  const { translate } = useCustomTranslator();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Reset form after submission
    setFormData(initialFormData);

    toast.success(
      translate(
        "আপনার অর্ডার সফলভাবে জমা হয়েছে",
        "Your order has been submitted successfully"
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          {translate("বিলিং বিবরণ", "Billing Details")}
        </h2>

        {/* Checkout Options */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            {translate("চেকআউট অপশন", "Checkout Options")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="addressOption"
                value="existing"
                checked={formData.addressOption === "existing"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              {translate(
                "আমি একটি বিদ্যমান ঠিকানা ব্যবহার করতে চাই",
                "I want to use an existing address"
              )}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="addressOption"
                value="new"
                checked={formData.addressOption === "new"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              {translate(
                "আমি নতুন ঠিকানা ব্যবহার করতে চাই",
                "I want to use new address"
              )}
            </label>
          </div>
        </div>

        {/* Address Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
            >
              <option value="" disabled>
                {translate("শহর*", "City*")}
              </option>
              <option value="dhaka">{translate("ঢাকা", "Dhaka")}</option>
              <option value="ctg">
                {translate("চট্টগ্রাম", "Chattogram")}
              </option>
            </select>

            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleInputChange}
              placeholder={translate("জোন", "Zone")}
              className="w-full border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
            >
              <option value="" disabled>
                {translate("এলাকা", "Area")}
              </option>
              <option value="uttara">{translate("উত্তরা", "Uttara")}</option>
              <option value="mirpur">{translate("মিরপুর", "Mirpur")}</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
            <textarea
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            placeholder={translate("ঠিকানা লাইন ১", "Address Line 1")}
            className="w-full border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            rows={3}
          />
        </div>

        {/* Shipping Method */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">
            {translate("শিপিং পদ্ধতি", "Shipping Method")}
          </p>
          <div className="flex items-center gap-2 bg-[#E8F1F8] border border-blue-100 px-4 py-3 rounded-md max-w-[425px] ">
            <input type="radio" checked readOnly className="accent-red-500" />
            <span className="text-sm text-[#EE5A2C] font-medium">
              {translate("ঢাকার বাইরে শিপিং", "Shipping out side Dhaka")}
            </span>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 mt-[60px]">
          {translate("পেমেন্ট পদ্ধতি", "Payment Method")}
        </h2>

        {/* Payment Options */}
        <div className="border border-gray-300 rounded-md p-4 mb-6 max-w-[740px] ">
          <p className="text-sm text-gray-600 mb-4">
            {translate(
              "এই অর্ডারে ব্যবহারের জন্য পছন্দসই পেমেন্ট পদ্ধতি নির্বাচন করুন।",
              "Please select the preferred payment method to use on this order."
            )}
          </p>
          <div className="space-y-3 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              {translate("ক্যাশ অন ডেলিভারি", "Cash On Delivery")}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={formData.paymentMethod === "upi"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              UPI
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={formData.paymentMethod === "bank"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              {translate("ব্যাংক ট্রান্সফার", "Bank Transfer")}
            </label>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="border border-gray-300 rounded-md p-4 mb-6 max-w-[584px] h-[121px] ">
          <p className="text-sm font-semibold mb-3">
            {translate("পেমেন্ট পদ্ধতি", "Payment Method")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Image
              width={300}
              height={300}
              src={collectionBanner}
              alt={translate("পেমেন্ট ইমেজ", "Payment image")}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Discount Coupon */}
        <div className="mb-6 max-w-[457px] ">
          <label className="text-base font-semibold mb-2 block">
            {translate("ডিসকাউন্ট কুপন:", "Discount Coupon :")}
          </label>
          <div className="flex items-stretch gap-2">
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-md px-3 max-w-[321px] h-[48px]">
              <svg
                className="w-4 h-4 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 14l2-2m0 0l2-2m-2 2l2 2m-2-2l-2 2M5 12l-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4l-2-2m-2-2a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleInputChange}
                placeholder={translate("প্রোমো কোড যোগ করুন", "Add promo code")}
                className="w-full bg-gray-100 text-sm outline-none h-full placeholder:text-gray-400"
              />
            </div>

            <Button
              variant={"outline"}
              className="bg-orange-500 text-white text-xs md:text-sm font-medium h-[48px] px-5 w-[126px] rounded-md hover:bg-orange-600 transition-colors"
            >
              {translate("কোড প্রয়োগ করুন", "Apply Code")}
            </Button>
          </div>
        </div>

        {/* Note Section */}
        <div className="mb-6 max-w-[388px]">
          <label className="text-base font-semibold mb-2 block">
            {translate("নোট", "Note")}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder={translate(
              "আপনার নোট এখানে লিখুন",
              "Write your note here"
            )}
            className="w-full bg-gray-100 border border-gray-200 rounded-md px-4 py-3 h-[90px] text-sm outline-none resize-none placeholder:text-gray-400 focus:ring-1 focus:ring-orange-400"
            rows={3}
          />
        </div>

        {/* Place Order Button */}
        <Button
          variant={"outline"}
          className="bg-orange-500 w-[222px] text-white font-semibold text-base py-3 rounded-md hover:bg-orange-600 transition-colors"
          onClick={handleSubmit}
        >
          {translate("অর্ডার করুন", "Place Order")}
        </Button>
      </div>
    </div>
  );
};

export default BillingAndPayment;
