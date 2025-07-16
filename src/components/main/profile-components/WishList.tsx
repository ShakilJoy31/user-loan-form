"use client";
import Image from "next/image";
import { FiTrash2, FiCalendar } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import computer from "@/assets/Products_Image/computer.png";
import { Button } from "@/components/ui/button";

// Sample data
const wishlistItems = new Array(4).fill({
  id: 1,
  title: "3D computer improved version",
  price: "800 Tk",
  rating: 5,
  reviews: 121,
  date: "7/5/2025, 10:21:32 PM",
  image: computer.src, 
});

export default function WishlistTab() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">Wish–List</h2>
      <p className="text-sm text-gray-500 mb-6">Trac your order Status</p>

      {/* Wishlist Box */}
      <div className="bg-white border rounded-xl">
        {wishlistItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-5 border-b last:border-b-0"
          >
            <div className="flex items-center ">
              <Button variant={'outline'} className="text-gray-500 pl-[22px] pr-[32px] hover:text-red-500 flex items-center justify-center h-full">
                <FiTrash2 size={18} />
              </Button>

              <Image
                src={item.image}
                alt={item.title}
                width={70}
                height={70}
                className="rounded-md object-cover"
              />

              <div className="text-sm space-y-1 pl-[16px]">
                <p className="font-medium text-gray-800">{item.title}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array(item.rating)
                    .fill(0)
                    .map((_, i) => (
                      <AiFillStar key={i} size={14} />
                    ))}
                  <span className="text-xs text-gray-500">({item.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <FiCalendar size={13} />
                  {item.date}
                </div>
              </div>
            </div>

            {/* Price + Button */}
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <span className="text-sm font-semibold bg-[#FEEFE8] text-[#1E1E1E] px-4 py-1 rounded-md">
                {item.price}
              </span>
              <Button variant={'outline'} className="bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-md transition">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
          Previous
        </Button>
        {[1, 2, 3].map((page) => (
          <Button variant={'outline'}
            key={page}
            className={`text-sm px-3 py-1 border rounded-md ${
              page === 1
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </Button>
        ))}
        <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
          Next
        </Button>
      </div>
    </div>
  );
}