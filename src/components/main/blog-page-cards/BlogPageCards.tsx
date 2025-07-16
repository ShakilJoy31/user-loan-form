"use client"
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import camera from "@/assets/Home/camera.png";
import person from "@/assets/Home/person.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const BlogPageCards = () => {
  const { translate } = useCustomTranslator();
  return (
    <div className="lg:max-w-[290px]  w-full px-[10px] pt-[5px] lg:px-0 lg:pt-0 max-h-[378px] rounded-xl shadow-sm border overflow-hidden font-sans">
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
          <FaShareAlt className="text-gray-300  text-[10px]" />
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
  const cardsPerPage = 9;
  const totalCards = 12;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = [...Array(totalCards)].slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        <nav className="inline-flex rounded-md  overflow-hidden gap-2">
          {/* Previous Button */}
          <Button variant={'outline'}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 hover:cursor-pointer text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {translate("পূর্ববর্তী", "Previous")}
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }

            return (
              <Button variant={'outline'}
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-4 py-2 hover:cursor-pointer text-sm font-medium border-r border-l border-gray-300 ${
                  currentPage === pageNumber
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </Button>
            );
          })}

          {/* Next Button */}
          <Button variant={'outline'}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 hover:cursor-pointer text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {translate("পরবর্তী", "Next")}
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default BlogPageCardsGrid;