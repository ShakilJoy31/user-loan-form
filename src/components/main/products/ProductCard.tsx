// components/ProductCard.tsx
"use client";

import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ProductCardProps {
    name: string;
    currentPrice: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviewCount: number;
    productImage: string
}

export default function ProductCard({
    name,
    currentPrice,
    originalPrice,
    discount,
    rating,
    reviewCount,
    productImage
}: ProductCardProps) {
    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm p-3 w-full bg-white hover:shadow-md transition-shadow">
            {/* Image + Wishlist */}
            <div className="relative bg-gray-100 rounded-lg p-4 aspect-square">
                <Image

                    width={300}
                    height={300}
                    src={productImage}
                    alt='Payment image'
                    className="mx-auto h-full w-full object-contain"
                />
                <button className="absolute top-1 right-1 text-gray-400 p-0.5 bg-white rounded-full hover:text-red-500">
                    <HeartIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-1">
                <h2 className="text-sm text-gray-500 truncate">{name}</h2>

                {/* Pricing */}
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-black">{currentPrice} TK</span>
                    <span className="line-through text-sm text-gray-400">{originalPrice} TK</span>
                    <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded">-{discount}%</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 text-sm">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) =>
                            i < rating ? (
                                <StarIcon key={i} className="w-4 h-4" />
                            ) : (
                                <StarOutline key={i} className="w-4 h-4" />
                            )
                        )}
                    </div>
                    <span className="text-gray-500 text-sm">({reviewCount})</span>
                </div>

                {/* Button Group */}
                <div className="flex items-center mt-2 space-x-2">
                    <button className="flex items-center justify-center px-3 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
                        <ShoppingCartIcon className="w-4 h-4" />
                    </button>
                    <button className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}