"use client";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PriceSection() {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="space-y-4 mt-6">
      {/* Pricing */}
      <div className="text-2xl font-bold text-orange-600">
        400 Tk{" "}
        <span className="line-through text-gray-400 text-base font-normal">
          $50.99
        </span>
      </div>

      {/* Quantity & Buttons */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 shadow-sm">
          <Button variant={'outline'}
            onClick={decreaseQty}
            className="px-2 text-xl text-gray-600 hover:text-black"
          >
            –
          </Button>
          <span className="px-3 text-sm">{quantity}</span>
          <Button variant={'outline'}
            onClick={increaseQty}
            className="px-2 text-xl text-gray-600 hover:text-black"
          >
            +
          </Button>
        </div>

        {/* Action Buttons */}
        <Button variant={'outline'} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-semibold text-sm shadow-md">
          Buy Now
        </Button>
        <Button variant={'outline'} className="border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
          Add to Cart <PiShoppingCartSimpleBold className="text-lg" />
        </Button>
      </div>

      {/* Extra Info Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 border-b border-gray-300 mt-4 py-4">
        <div className="flex items-center gap-2 cursor-pointer hover:text-black">
          <FiHeart className="text-base" />
          <span>Add to wishlist</span>
        </div>
        <div className="flex items-center gap-2 text-orange-600 font-medium">
          <Check size={16} className="text-orange-500" />
          6 Months Official Warranty
        </div>
        <div className="text-gray-500 underline cursor-pointer hover:text-black">
          Exchange Policy
        </div>
      </div>
    </div>
  );
}
