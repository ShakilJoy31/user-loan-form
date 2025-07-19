"use client";
import Image from "next/image";
import product from '@/assets/Products_Image/products.jpg'
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";



export default function OrderSummary() {
  const { translate } = useCustomTranslator();

  const products = [
  {
    id: 1,
    name: translate("৬এ ৬ গ্যাং ১ ওয়ে সুইচ", "6A 6 Gang 1 Way Switch"),
    size: translate("বড়", "large"),
    color: translate("বহু", "Multiple"),
    price: 145,
    originalPrice: 145,
    imageUrl: product.src,
  },
  {
    id: 2,
    name: translate("সুস্বাদু কেক", "Delicious Cake"),
    size: translate("বড়", "large"),
    color: translate("বহু", "Multiple"),
    price: 145,
    originalPrice: 145,
    imageUrl: product.src,
  },
];

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-300 shadow-sm overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">{translate("অর্ডার সারাংশ", "Order summary")}</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>{translate("সাব-টোটাল", "Sub-Total")}</span>
          <span>{translate("১২৭ টাকা", "127 Tk")}</span>
        </div>
        <div className="flex justify-between">
          <span>{translate("ডেলিভারি চার্জ", "Delivery Charges")}</span>
          <span>{translate("১২০ টাকা", "120 Tk")}</span>
        </div>
        <div className="flex justify-between">
          <span>{translate("ডিসকাউন্ট", "Discount")}</span>
          <span className="text-red-500 font-semibold">{translate("২০%", "20%")}</span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>{translate("মোট", "Total")}</span>
          <span className="text-red-600">{translate("২২০ টাকা", "220 Tk")}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{translate("ডেলিভারিতে প্রদেয়", "Payable on Delivery")}</span>
          <span>{translate("৪,০১৯ টাকা", "Tk. 4,019")}</span>
        </div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{translate("মোট পরিমাণ", "Total Amount")}</span>
        <span>{translate("২২০ টাকা", "220 Tk")}</span>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="usePoints" className="accent-red-500" />
        <label htmlFor="usePoints" className="text-sm text-gray-600">
          {translate("আমার পয়েন্ট ব্যবহার করুন (১২০ পয়েন্ট)", "Use my points (120 points)")}
        </label>
      </div>

      <div className="mt-4 space-y-4">
        {products.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 border-b border-gray-300 pb-3">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="text-sm">
              <h4 className="font-semibold">{item.name}</h4>
              <p>
                <span className="text-gray-600">{translate("সাইজ:", "Size:")}</span> {item.size}
              </p>
              <p>
                <span className="text-gray-600">{translate("রং:", "Color:")}</span> {item.color}
              </p>
              <p className="text-red-600 font-bold">
                {item.price} {translate("টাকা", "Tk")}{" "}
                <span className="line-through text-gray-400 font-normal">
                  {item.originalPrice} {translate("টাকা", "Tk")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button variant={'outline'} className="mt-6 w-full bg-[#EE5A2C] text-white font-semibold py-2 rounded">
        {translate("পেমেন্ট করুন", "Proceed To Pay")}
      </Button>
    </div>
  );
}