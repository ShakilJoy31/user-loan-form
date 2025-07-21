"use client";
import Image from "next/image";
import mapImage from "@/assets/Products_Image/Screenshot (845).png";
import productImage from "@/assets/Products_Image/products.jpg";
import { CheckCircle, CircleDot, Circle } from "lucide-react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

export default function TrackOrderTab() {
    const { translate } = useCustomTranslator();

    return (
        <div className="bg-white p-4 sm:p-6 shadow-sm dark:bg-black dark:text-white">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{translate("অর্ডার ট্র্যাকিং", "Order Tracking")}</h2>
            <p className="text-sm text-gray-500 mb-6 dark:text-white">
                {translate("আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন", "Track your order Status")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,576px)_minmax(0,311px)] gap-6 ">
                <div className="space-y-[24px] w-full max-w-[576px] ">
                    <div className="bg-[#F9FAFB] p-4 rounded-lg border border-gray-200 w-full dark:bg-black dark:text-white">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm text-gray-500 dark:text-white">{translate("অর্ডার আইডি বিবরণ", "Order ID Detail")}</p>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            #Customer 001
                        </h3>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 mt-2 dark:text-white">
                            {translate("তৈরি তারিখ", "Created date")} <br />
                            <span className="text-gray-700 font-medium dark:text-white">
                                {translate("২৫ জুন, ২০২৫ সকাল ১০:৪৫", "25 June, 2025 at 10:45 AM")}
                            </span>
                        </p>
                        <span className="text-xs bg-[#BDFEB5] text-[#098807] px-3 py-1 rounded-full font-medium ">
                            {translate("পেইড", "Paid")}
                        </span>
                    </div>

                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full dark:bg-black dark:text-white dark:border dark:border-white">
                        <h4 className="text-[24px] font-semibold text-black mb-[10px] dark:text-white">
                            {translate("অর্ডার সারাংশ", "Order Summary")}
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-white">{translate("ডিসকাউন্ট", "Discount")}</span>
                                <span className="text-gray-800 dark:text-white font-medium">20%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-white">{translate("ডিসকাউন্ট", "Discount")}</span>
                                <span className="text-gray-800 dark:text-white">-49 Tk</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-white">{translate("ডেলিভারি", "Delivery")}</span>
                                <span className="text-gray-800 dark:text-white">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-white">{translate("ট্যাক্স", "Tax")}</span>
                                <span className="text-gray-800 dark:text-white">5 TK</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-semibold text-[#EE5A2C]">
                                <span>{translate("মোট", "Total")}</span>
                                <span>200 Tk</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full flex justify-between dark:bg-black dark:text-white dark:border dark:border-white">
                        <div>
                            <h4 className="text-[20px] font-semibold text-black mb-1 dark:text-white">
                                {translate("ডেলিভারি ঠিকানা", "Delivery Address")}
                            </h4>
                            <p className="text-sm">{translate("ঠিকানা", "Address")}</p>
                        </div>
                        <p className="text-sm text-[#667085] leading-5 dark:text-white">
                            847 Jewess Bridge Apt. <br />
                            174 London, UK <br />
                            474-769-3919
                        </p>
                    </div>

                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full dark:bg-black dark:text-white dark:border dark:border-white">
                        <h4 className="text-[20px] font-semibold text-black mb-3 dark:text-white">
                            {translate("অর্ডার আইটেম", "Order Items")}
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={productImage}
                                    alt={translate("হাউস ওয়্যারিং কেবল", "House Wiring Cable")}
                                    className="rounded-md object-cover"
                                    width={60}
                                    height={60}
                                />
                                <div className="text-sm">
                                    <p className="text-gray-800 font-medium dark:text-white">{translate("হাউস ওয়্যারিং কেবল", "House Wiring Cable")}</p>
                                    <p className="text-gray-500 text-xs dark:text-white">{translate("সাইজ: বড়", "Size: large")}</p>
                                    <p className="text-gray-500 text-xs dark:text-white">{translate("রং: একাধিক", "Color: Multiple")}</p>
                                </div>
                            </div>
                            <div className="text-[#EE5A2C] font-semibold text-sm">245 TK</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full max-w-[311px] lg:max-w-none">
                    <div className="rounded-xl overflow-hidden border w-full">
                        <Image
                            src={mapImage}
                            alt={translate("মানচিত্র", "Map")}
                            className="w-full object-cover"
                            width={500}
                            height={300}
                        />
                    </div>

                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full dark:bg-black dark:text-white dark:border dark:border-white">
                        <h4 className="text-md font-semibold text-gray-800 mb-3 dark:text-white">
                            {translate("ট্র্যাকিং আপডেট", "Tracking Updates")}
                        </h4>
                        <ol className="relative border-s-2 border-dashed border-gray-300 space-y-6 ps-4 text-sm">
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-orange-500">
                                    <CircleDot size={18} />
                                </span>
                                <p className="font-medium text-gray-800 dark:text-white">
                                    {translate("ডেলিভারি হিসেবে বিবেচিত", "Considered as a delivery")}
                                </p>
                                <p className="text-gray-600 dark:text-white">12 May 2022 10 AM</p>
                                <p className="text-gray-400 dark:text-white">Mirpur Road</p>
                            </li>
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-orange-500">
                                    <CircleDot size={18} />
                                </span>
                                <p className="font-medium text-gray-800 dark:text-white">
                                    {translate("রাইডারে অ্যাসাইন করা হয়েছে", "Assigned to Rider")}
                                </p>
                                <p className="text-gray-600 dark:text-white">12 May 2022 10 AM</p>
                                <p className="text-gray-400 dark:text-white">Mirpur Road</p>
                            </li>
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-gray-400">
                                    <Circle size={18} />
                                </span>
                                <p className="font-medium text-gray-800 dark:text-white">
                                    {translate("উত্তরায় পৌঁছেছে", "Arrived in Uttara")}
                                </p>
                                <p className="text-gray-600 dark:text-white">12 May 2022 10 AM</p>
                                <p className="text-gray-400 dark:text-white">Mirpur Road</p>
                            </li>
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-green-500">
                                    <CheckCircle size={18} />
                                </span>
                                <p className="font-medium text-gray-800 dark:text-white">
                                    {translate("অর্ডার এসে পৌঁছেছে", "Order is Arrived")}
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}