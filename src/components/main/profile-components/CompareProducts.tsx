"use client";
import Image from "next/image";
import { FiTrash2, FiSearch, FiShoppingCart } from "react-icons/fi";
import product5 from "@/assets/Products_Image/products.jpg";
import { Button } from "@/components/ui/button";
import { IoMdGitCompare } from "react-icons/io";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

export default function CompareTab() {
    const { translate } = useCustomTranslator();

    const compareProducts = [
        {
            name: translate("অনার ম্যাজিক V3", "Honor Magic V3"),
            price: translate("১৮৩০০০ ৳", "183000 ৳"),
            discountPrice: translate("০ ৳", "0 ৳"),
            bookingPrice: translate("০ ৳", "0 ৳"),
            brand: translate("অনার", "Honor"),
            ram: translate("১২ জিবি", "12 GB"),
            storage: translate("৫১২ জিবি", "512 GB"),
            sim: "N/A",
            region: "N/A",
            image: product5.src,
            description: translate(
                "স্যামসাং গ্যালাক্সি S21 FE 5G সেল ফোন, ফ্যাক্টরি আনলকড অ্যান্ড্রয়েড স্মার্টফোন, ১২৮জিবি, ১২০Hz ডিসপ্লে।",
                "Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone, 128GB, 120Hz Display."
            ),
        },
        {
            name: translate("অ্যামাজফিট বিপ 5 স্মার্ট ওয়াচ", "Amazfit Bip 5 Smart Watch"),
            price: translate("৭২৯৯ ৳", "7299 ৳"),
            discountPrice: translate("৭২৯৯ ৳", "7299 ৳"),
            bookingPrice: translate("৫০০ ৳", "500 ৳"),
            brand: translate("অ্যামাজফিট", "Amazfit"),
            ram: "N/A",
            storage: "N/A",
            sim: "N/A",
            region: "N/A",
            image: product5.src,
            description: translate(
                "অ্যাপল আইম্যাক 24” 4K রেটিনা ডিসপ্লে M1 8 কোর CPU, 8 কোর GPU, 256GB SSD, ব্লু (MGPK3ZP/A) 2021",
                "Apple iMac 24” 4K Retina Display M1 8 Core CPU, 8 Core GPU, 256GB SSD, Blue (MGPK3ZP/A) 2021"
            ),
        },
    ];

    // Define properties with both English and Bangla keys
    const properties = [
        { key: "name", label: translate("পণ্যের নাম", "Product Name") },
        { key: "image", label: translate("ছবি", "Image") },
        { key: "price", label: translate("দাম", "Price") },
        { key: "discountPrice", label: translate("ডিসকাউন্ট মূল্য", "Discount Price") },
        { key: "bookingPrice", label: translate("বুকিং মূল্য", "Booking Price") },
        { key: "brand", label: translate("ব্র্যান্ড", "Brand") },
        { key: "ram", label: translate("র‍্যাম", "RAM") },
        { key: "storage", label: translate("স্টোরেজ", "Storage") },
        { key: "sim", label: translate("সিম", "SIM") },
        { key: "region", label: translate("অঞ্চল", "Region") },
        { key: "description", label: translate("বিবরণ", "Description") },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4 border-b border-gray-300 pb-[14px]">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {translate("পণ্য তুলনা করুন", "Compare products")}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {translate("আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন", "Track your order Status")}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-[23px] gap-4 flex-wrap">
                <Button variant={'outline'} className="bg-[#F6F6F6] gap-x-[4px] shadow-md px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition">
                    {translate("তুলনা যোগ করুন", "Add to compare")} <span><IoMdGitCompare /></span>
                </Button>

                <div className="relative">
                    <input
                        type="text"
                        placeholder={translate("একটি পণ্য অনুসন্ধান করুন", "Search for a product")}
                        className="text-sm bg-[#F9FAFB] text-black rounded-md pl-10 pr-3 py-2 w-[220px] focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <FiSearch
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-[700px] w-full text-sm text-left">
                    <thead>
                        <tr className="text-gray-700">
                            <th className="py-3 px-4 text-sm font-medium w-[160px]">
                                <p className="text-sm text-[#EB4335] underline hover:text-red-600">
                                    {translate("সব মুছে ফেলুন", "Remove all")}
                                </p>
                            </th>
                            {compareProducts.map((product, index) => (
                                <th
                                    key={index}
                                    className="py-3 px-4 text-sm font-semibold text-center"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-[#EB4335] hover:text-red-500">
                                            <FiTrash2 />
                                        </p>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 !== 1 ? "bg-[#FFF1E9]" : "bg-white"}`}
                            >
                                <td className={`py-3 px-4 font-medium bg-[#FDEFEA] ${properties.length === index + 1 ? '' : 'border-b border-[#EE5A2C]'}`}>
                                    {property.label}
                                </td>
                                {compareProducts.map((product, idx) => (
                                    <td
                                        key={idx}
                                        className="py-3 px-4 text-center align-middle"
                                    >
                                        {property.key === "image" ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={80}
                                                height={80}
                                                className="inline-block rounded-md mx-auto"
                                            />
                                        ) : property.key === "description" ? (
                                            <div className="text-xs text-gray-600 flex flex-col">
                                                <p className="mb-2">{product.description}</p>
                                                <div className="flex items-center gap-x-[7px] justify-center">
                                                    <span className="p-2 bg-white rounded-sm"><FiShoppingCart size={14} color={'#642612'} /></span>
                                                    <Button variant={'outline'} className="flex items-center gap-1 text-white bg-[#EE5A2C] hover:bg-orange-600 text-xs px-4 py-1.5 rounded-sm">
                                                        {translate("বিস্তারিত দেখুন", "View details")}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-800">
                                                {product[property.key as keyof typeof product]}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center mt-6 gap-2">
                <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    {translate("পূর্ববর্তী", "Previous")}
                </Button>
                {[1, 2, 3].map((page) => (
                    <Button variant={'outline'}
                        key={page}
                        className={`text-sm px-3 py-1 border rounded-md ${page === 1
                            ? "bg-orange-500 text-white border-orange-500"
                            : "border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </Button>
                ))}
                <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    {translate("পরবর্তী", "Next")}
                </Button>
            </div> */}
        </div>
    );
}