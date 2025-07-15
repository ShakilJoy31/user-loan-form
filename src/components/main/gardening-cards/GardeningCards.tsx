"use client"
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import camera from "../../../../assets/Home/camera.png";
import person from "../../../../assets/Home/person.png";
import { useState } from "react";

const GardeningCards = () => {
  return (
    <div className="lg:max-w-[290px]  w-full px-[10px] pt-[5px] lg:px-0 lg:pt-0 max-h-[378px] rounded-xl shadow-sm border overflow-hidden font-sans">
      {/* Image and Tags */}
      <div className="relative w-full h-[199px]">
        <Image
          src={camera}
          alt="Gardening Mistakes"
          layout="fill"
          objectFit="cover rounded-md"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="bg-white/80 text-xs text-[#5B5B5B] px-2 py-1 rounded-md">Watering</span>
          <span className="bg-white/80 text-xs text-[#5B5B5B] px-2 py-1 rounded-md">Gardening</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center mb-2">
          <Image src={person} alt="Joanna Wellick" width={20} height={20} className="rounded-full mr-2" />
          <span className="text-[#EE5A2C] font-normal text-[12px] w-[80px]">Joanna Wellick</span>
          <span className="font-normal text-[10px] text-gray-300 w-[87px]">— June 28, 2018</span>
          <span className=" text-gray-300">•</span>
          <FaShareAlt className="text-gray-300  text-[10px]" />
          <span className="font-normal text-[10px] text-gray-300">1k shares</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-black leading-tight mb-1">
          10 Beginner Gardening Mistakes to Avoid
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolorum eius iste fugiat reprehende…
          <span className="text-[#EE5A2C] font-medium">Read More</span>
        </p>
      </div>
    </div>
  );
};

const GardeningCardsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // You can adjust this number based on your needs
  const totalCards = 12; // Total number of cards you have
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  // Calculate current cards to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = [...Array(totalCards)].slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-[10px]">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 mb-8">
        {currentCards.map((_, index) => (
          <GardeningCards key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-[40px]">
        <nav className="inline-flex rounded-md shadow-sm overflow-hidden border border-gray-300">
          {/* Previous Button */}
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 hover:cursor-pointer text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Previous
          </button>

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
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-4 py-2 hover:cursor-pointer text-sm font-medium border-r border-l border-gray-300 ${
                  currentPage === pageNumber
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 hover:cursor-pointer text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default GardeningCardsGrid;