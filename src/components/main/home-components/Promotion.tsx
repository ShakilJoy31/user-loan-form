"use client";
import Image from "next/image";
import ElectroHub from "@/assets/Home/ElectroHub.png";
import FashionPoint from "@/assets/Home/FashionPoint.png";
import ElectroHub2 from "@/assets/Home/ElectroHub (2).png";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useGetAdvertiseBannersQuery } from "@/redux/features/product/bannerApi";
import Link from "next/link";
import DataLoader from "@/components/common/DataLoader";

interface Banner {
  id: number;
  priority: number;
  advertiseType: string;
  image: string;
  slug: string;
  startDate: string;
  endDate: string;
  perDayAmount: number;
  totalAmount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Promotion = () => {
  const { translate } = useCustomTranslator();
  const { data, isLoading, isError } = useGetAdvertiseBannersQuery({});
  console.log(data?.data);
  const banners: Banner[] = data?.data || [];

  if(isLoading || !data){
    return <div><DataLoader /></div>
  }

  if(isError){
    return <p>Failed to load data error</p>
  }

  return (
    <div className="w-full lg:max-w-[413px] bg-[#F4F8FF] text-black rounded-2xl p-4 sm:p-5 md:p-[20px] dark:bg-black dark:text-white">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold my-3 sm:my-4 md:my-[20px]">
        {translate("বিশেষ প্রচার", "Special Promotions")}
      </h2>
      <div className="flex-col space-y-4 sm:space-y-6 md:space-y-[30px]">
        {banners.length > 0 ? (
          <div className="relative space-y-4 sm:space-y-6 md:space-y-[30px]">
            {banners.map((banner) => (
              <div key={banner.id} className="relative group">
                  <Image
                    width={370}
                    height={283}
                    src={banner.image}
                    alt={`promotion-banner-${banner.id}`}
                    className="w-full h-auto object-cover rounded-lg mt-5"
                    priority={banner.priority > 50}
                  />
                  <Link href={banner.advertiseType === "Shop" ? `/products/all-products/${banner?.slug}` : `/products/${banner.slug}`}>
                  <Button variant={"outline"} className="absolute bottom-4 right-4 text-white bg-[#ee5a2c]  px-4 py-2 rounded-md font-medium hover:bg-orange-800 hover:text-white cursor-pointer transition-colors duration-200">
                    {translate("এখনই কিনুন", "Shop Now")}
                  </Button>
                  </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no banners yet</p>
        )}
      </div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-[18px] mt-4 sm:mt-6 md:mt-[40px]">
        {translate("বৈশিষ্ট্যযুক্ত দোকান", "Featured Shops")}
      </h2>

      {/* feature shop make stay static */}
      <div className="space-y-3 sm:space-y-4 md:space-y-[18px]">
        {[ElectroHub, FashionPoint, ElectroHub2].map((shopImage, index) => (
          <div
            key={index}
            className="w-full max-h-[70px] sm:max-h-[80px] rounded-xl border border-white shadow-lg"
          >
            <div className="flex justify-between py-2 sm:py-3 md:my-[17px]">
              <div className="flex gap-4 sm:gap-6 md:gap-10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ml-2 sm:ml-3 md:ml-[15px]">
                  <Image
                    width={46}
                    height={46}
                    src={shopImage}
                    alt="Shop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-sm sm:text-base md:text-lg">
                    {translate("ইলেক্ট্রোহাব", "ElectroHub")}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {translate("১০ নং সেক্টর, উত্তরা", "10 no sector, Uttara")}
                  </p>
                </div>
              </div>
              <div className="text-gray-700 -rotate-45 px-2 sm:px-3 md:px-4 py-1 sm:py-2">
                <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 sm:mt-5 md:mt-6">
        <Button
          variant={"outline"}
          className="max-w-[180px] sm:max-w-[200px] md:max-w-[224px] h-[40px] sm:h-[45px] md:h-[54px] border-[#FD6801] border-2 rounded-xl"
        >
          <div className="flex items-center justify-center p-2 sm:p-3">
            <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">
              {translate("সমস্ত বৈশিষ্ট্যযুক্ত দেখুন", "See All Featured")}
            </p>
            <span className="text-gray-700 px-2 sm:px-3 md:px-4">
              <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Promotion;
