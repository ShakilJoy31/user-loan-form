"use client";
import Image from "next/image";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useGetAdvertiseBannersQuery } from "@/redux/features/product/bannerApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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


const DetailsPromotion = () => {

  const { translate } = useCustomTranslator();
  const { data } = useGetAdvertiseBannersQuery({});
  console.log(data?.data);
  const banners: Banner[] = data?.data || [];

  return (
    <div className="px-[20px] lg:px-0">
    <div className=" lg:max-w-[224px] lg:max-h-[1282px] w-full md:px-[10px] lg:pl-[13px] lg:pr-[36px] pb-[11.5px] shadow-lg rounded-[6px]">
      <h2 className="text-2xl font-semibold pt-[30px] mb-[13px]">
       {translate("প্রচার", "Promotions")}
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
                  <Button size={"xs"} variant={"outline"} className="absolute bottom-2 right-2 text-[8px] text-white bg-[#ee5a2c]  px-1  rounded-md font-medium hover:bg-orange-800 hover:text-white cursor-pointer transition-colors duration-200">
                    Shop Now
                  </Button>
                  </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no banners yet</p>
        )}
      </div>

    </div>
    </div>
  );
};

export default DetailsPromotion;