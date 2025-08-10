"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Autoplay } from "swiper/modules";
import swiperImage from "@/assets/Home/slider-1.svg";

import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const industries = [
  { id: 1, name: "Travel & Hospitality", image: swiperImage.src, bg: "bg-gray-400" },
  { id: 2, name: "Startup", image: swiperImage.src, bg: "bg-green-400" },
  { id: 3, name: "Finance & Banking", image: swiperImage.src, bg: "bg-teal-400" },
  { id: 4, name: "E-commerce & Retail", image: swiperImage.src, bg: "bg-gray-200" },
  { id: 5, name: "Real Estate", image: swiperImage.src, bg: "bg-purple-200" },
  { id: 6, name: "Education & E-Learning", image: swiperImage.src, bg: "bg-orange-400" },
  { id: 7, name: "Media & Entertainment", image: swiperImage.src, bg: "bg-blue-400" },
  { id: 8, name: "Health & Fitness", image: swiperImage.src, bg: "bg-sky-300" },
  { id: 9, name: "Manufacturing & Logistics", image: swiperImage.src, bg: "bg-green-300" },
  { id: 10, name: "Food & Beverage", image: swiperImage.src, bg: "bg-red-300" },
  { id: 11, name: "Automotive", image: swiperImage.src, bg: "bg-yellow-300" },
  { id: 12, name: "Agriculture", image: swiperImage.src, bg: "bg-lime-300" },
  { id: 13, name: "Energy & Utilities", image: swiperImage.src, bg: "bg-amber-400" },
  { id: 14, name: "Telecommunications", image: swiperImage.src, bg: "bg-indigo-300" },
  { id: 15, name: "Government & Public Sector", image: swiperImage.src, bg: "bg-blue-200" },
  { id: 16, name: "Non-Profit & Social Services", image: swiperImage.src, bg: "bg-pink-300" },
  { id: 17, name: "Legal Services", image: swiperImage.src, bg: "bg-purple-300" },
  { id: 18, name: "Construction", image: swiperImage.src, bg: "bg-orange-300" },
  { id: 19, name: "Beauty & Cosmetics", image: swiperImage.src, bg: "bg-fuchsia-300" },
  { id: 20, name: "Sports & Recreation", image: swiperImage.src, bg: "bg-emerald-400" }
];

const IndustryExpertise = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full py-12 bg-white dark:bg-background dark:border">
      <div className="max-w-full mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Industry <span className="text-blue-500">Expertise</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Our deep understanding of diverse industries empowers us to design customized software solutions.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            320: { slidesPerView: 2.5 },
            640: { slidesPerView: 4.5 },
            1024: { slidesPerView: 9 },
          }}
        >
          {industries.map((item) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg ${
                    isActive ? "scale-110" : "scale-90 opacity-70"
                  } ${item.bg}`}
                >
                  <div className="w-[95px] h-[82px] mb-3 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain w-[95px] h-[82px] "
                    />
                  </div>
                  <h3 className="text-xs md:text-sm font-medium text-white drop-shadow">
                    {item.name}
                  </h3>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default IndustryExpertise;
