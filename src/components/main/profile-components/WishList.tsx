"use client";
import Image from "next/image";
import { FiTrash2, FiCalendar } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import computer from "@/assets/Products_Image/computer.png";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const WishlistTab = () => {
    const { translate } = useCustomTranslator();
    const wishlistItems = new Array(4).fill({
        id: 1,
        title: translate("3D কম্পিউটার উন্নত সংস্করণ", "3D computer improved version"),
        price: translate("৮০০ টাকা", "800 Tk"),
        rating: 5,
        reviews: 121,
        date: translate("৭/৫/২০২৫, ১০:২১:৩২ PM", "7/5/2025, 10:21:32 PM"),
        image: computer.src,
    });

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mx-auto max-w-7xl">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{translate("ইচ্ছেতালিকা", "Wish–List")}</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                {translate("আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন", "Track your order Status")}
            </p>

            <div className="bg-white border rounded-xl overflow-hidden">
                {wishlistItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border-b last:border-b-0 gap-3 md:gap-0"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-8 w-full sm:w-auto">
                            <button className="text-gray-500 hover:cursor-pointer hover:text-red-500 flex items-center justify-start sm:justify-center sm:w-12">
                                <FiTrash2 size={16} className="md:size-[18px]" />
                            </button>

                            <div className="flex items-center gap-3 md:gap-8 w-full sm:w-auto">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={70}
                                    height={70}
                                    className="rounded-md object-cover w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                                />

                                <div className="text-xs md:text-sm space-y-1 flex-1">
                                    <p className="font-medium text-gray-800 line-clamp-2">{item.title}</p>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {Array(item.rating)
                                            .fill(0)
                                            .map((_, i) => (
                                                <AiFillStar key={i} size={12} className="md:size-[14px]" />
                                            ))}
                                        <span className="text-xs text-gray-500">({item.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                        <FiCalendar size={12} className="md:size-[13px]" />
                                        {item.date}
                                    </div>
                                </div>
                            </div>

                            <span className="text-xs sm:text-sm font-semibold bg-[#FEEFE8] text-[#1E1E1E] px-2 py-1 sm:px-4 sm:py-1 rounded-md self-start sm:self-auto">
                                {item.price}
                            </span>
                        </div>

                        <div className="flex justify-end sm:justify-normal sm:w-auto">
                            <Button 
                                variant={'outline'} 
                                className="bg-[#EE5A2C] hover:bg-orange-600 text-white text-xs sm:text-sm px-3 py-1 sm:px-5 sm:py-2 rounded-md transition w-full sm:w-auto"
                            >
                                {translate("কার্টে যোগ করুন", "Add to Cart")}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 md:mt-6 gap-1 md:gap-2 flex-wrap">
                <Button variant={'outline'} className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    {translate("পূর্ববর্তী", "Previous")}
                </Button>
                {[1, 2, 3].map((page) => (
                    <Button 
                        variant={'outline'}
                        key={page}
                        className={`text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 border rounded-md ${
                            page === 1
                                ? "bg-orange-500 text-white border-orange-500"
                                : "border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </Button>
                ))}
                <Button variant={'outline'} className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    {translate("পরবর্তী", "Next")}
                </Button>
            </div>
        </div>
    );
};

export default WishlistTab;