"use client";
import { Button } from "@/components/ui/button";
import { 
  FaTrashAlt, 
  FaStar, 
  FaStarHalfAlt 
} from "react-icons/fa";
import Image from "next/image";
import wiring from "@/assets/Home/wiring.png";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";

const WishList = () => {
  const wishlistItems = [
    {
      id: 1,
      title: "TDX Sinkers",
      price: 145,
      rating: 4.5,
      reviewCount: 121,
      date: "7/5/2025, 10:21:32 PM",
      image: wiring
    },
    {
      id: 2,
      title: "TDX Sinkers",
      price: 145,
      rating: 4.5,
      reviewCount: 121,
      date: "7/5/2025, 10:21:32 PM",
      image: wiring
    },
    {
      id: 3,
      title: "TDX Sinkers",
      price: 145,
      rating: 4.5,
      reviewCount: 121,
      date: "7/5/2025, 10:21:32 PM",
      image: wiring
    },
    {
      id: 4,
      title: "TDX Sinkers",
      price: 145,
      rating: 4.5,
      reviewCount: 121,
      date: "7/5/2025, 10:21:32 PM",
      image: wiring
    },
    {
      id: 5,
      title: "TDX Sinkers",
      price: 145,
      rating: 4.5,
      reviewCount: 121,
      date: "7/5/2025, 10:21:32 PM",
      image: wiring
    },
    // Add more items here as needed
  ];

  return (
    <div className="mt-16 lg:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-[291px]">
      {/* Back Button */}
      <div className="mb-4 lg:mb-14 text-[#EE5A2C] text-[16px]">
        <Button 
          variant="outline" 
          className="p-2 h-auto text-[#EE5A2C]  flex items-center gap-1"
        >
          <IoMdArrowBack />
          Back
        </Button>
      </div>

      {/* Wishlist Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-7">
        Wishlist ({wishlistItems.length})
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {wishlistItems.map((item) => (
          <div 
            key={item.id}
            className="relative  rounded-lg w-full shadow-md transition-shadow"
          >
            {/* Delete Button */}
            <button className="absolute top-3 right-3 bg-white rounded-full  p-2  hover:text-red-500 transition-colors">
              <FaTrashAlt size={16} />
            </button>

            {/* Product Image */}
            <div className="flex justify-center mb-3 bg-gray-50">
              <Image
                src={item.image}
                alt={item.title}
                width={113}
                height={168}
                className="object-contain h-40"
              />
            </div>
            <div className="p-3">
            {/* Product Title */}
            <h3 className="text-sm font-medium mb-1 line-clamp-1">
              {item.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center text-yellow-400 text-xs mb-2">
              {[...Array(5)].map((_, i) => {
                if (i < Math.floor(item.rating)) {
                  return <FaStar key={i} className="text-xs" />;
                }
                if (i === Math.floor(item.rating) && item.rating % 1 > 0) {
                  return <FaStarHalfAlt key={i} className="text-xs" />;
                }
                return <FaStar key={i} className="text-xs text-gray-300" />;
              })}
              <span className="text-gray-500 ml-1">({item.reviewCount})</span>
            </div>

            {/* Date */}
            <div className="flex items-center text-xs text-gray-500 mb-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10m-6 4h2m-7 8h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              {item.date}
            </div>

            {/* Price + Cart Button */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{item.price} TK</span>
              <button className="bg-[#fdefea] p-2 rounded-md text-primary hover:bg-orange-100 transition-colors">
                <FiShoppingCart size={14} />
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;