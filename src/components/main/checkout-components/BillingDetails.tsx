
"use client";
import React, { useState, ChangeEvent} from "react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useGetShippingMethodsQuery } from "@/redux/features/order/shippingMethodApi";
import { useLazyVerifyCouponQuery } from "@/redux/features/order/discountApi";
import toast from "react-hot-toast";

interface ShippingMethod {
  id: string;
  name: string;
  method: string;
  shipped: string;
  price: number;
  estimatedDelivery: string;
}

interface BillingAndPaymentProps {
  onShippingMethodSelect: (methodId: string) => void;
  onFormDataChange: (data: FormData) => void;
  initialFormData: FormData;
  subTotal: number
}

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
  shippingMethod: string; 
  shippingMethodId: string; 
}



const BillingAndPayment: React.FC<BillingAndPaymentProps> = ({ 
  onShippingMethodSelect,
  onFormDataChange,
  initialFormData,
  subTotal
}) => {
  const { translate } = useCustomTranslator();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { data: shippingMethodsData, isLoading, isError } = useGetShippingMethodsQuery({});
console.log(shippingMethodsData)
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    onFormDataChange(updatedFormData);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    onFormDataChange(updatedFormData);
  };
  

const handleShippingMethodSelect = (methodId: string) => {
  const selectedMethod = shippingMethodsData?.data?.find((m: ShippingMethod) => m.id === methodId);
  const updatedFormData = {
    ...formData,
    shippingMethod: selectedMethod?.shipped || '', // Store the "shipped" value
    shippingMethodId: methodId, // Store the ID for reference
  };
  setFormData(updatedFormData);
  onFormDataChange(updatedFormData);
  onShippingMethodSelect(methodId); // Pass ID separately if needed for display
};

const [triggerVerifyCoupon, { isLoading: couponLoading }] = useLazyVerifyCouponQuery();
const [couponData, setCouponData] = useState<{
  code: string;
  discount: number;
} | null>(null);

const handleApplyCoupon = async () => {
  if (!formData.promoCode) {
    toast.error(translate("প্রোমো কোড লিখুন", "Please enter promo code"));
    return;
  }

  try {
    const response = await triggerVerifyCoupon({
      code: formData.promoCode,
      totalAmount: subTotal 
    }).unwrap();

    if (response.success && response.data) {
      
      setCouponData({
        code: response.data.code,
        discount: response.data.discount
      });
      
      toast.success(translate("কুপন প্রয়োগ করা হয়েছে", "Coupon applied successfully"));
      
      // Update form data with coupon info
      const updatedFormData = {
        ...formData,
        couponCode: response.data.code,
        couponDiscount: response.data.discount,
      };
      setFormData(updatedFormData);
      onFormDataChange(updatedFormData);
    } else {
      toast.error(translate("অবৈধ কুপন কোড", "Invalid coupon code"));
    }
  } catch (error) {
    console.error("Coupon verification failed:", error);
    toast.error(translate("কুপন যাচাই করতে ব্যর্থ", "Failed to verify coupon"));
  }
};

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-md dark:bg-black dark:text-white">
        <h2 className="text-lg font-semibold mb-4">
          {translate("বিলিং বিবরণ", "Billing Details")}
        </h2>

        {/* Checkout Options */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            {translate("চেকআউট অপশন", "Checkout Options")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
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
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border dark:bg-black dark:text-white border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
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
              placeholder={translate("জোন", "Zone*")}
              className="w-full border dark:text-white border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full dark:bg-black dark:text-white border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
            >
              <option value="" disabled>
                {translate("এলাকা", "Area*")}
              </option>
              <option value="uttara">{translate("উত্তরা", "Uttara")}</option>
              <option value="mirpur">{translate("মিরপুর", "Mirpur")}</option>
            </select>


               {/* Note Section */}
        <div className="">
          {/* <label className="text-base font-semibold mb-2 block">
            {translate("নোট", "Note")}
            <span className="text-red-500">*</span>
          </label> */}
          <input
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder={translate(
              "আপনার নোট এখানে লিখুন",
              "Write your note here"
            )}
            className="w-full dark:text-white border border-gray-200 rounded-md px-4 py-3 text-sm outline-none resize-none  focus:ring-1 focus:ring-orange-400"
          />
        </div>
          </div>
        </div>

       

        <div className="mt-5">
          <textarea
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            placeholder={translate("ঠিকানা লাইন ১", "Address Line 1*")}
            className="w-full border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
            rows={3}
          />
        </div>

        {/* Shipping Method */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">
            {translate("শিপিং পদ্ধতি", "Shipping Method*")}
          </p>
          
          {isLoading ? (
            <div className="text-sm text-gray-500 dark:text-white">
              {translate("লোড হচ্ছে...", "Loading...")}
            </div>
          ) : isError ? (
            <div className="text-sm text-red-500 dark:text-white">
              {translate("শিপিং পদ্ধতি লোড করতে ব্যর্থ", "Failed to load shipping methods")}
            </div>
          ) : (
            <div className="space-y-3">
              {shippingMethodsData?.data?.map((method: ShippingMethod) => (
                <div 
                  key={method.id}
                  onClick={() => handleShippingMethodSelect(method.id)}
                  className={`flex items-center gap-2 border ${
                    formData.shippingMethod === method.id 
                      ? 'border-[#EE5A2C] bg-[#E8F1F8]' 
                      : 'border-gray-200'
                  } rounded-md px-4 py-3 cursor-pointer`}
                >
                  <input
                    type="radio"
                    id={`shipping-${method.id}`}
                    name="shippingMethod"
                    value={method.id}
                    checked={formData.shippingMethodId === method.id}
                    onChange={() => handleShippingMethodSelect(method.id)}
                    className="accent-[#F53E32]"
                  />
                  <label 
                    htmlFor={`shipping-${method.id}`}
                    className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[#EE5A2C] dark:text-white">
                      {method.name}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-white">
                      {method.shipped || `${translate("ডেলিভারি", "Delivery")}: ${method.estimatedDelivery}`}
                    </span>
                    <span className="text-sm font-medium">
                      {method.price} {translate("টাকা", "TK")}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-4 mt-[60px]">
          {translate("পেমেন্ট পদ্ধতি", "Payment Method*")}
        </h2>

        {/* Payment Options */}
        <div className="border border-gray-300 rounded-md p-4 mb-6 max-w-[740px] dark:bg-black dark:text-white">
          <p className="text-sm text-gray-600 mb-4 dark:text-white">
            {translate(
              "এই অর্ডারে ব্যবহারের জন্য পছন্দসই পেমেন্ট পদ্ধতি নির্বাচন করুন।",
              "Please select the preferred payment method to use on this order."
            )}
          </p>
          <div className="space-y-3 text-sm text-gray-700 dark:text-white">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              {translate("ক্যাশ অন ডেলিভারি", "Cash On Delivery")}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={formData.paymentMethod === "ONLINE"}
                onChange={handleRadioChange}
                className="accent-[#F53E32]"
              />
              Online (SSL Commerce)
            </label>
          </div>
        </div>

        {/* Payment Icons */}
        {/* <div className="border border-gray-300 rounded-md p-4 mb-6 max-w-[584px] h-[121px] ">
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
        </div> */}

        {/* Discount Coupon */}
          <div className="mb-6 max-w-[457px]">
        <label className="text-base font-semibold mb-2 block">
          {translate("ডিসকাউন্ট কুপন:", "Discount Coupon :")}
        </label>
        <div className="flex items-stretch gap-2">
          <div className="flex items-center dark:bg-black dark:text-white bg-gray-100 border border-gray-200 rounded-md px-3 max-w-[321px] h-[48px]">
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
              className="w-full bg-gray-100 text-sm outline-none h-full dark:bg-black dark:text-white placeholder:text-gray-400"
            />
          </div>

          <Button
            onClick={handleApplyCoupon}
            disabled={couponLoading}
            variant={"outline"}
            className="bg-orange-500 dark:text-white hover:text-white text-white text-xs md:text-sm font-medium h-[48px] px-5 w-[126px] rounded-md hover:bg-orange-600 transition-colors"
          >
            {couponLoading 
              ? translate("লোড হচ্ছে...", "Loading...") 
              : translate("কোড প্রয়োগ করুন", "Apply Code")}
          </Button>
        </div>
        
        {couponData && (
          <p className="text-green-600 text-sm mt-2  dark:text-white">
            {translate("কুপন প্রয়োগ করা হয়েছে", "Coupon applied")}: {couponData.code} {couponData.discount}
          </p>
        )}
      </div>

        
      </div>
    </div>
  );
};

export default BillingAndPayment;