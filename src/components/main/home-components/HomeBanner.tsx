"use client"
import bannerImage from "@/assets/Home/banner.jpg";
// import bannerCart from "@/BannerImage/Card.png";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import scan from "@/assets/Home/qr.png";
import video from "@/assets/Home/Video.png";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef } from "react";

const HomeBanner = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    // Sample data for swiper slides (replace with your actual data)
    const slides = [
        {
            id: 1,
            image: bannerImage,
            title: "-20% Fall",
            subtitle: "for all Dress",
            buttonText: "Shop Now",
            offerText: "Offer valid through 26 July"
        },
        // Add more slides as needed
        {
            id: 2,
            image: bannerImage, // Use different image for other slides
            title: "-30% Summer",
            subtitle: "for all Shoes",
            buttonText: "Shop Now",
            offerText: "Offer valid through 30 July"
        }
    ];

    return (
        <div className="w-full lg:max-w-[1288px] mx-auto lg:px-0 md:px-4 sm:px-6 ">
            <div className="relative w-full h-auto min-h-[200px] md:h-[346px] inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 z-10 rounded-md overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Swiper section */}
                    <div className="w-full  lg:w-[763px] h-[200px] sm:h-[300px] md:h-[346px] relative">
                        {/* Custom navigation buttons */}
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 text-white w-[20px] h-[35px] flex items-center justify-center bg-black/30 rounded"
                        >
                            <FaChevronLeft></FaChevronLeft>
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 text-white text-[20px] w-[20px] h-[35px] flex items-center justify-center bg-black/30 rounded"
                        >
                            <FaChevronRight></FaChevronRight>
                        </button>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className="h-full"
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {slides.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            fill
                                            src={slide.image}
                                            alt="Banner Image"
                                            className="object-cover w-full h-full rounded-md"
                                            priority
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90 z-10 rounded-md"></div>

                                        {/* Slide content */}
                                        <div className="absolute top-4 left-4 sm:top-[33px] sm:left-[26px] z-20">
                                            <h2 className="max-w-[280px] text-2xl sm:text-3xl md:text-[40px] font-bold text-white leading-tight sm:leading-[30px]">
                                                {slide.title}{" "}
                                                <span className="text-white text-xl sm:text-2xl md:text-[28px]">{slide.subtitle}</span>
                                            </h2>
                                        </div>

                                        <div className="absolute top-28 sm:top-[184px] left-4 sm:left-[38px] w-[150px] sm:w-[175px] h-12 sm:h-[54px] py-2 sm:py-[15px] px-4 sm:px-[30px] text-white bg-[#ee5a2c] rounded-[10px] flex justify-center items-center z-20">
                                            <button className="btn flex gap-2 sm:gap-3 text-sm sm:text-[16px] font-semibold items-center">
                                                {slide.buttonText} <FaArrowRightLong />
                                            </button>
                                        </div>

                                        <div className="max-w-[155px] max-h-[56px] absolute inset-0 top-[243px] mb-[57px] left-[555px] text-center z-20 md:max-w-[155px] md:max-h-[56px] md:absolute md:inset-0 md:top-[243px] md:mb-[57px] md:left-[555px] md:text-center md:z-20 ">
                                            <h1 style={{ fontFamily: '"Poor Richard", sans-serif' }} className="font-normal text-xs sm:text-sm text-[#CDA73A]">
                                                {slide.offerText}
                                            </h1>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Static section (no swiper) */}
                    <div className="w-full  lg:w-[487px] h-auto p-4 sm:p-0 sm:mt-[15px] sm:ml-[14px] sm:mb-[36px] sm:mr-[24px] relative">
                        <div className="rounded-3xl backdrop-blur-[10px] bg-white/5 shadow-[inset_0_0_100px_rgba(204,215,255,0.15),0_5px_10px_rgba(0,0,0,0.05),0_15px_30px_rgba(0,0,0,0.05),0_30px_60px_rgba(0,0,0,0.10)] p-4 sm:p-0">
                            <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-[17px] w-full sm:max-w-[480px] sm:pl-[20px]">
                                {/* text div */}
                                <div className="mt-4 sm:mt-[36px] sm:ml-[20px] w-full sm:max-w-[331px]">
                                    <div className="items-center">
                                        <h2 className="text-[#FECA40] w-full text-xl sm:text-2xl md:text-[30px] font-bold">
                                            Download Proyojon
                                        </h2>
                                    </div>

                                    <h2 className="w-full text-gray-400 font-normal text-sm sm:text-[16px] mt-2 sm:mt-[10px]">
                                        Search local shops anytime, anywhere.
                                    </h2>

                                    <div className="mt-2 sm:mt-[10px] flex flex-col sm:flex-row justify-between w-full sm:max-w-[280px] gap-2 sm:gap-[20px]">
                                        <button className="w-full sm:max-w-[126px] border rounded-md py-1 sm:py-[4px] px-2 sm:px-[8px] border-gray-400">
                                            <div className="flex justify-center sm:justify-between items-center gap-2 sm:gap-[10px]">
                                                <div>
                                                  <FaApple></FaApple>
                                                </div>

                                                <div>
                                                    <p className="text-xs sm:text-[10px] font-normal text-gray-400">
                                                        Download on the
                                                    </p>
                                                    <p className="text-sm sm:text-[14px] text-white font-normal">
                                                        App Store
                                                    </p>
                                                </div>
                                            </div>
                                        </button>

                                        <button className="w-full sm:max-w-[126px] border rounded-md py-1 sm:py-[4px] px-2 sm:px-[8px] border-gray-400">
                                            <div className="flex justify-center sm:justify-between items-center gap-2 sm:gap-[10px]">
                                                <div>
                                                    <FaGooglePlay></FaGooglePlay>
                                                </div>

                                                <div>
                                                    <p className="text-xs sm:text-[10px] font-normal text-gray-400">
                                                        Got it on
                                                    </p>
                                                    <p className="text-sm sm:text-[14px] text-white font-normal">
                                                        Google play
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* scan */}
                                <div className="mt-4 sm:mt-[36px] w-20 h-20 sm:w-[110px] sm:h-[110px]">
                                    <Image
                                        width={110}
                                        height={110}
                                        src={scan}
                                        alt="scan Image"
                                        className="bg-cover w-full h-full bg-white"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-[26px] w-full sm:pl-[20px]">
                                <Image
                                    width={450}
                                    height={110}
                                    src={video}
                                    alt="video Image"
                                    className="bg-cover w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;