import React from "react";
import { FiMapPin, FiBookmark } from "react-icons/fi";
import Image from "next/image";

interface ShopCardProps {
  name: string;
  location: string;
  categories: string[];
  logoUrl?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({ name, location, categories, logoUrl }) => {
  return (
    <div className="dark:bg-black dark:text-white dark:border dark:border-white w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] bg-white rounded-lg sm:rounded-xl shadow p-2 sm:p-3 relative flex flex-col justify-between">
      <div className="dark:bg-black dark:text-white absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-400 cursor-pointer">
        <FiBookmark size={14} className="sm:w-4 sm:h-4" />
      </div>

      <div>
        {logoUrl && (
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 dark:bg-black dark:text-white">
            <Image
              src={logoUrl}
              alt={name}
              fill
              className="object-contain dark:bg-black dark:text-white"
            />
          </div>
        )}
        <h3 className="dark:bg-black dark:text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-black line-clamp-1">
          {name}
        </h3>
        <p className="dark:bg-black dark:text-white text-xs text-gray-500 flex items-center mt-1">
          <FiMapPin className="mr-1 w-3 h-3" />
          <span className="dark:bg-black dark:text-white line-clamp-1">{location}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2 dark:bg-black dark:text-white">
        {categories.map((cat, index) => (
          <span
            key={index}
            className="bg-[#FFF4ED] dark:bg-black dark:text-white text-[#EE5A2C] text-[8px] xs:text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="flex justify-between mt-2 sm:mt-3 ">
        {/* Need to use this reusable button */}
         {/* <Button
          variant="primary"
          size="xs"
          shape="rounded"
          className="bg-[#EE5A2C] text-white text-[10px] sm:text-[12px] px-2 sm:px-3 py-1 font-medium"
        >
          Shop Now
        </Button> */}
        
        <button className="bg-[#EE5A2C] dark:bg-black dark:text-white dark:border dark:border-white dark:rounded-md text-white text-[10px] sm:text-[12px] px-2 sm:px-3 py-1 rounded font-medium">
          Shop Now
        </button>

        <button className="bg-gray-100 dark:bg-black dark:text-white dark:border dark:border-white dark:rounded-md text-gray-700 text-[10px] sm:text-[12px] px-2 sm:px-3 py-1 rounded font-medium">
          Details
        </button>
      </div>
    </div>
  );
};

export default ShopCard;