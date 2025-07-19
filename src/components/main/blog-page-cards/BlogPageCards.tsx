"use client";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import camera from "@/assets/Home/camera.png";
import person from "@/assets/Home/person.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Pagination from "@/utils/helper/Pagination";

const BlogPageCards = () => {
  const { translate } = useCustomTranslator();
  return (
    <div className="lg:max-w-[290px] w-full px-[10px] pt-[5px] lg:px-0 lg:pt-0 max-h-[378px] rounded-xl shadow-sm border overflow-hidden font-sans">
      {/* Image and Tags */}
      <div className="relative w-full h-[199px]">
        <Image
          src={camera}
          alt={translate("গার্ডেনিং ভুল", "Gardening Mistakes")}
          layout="fill"
          objectFit="cover rounded-md"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="bg-white/80 text-xs text-[#5B5B5B] px-2 py-1 rounded-md">{translate("পানি দেওয়া", "Watering")}</span>
          <span className="bg-white/80 text-xs text-[#5B5B5B] px-2 py-1 rounded-md">{translate("বাগান করা", "Gardening")}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center mb-2">
          <Image src={person} alt={translate("জোয়ানা ওয়েলিক", "Joanna Wellick")} width={20} height={20} className="rounded-full mr-2" />
          <span className="text-[#EE5A2C] font-normal text-[12px] w-[80px]">{translate("জোয়ানা ওয়েলিক", "Joanna Wellick")}</span>
          <span className="font-normal text-[10px] text-gray-300 w-[87px]">— {translate("জুন ২৮, ২০১৮", "June 28, 2018")}</span>
          <span className=" text-gray-300">•</span>
          <FaShareAlt className="text-gray-300 text-[10px]" />
          <span className="font-normal text-[10px] text-gray-300">{translate("১ হাজার শেয়ার", "1k shares")}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-black leading-tight mb-1">
          {translate("১০টি শুরু করার গার্ডেনিং ভুল যা এড়ানো উচিত", "10 Beginner Gardening Mistakes to Avoid")}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300">
          {translate("লোরেম ইপসাম ডলর সিট আমেট, কনসেক্টেটুর এডিপিসিং এলিট। ডলরুম ইইউস ইস্টে ফুগিয়াট রিপ্রিহেন্ডে...", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolorum eius iste fugiat reprehende...")}
          <span className="text-[#EE5A2C] font-medium">{translate("আরও পড়ুন", "Read More")}</span>
        </p>
      </div>
    </div>
  );
};

const BlogPageCardsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const totalCards = 12;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = [...Array(totalCards)].slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageSizeChange = (size: number) => {
    setCardsPerPage(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const { translate } = useCustomTranslator();

  return (
    <div className="px-[10px]">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 mb-8">
        {currentCards.map((_, index) => (
          <BlogPageCards key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-[40px]">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={cardsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default BlogPageCardsGrid;