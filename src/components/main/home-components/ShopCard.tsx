import React from "react";
import { FiMapPin, FiBookmark } from "react-icons/fi";

interface ShopCardProps {
  name: string;
  location: string;
  categories: string[];
  logoUrl?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({ name, location, categories, logoUrl }) => {
  return (
    <div className="w-full h-[220px] bg-white rounded-xl shadow p-3 relative flex flex-col justify-between">
      {/* Bookmark */}
      <div className="absolute top-3 right-3 text-gray-400 cursor-pointer">
        <FiBookmark size={18} />
      </div>

      {/* Logo and name */}
      <div>
        {logoUrl && (
          <img src={logoUrl} alt={name} className="h-6 w-6 object-contain mb-2" />
        )}
        <h3 className="text-xl font-semibold text-black">{name}</h3>
        <p className="text-xs text-gray-500 flex items-center mt-1">
          <FiMapPin className="mr-1" />
          {location}
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((cat, index) => (
          <span
            key={index}
            className="bg-[#FFF4ED] text-[#EE5A2C] text-[10px] font-medium px-2 py-1 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-3">
        <button className="bg-[#EE5A2C] text-white text-[12px] px-3 py-1 rounded font-medium">
          Shop Now
        </button>
        <button className="bg-gray-100 text-gray-700 text-[12px] px-3 py-1 rounded font-medium">
          Details
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
