"use client";

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Key, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import bannerImage1 from '@/assets/Home/banner (1).webp'
import bannerImage2 from '@/assets/Home/banner (2).webp'
import { FaArrowRight } from "react-icons/fa6";
import bannerImage3 from '@/assets/Home/banner (3).webp'
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/paragraph";

interface BannerItem {
    _id: Key | null | undefined;
    image: string | StaticImport;
    title: string;
    subtitle?: string;
    ctaText?: string;
}

const BannerImage = ({
    banner,
}: {
    banner: BannerItem;
}) => {
    return (
        <div className="relative w-full h-full">
            <div className="relative w-full h-full">
                <Image
                    src={banner.image}
                    alt={banner.title || "Banner image"}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 absolute inset-0 flex items-center">
                <div className="max-w-xs sm:max-w-sm md:max-w-2xl text-white z-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                        {banner.title}
                    </h1>
                    {banner.ctaText && (
                        <button className="bg-[#EE5A2C] mt-8 sm:mt-12 md:mt-28 hover:bg-[#d14a24] text-white text-sm sm:text-base font-semibold py-2 px-4 sm:py-3 sm:px-8 rounded-lg transition duration-300 flex items-center gap-2">
                            {banner.ctaText}
                            <FaArrowRight className="text-sm sm:text-lg" />
                        </button>
                    )}
                </div>

                <div className="hidden lg:block absolute right-[20px] lg:right-[40px] top-[100px] lg:top-[120px] transform -translate-y-1/2 w-1/4 h-3/5 bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                    <h3 className="text-white text-lg lg:text-xl font-semibold mb-2 lg:mb-4">
                        Special Offer
                    </h3>
                    <p className="text-white/80 text-sm lg:text-base">
                        Limited time discounts available for all products. Don&apos;t miss out!
                    </p>
                </div>
            </div>
        </div>
    );
};

const HomeBanner = () => {
    const banners = [
        {
            _id: "1",
            image: bannerImage1.src,
            title: "-20% Fall for all dress",
            subtitle: "Discover our new arrivals with up to 40% off",
            ctaText: "Shop Now"
        },
        {
            _id: "2",
            image: bannerImage2.src,
            title: "-20% Fall for all dress",
            subtitle: "Exclusive items for a limited time only",
            ctaText: "Explore"
        },
        {
            _id: "3",
            image: bannerImage3.src,
            title: "-20% Fall for all dress",
            subtitle: "Crafted with care for your comfort",
            ctaText: "View Collection"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const prevRefBanner = useRef(null);
    const nextRefBanner = useRef(null);

    const handleSlideChange = (swiper: { realIndex: SetStateAction<number>; }) => {
        setActiveIndex(swiper.realIndex);
    };

    return (
        <div className="group relative">
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                navigation={{
                    prevEl: prevRefBanner.current,
                    nextEl: nextRefBanner.current,
                }}
                loop={true}
                modules={[Navigation, Autoplay]}
                className="w-full h-[180px] xs:h-[200px] sm:h-[250px] md:h-[320px] lg:h-[346px] rounded-lg overflow-hidden"
                speed={1000}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                onSlideChange={handleSlideChange}
            >
                {banners.length > 0 ? (
                    banners.map((banner: BannerItem) => (
                        <SwiperSlide key={banner._id}>
                            <BannerImage banner={banner} />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide className="bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No banners available</p>
                    </SwiperSlide>
                )}

                <span
                    ref={prevRefBanner}
                    className={`prev-button absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 rounded-full p-1 md:p-2 text-white duration-300 hover:bg-white/80 hover:text-black ${
                        activeIndex === 0 ? "opacity-0" : "opacity-100"
                    }`}
                    aria-label="Previous Slide"
                >
                    <IoIosArrowBack className="text-lg md:text-xl lg:text-2xl" />
                </span>

                <span
                    ref={nextRefBanner}
                    className={`next-button absolute right-2 md:right-4 lg:right-[450px] top-1/2 -translate-y-1/2 z-50 rounded-full p-1 md:p-2 text-white duration-300 hover:bg-white/80 hover:text-black ${
                        activeIndex === banners.length - 1 ? "opacity-0" : "opacity-100"
                    }`}
                    aria-label="Next Slide"
                >
                    <IoIosArrowForward className="text-lg md:text-xl lg:text-2xl" />
                </span>
            </Swiper>
        </div>
    );
};

export default HomeBanner;