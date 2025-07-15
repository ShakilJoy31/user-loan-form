"use client";


import Image from "next/image";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import shopLogo from '../../../../assets/Products_Image/switch.jpg'
import { useState } from "react";

const thumbnails = [shopLogo.src, shopLogo.src, shopLogo.src];

export default function ProductGallery() {
    // State to track current main image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to handle next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to handle previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full space-y-[16px]">
            {/* Main Image */}
            <div className="lg:pl-[37px]">
                <Image style={{borderRadius: '16px'}}
                    src={thumbnails[currentImageIndex]}
                    alt="Main Product"
                    width={350}
                    height={350}
                    className="border w-full h-full lg:w-[502px] lg:h-[439px] bg-[#F7EDE1] pt-[24px] pr-[42px] pb-[17px] pl-[29px]"
                />
            </div>

            {/* Thumbnails with arrows */}
            <div className="flex items-center justify-center gap-4">
                {/* Left Arrow */}
                <button 
                    onClick={prevImage}
                    className="p-2 text-gray-600 hover:text-[#f15a29] transition-colors"
                    aria-label="Previous image"
                >
                    <FaArrowLeftLong size={20} />
                </button>

                {/* Thumbnails */}
                <div className="flex gap-2">
                    {thumbnails.map((thumb, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`rounded-[16px] overflow-hidden border-2 ${currentImageIndex === idx ? 'border-[#1A432E]' : 'border-transparent'}`}
                        >
                            <Image
                                src={thumb}
                                alt={`Thumbnail ${idx}`}
                                width={70}
                                height={70}
                                className="rounded-[16px] cursor-pointer"
                            />
                        </button>
                    ))}
                </div>

                {/* Right Arrow */}
                <button 
                    onClick={nextImage}
                    className="p-2 text-gray-600 hover:text-[#f15a29] transition-colors"
                    aria-label="Next image"
                >
                    <FaArrowRightLong size={20} />
                </button>
            </div>
        </div>
    );
}