"use client";

import Image from "next/image";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import shopLogo from '@/assets/Products_Image/switch.jpg'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
    alt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface ProductGalleryProps {
    productImages?: ProductImage[];
}

export default function ProductGallery({ productImages = [] }: ProductGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { translate } = useCustomTranslator();

    // Use product images if available, otherwise fall back to default thumbnails
    const thumbnails = productImages.length > 0 
        ? productImages.map(img => img.imageUrl) 
        : [shopLogo.src, shopLogo.src, shopLogo.src, shopLogo.src];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full space-y-[16px] flex flex-col  dark:text-white">
            {/* Main Image */}
            <div className="">
                <Image 
                    style={{borderRadius: '16px'}}
                    src={thumbnails[currentImageIndex]}
                    alt={translate("প্রধান পণ্য", "Main Product")}
                    width={350}
                    height={350}
                    className="border w-full h-full dark:bg-black dark:text-white lg:w-[502px] lg:h-[439px] bg-[#F7EDE1] pt-[24px] pr-[42px] pb-[17px] pl-[34px]"
                />
            </div>

            {/* Thumbnails with arrows */}
            <div className="flex items-center gap-4 w-full  dark:text-white">
                <Button variant={'outline'}
                    onClick={prevImage}
                    className="p-2 text-gray-600 hover:text-[#f15a29] transition-colors"
                    aria-label={translate("পূর্ববর্তী ছবি", "Previous image")}
                >
                    <FaArrowLeftLong size={20} />
                </Button>

                <div className="flex gap-2">
                    {thumbnails.map((thumb, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`rounded-[16px] overflow-hidden border-2 dark:bg-black dark:text-white ${currentImageIndex === idx ? 'border-[#1A432E]' : 'border-transparent'}`}
                        >
                            <Image
                                src={thumb}
                                alt={translate(`থাম্বনেইল ${idx}`, `Thumbnail ${idx}`)}
                                width={70}
                                height={70}
                                className="rounded-[16px] cursor-pointer dark:bg-black dark:text-white"
                            />
                        </div>
                    ))}
                </div>

                <Button variant={'outline'}
                    onClick={nextImage}
                    className="p-2 text-gray-600 hover:text-[#f15a29] transition-colors"
                    aria-label={translate("পরবর্তী ছবি", "Next image")}
                >
                    <FaArrowRightLong size={20} />
                </Button>
            </div>
        </div>
    );
}