"use client";
import { FaMapMarkerAlt, FaTags, FaTruck } from "react-icons/fa";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

export default function DeliveryOptionsCard() {
    const { translate } = useCustomTranslator();

    return (
        <div>
            <h2 className="text-gray-700 font-semibold text-[15px] dark:bg-black dark:text-white">
                {translate("ডেলিভারি অপশন", "Delivery options")}
            </h2>
            <div className="dark:bg-black dark:text-white w-full bg-white border border-gray-300 rounded-xl lg:max-w-[524px] max-w-full p-5 space-y-4">
                <div className="dark:bg-black dark:text-white flex items-center justify-between text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#f15a29]" />
                        <span>{translate("উত্তরা, ঢাকা", "Uttara, Dhaka")}</span>
                    </div>
                    <button className="text-blue-600 font-semibold text-sm hover:underline">
                        {translate("পরিবর্তন", "Change")}
                    </button>
                </div>

                <div className="dark:bg-black dark:text-white flex items-center justify-between text-sm font-medium text-gray-700 border-t border-gray-300 pt-3">
                    <div className="dark:bg-black dark:text-white flex items-center gap-2">
                        <FaTruck className="text-[#f15a29]" />
                        <span>{translate("স্ট্যান্ডার্ড ডেলিভারি", "Standard delivery")}</span>
                    </div>
                    <span className="text-[#f15a29] font-bold">60 {translate("টাকা", "Tk")}</span>
                </div>

                <div className="dark:bg-black dark:text-white flex items-center gap-2 border-t border-gray-300 pt-3 text-sm font-medium text-gray-700">
                    <FaTags className="text-[#f15a29]" />
                    <span>{translate("ক্যাশ অন ডেলিভারি", "Cash on delivery")}</span>
                </div>
            </div>
        </div>
    );
}