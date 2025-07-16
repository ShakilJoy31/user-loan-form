"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import sellerImage from "../../../assets/Seller/Photo.png";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";

const slides = [
  {
    image: sellerImage,
    title: "Discover Local Stores",
    description: "Create your account and explore products from your nearby retailers.",
  },
  {
    image: sellerImage,
    title: "Shop Smarter, Not Harder",
    description: "Find the best local deals without leaving your home.",
  },
  {
    image: sellerImage,
    title: "Support Small Businesses",
    description: "Connect with your neighborhood’s best stores and services.",
  },
];

const SellerCreateImageSwiper = () => {
  return (
    <div className="max-w-[632px] mt-10 lg:mt-0 px-[20px] lg:px-0 max-h-[865px] w-full h-full rounded-2xl overflow-hidden relative">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
              width={632}
              height={865}
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
                
              />
              <div className="absolute top-4 right-4">
                <Button className="bg-white/90 hover:bg-white px-4 py-1 rounded-full text-sm font-medium text-black shadow">
                  Go back to Website <span className="-rotate-45 ml-[2px] text-lg"><FiArrowRight /> </span>
                </Button>
              </div>
              <div className="absolute bottom-10 left-0 w-full text-center px-4 text-white">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">{slide.title}</h2>
                <p className="text-sm sm:text-base">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination override for styling */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 16px !important;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.4;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default SellerCreateImageSwiper;
