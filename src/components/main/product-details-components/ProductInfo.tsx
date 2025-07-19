"use client";
import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { Check } from "lucide-react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Button } from "@/components/ui/button";

export default function ProductInfo() {
    const [selectedColor, setSelectedColor] = useState("beige");
    const [selectedSize, setSelectedSize] = useState("Small");
    const { translate } = useCustomTranslator();

    const colors = [
        { id: "beige", name: translate("বেইজ", "Beige"), bg: "bg-[#EFE5D4]" },
        { id: "green", name: translate("সবুজ", "Green"), bg: "bg-[#B7CD6D]" },
        { id: "blue", name: translate("নীল", "Blue"), bg: "bg-[#C2C6F0]" },
        { id: "pink", name: translate("গোলাপী", "Pink"), bg: "bg-[#FBD2F5]" },
        {
            id: "half",
            name: translate("অর্ধেক", "Half"),
            bg: "bg-gradient-to-b from-[#E4B4A3] to-[#B7CD6D]",
        },
    ];

    const sizes = [
        translate("ছোট", "Small"),
        translate("মাঝারি", "Medium"), 
        translate("বড়", "Large"),
        translate("অতিবড়", "Extra Large")
    ];

    return (
        <div className="space-y-6 mt-4 lg:mt-0">
            <div className="flex items-center justify-between">
                <p className="text-orange-600 font-bold text-sm">ElectroHub</p>
                <div className="flex gap-x-2 items-center">
                    <Button variant={'outline'} className="bg-[#F6F6F6] shadow-md px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition">
                        {translate("তুলনা যোগ করুন", "Add to compare")}
                    </Button>
                    <span>
                        <CiShare2 size={22} />
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-600">
                {translate("স্ট্যাটাস:", "Status:")}{" "}
                <span className="text-red-500 font-medium">
                    {translate("স্টকে আছে", "In Stock")}
                </span>
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold leading-tight text-gray-900">
                {translate(
                    "এলজি সি২ ৪২ (১০৬সিএম) ৪কে স্মার্ট ওলেড ইভো টিভি | ওয়েবওএস | সিনেমা এইচডিআর", 
                    "LG C2 42 (106CM) 4K SMART OLED EVO TV | WEBOS | CINEMA HDR"
                )}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <FiStar className="text-lg" />
                    4.5
                </span>
                <span className="text-gray-800">
                    {translate("২৮৮ রিভিউ", "288 reviews")}
                </span>
                <BsDot className="text-lg text-gray-400" />
                <span>
                    {translate("২০+ বিক্রিত", "20+ Sold")}
                </span>
            </div>

            <div className="flex items-center gap-4 rounded-[12px] bg-[linear-gradient(180deg,#F2973E_27.72%,#FECA40_100%)] px-6 py-4 text-white w-full max-w-[404px]">
                <div className="flex-1 text-left">
                    <p className="font-extrabold text-2xl">
                        {translate("২৫% ছাড়", "25% OFF")}
                    </p>
                    <p className="text-base font-medium mt-1 text-[#5A5A5A]">
                        {translate("যদি অর্ডার $১২০ এর উপর হয়", "If order over $120")}
                    </p>
                </div>

                <div className="flex flex-col items-end">
                    <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
                        {translate("২৪ জুলাই, ২০২৫ পর্যন্ত", "Until 24 July, 2025")}
                    </div>
                    <p className="text-white/90 mt-1 text-sm">
                        {translate("৩ দিনে শুরু", "Starts in 3 days")}
                    </p>
                    <p className="text-2xl font-bold tracking-widest mt-1 flex gap-1">
                        <span>10</span>:<span>53</span>:<span>48</span>
                    </p>
                </div>
            </div>

            <ul className="text-sm space-y-2 text-gray-600 list-disc list-inside pt-4">
                <li>
                    {translate("α9 Gen5 AI প্রসেসর সহ AI পিকচার প্রো এবং AI 4K আপস্কেলিং", "α9 Gen5 AI Processor with AI Picture Pro & AI 4K Upscaling")}
                </li>
                <li>
                    {translate("পিক্সেল ডিমিং, পারফেক্ট ব্ল্যাক, 100% কালার ফিডেলিটি এবং কালার ভলিউম", "Pixel Dimming, Perfect Black, 100% Color Fidelity & Color Volume")}
                </li>
                <li>
                    {translate("হ্যান্ডস-ফ্রি ভয়েস কন্ট্রোল, সর্বদা প্রস্তুত", "Hands-free Voice Control, Always Ready")}
                </li>
                <li>
                    {translate("ডলবি ভিশন আইকিউ সহ প্রিসিশন ডিটেইল, ডলবি এটমস, ফিল্মমেকার মোড", "Dolby Vision IQ with Precision Detail, Dolby Atmos, Filmmaker Mode")}
                </li>
                <li>
                    {translate("আই কমফোর্ট ডিসপ্লে: লো-ব্লু লাইট, ফ্লিকার-ফ্রি", "Eye Comfort Display: Low-Blue Light, Flicker-Free")}
                </li>
            </ul>

            <div className="space-y-2 pt-4 border-t border-gray-300">
                <p className="text-sm font-medium text-gray-700">
                    {translate("একটি রং নির্বাচন করুন", "Choose a Color")}
                </p>
                <div className="flex items-center gap-4">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            className={`w-[64px] h-[64px] rounded-full flex items-center justify-center relative border-2 ${
                                selectedColor === color.id
                                    ? "border-gray-300"
                                    : "border-transparent"
                            }`}
                            onClick={() => setSelectedColor(color.id)}
                            title={color.name}
                        >
                            <div
                                className={`w-[44px] h-[44px] rounded-full ${color.bg}`}
                            ></div>
                            {selectedColor === color.id && (
                                <Check
                                    size={25}
                                    className="absolute text-white bg-gray-300 rounded-full p-[1px]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-300 pb-2">
                <p className="text-sm font-medium text-gray-700">
                    {translate("একটি সাইজ নির্বাচন করুন", "Choose a Size")}
                </p>
                <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                        <label
                            key={size}
                            className={`relative cursor-pointer px-3 py-1.5 text-sm rounded-[8px] flex items-center gap-2 border transition ${
                                selectedSize === size
                                    ? "bg-[#EDF0F8] text-[#3A4980] border-[#3A4980]"
                                    : "bg-[#F3F3F3] text-[#726C6C] border-transparent"
                            }`}
                        >
                            <input
                                type="radio"
                                name="size"
                                value={size}
                                className="peer hidden"
                                checked={selectedSize === size}
                                onChange={() => setSelectedSize(size)}
                            />
                            <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    selectedSize === size ? "border-[#3A4980]" : "border-gray-400"
                                }`}
                            >
                                {selectedSize === size && (
                                    <span className="w-2 h-2 bg-[#3A4980] rounded-full"></span>
                                )}
                            </span>
                            {size}
                        </label>
                    ))}
                </div>
                <hr className="border-t border-gray-300 mt-3" />
            </div>
        </div>
    );
}