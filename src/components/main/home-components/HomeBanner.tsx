"use client";

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Key, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import bannerImage1 from '../../../../assets/Home/banner (1).jpg'
import bannerImage2 from '../../../../assets/Home/banner (2).jpg'
import { FaArrowRight } from "react-icons/fa6";
import bannerImage3 from '../../../../assets/Home/banner (3).jpg'

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
            {/* Image with gradient overlay */}
            <div className="relative w-full h-full">
                <Image
                    src={banner.image}
                    alt={banner.title || "Banner image"}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient overlay - bottom to top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 absolute inset-0 flex items-center">
                <div className="max-w-2xl text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        {banner.title}
                    </h1>
                    {banner.ctaText && (
                        <button className="bg-[#EE5A2C] mt-28 hover:bg-[#d14a24] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center gap-2">
                            {banner.ctaText}
                            <FaArrowRight className="text-lg" />
                        </button>
                    )}
                </div>

                {/* Transparent modal on the right */}
                <div className="hidden lg:block absolute right-[40px] top-[120px] transform -translate-y-1/2 w-1/4 h-3/5 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <h3 className="text-white text-xl font-semibold mb-4">
                        Special Offer
                    </h3>
                    <p className="text-white/80">
                        Limited time discounts available for all products. Don&apos;t miss out!
                    </p>
                </div>
            </div>
        </div>
    );
};

const HomeBanner = () => {
    // Static banner data
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
            image: bannerImage2.src, // Replace with your actual image path
            title: "-20% Fall for all dress",
            subtitle: "Exclusive items for a limited time only",
            ctaText: "Explore"
        },
        {
            _id: "3",
            image: bannerImage3.src, // Replace with your actual image path
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
                className="w-full h-[210px] sm:h-[2800px] md:h-[346px] rounded-lg overflow-hidden"
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
                            <BannerImage
                                banner={banner}
                               
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide className="bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No banners available</p>
                    </SwiperSlide>
                )}

                {/* Custom Navigation Buttons */}
                <button
                    ref={prevRefBanner}
                    className={`prev-button absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 rounded-full p-2 text-white duration-300 hover:bg-white/80 hover:text-black ${activeIndex === 0 ? "opacity-0" : "opacity-100"
                        }`}
                    aria-label="Previous Slide"
                >
                    <IoIosArrowBack className="text-xl md:text-2xl" />
                </button>
                <button
                    ref={nextRefBanner}
                    className={`next-button absolute right-2 md:right-[450px] top-1/2 -translate-y-1/2 z-50 rounded-full p-2 text-white duration-300 hover:bg-white/80 hover:text-black ${activeIndex === banners.length - 1 ? "opacity-0" : "opacity-100"
                        }`}
                    aria-label="Next Slide"
                >
                    <IoIosArrowForward className="text-xl md:text-2xl" />
                </button>
            </Swiper>
        </div>
    );
};

export default HomeBanner;