"use client";

import { useState, useEffect } from "react";

interface FilterSidebarProps {
    onClose?: () => void;
}

export default function FilterSidebar({ onClose }: FilterSidebarProps) {
    const [price, setPrice] = useState([20, 250]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full p-4 border border-gray-300 rounded-md bg-white relative">
            {/* Close button for mobile */}
            {isMobile && onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            )}

            {/* Product Category */}
            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3">Product Category</h2>
                <hr className="mb-3 border-t border-gray-200" />
                {["Phone", "Phone", "Phone"].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between mb-3 text-sm"
                    >
                        <label className="inline-flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-orange-500 border-gray-300 rounded"
                            />
                            {item}
                        </label>
                        <span className="text-xs text-gray-500">[20]</span>
                    </div>
                ))}
            </div>

            {/* Price Filter */}
            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3">Filter By Price</h2>
                <hr className="mb-3 border-t border-gray-200" />

                {/* Custom Styled Slider */}
                <div className="relative mb-2">
                    <input
                        type="range"
                        min="20"
                        max="250"
                        value={price[0]}
                        onChange={(e) => setPrice([+e.target.value, price[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #F53E32 0%, #F53E32 ${((price[0] - 20) / 230) * 100
                                }%, #ddd ${((price[0] - 20) / 230) * 100}%, #ddd 100%)`,
                        }}
                    />

                </div>

                <p className="text-sm font-semibold text-gray-800">
                    Price : ${price[0]} – ${price[1]}
                </p>

                <button className="mt-3 w-full bg-[#F53E32] text-white font-semibold text-sm py-2 rounded shadow hover:bg-red-600 transition duration-200">
                    Filter
                </button>
            </div>

            {/* Color */}
            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3 border-t border-gray-200 pt-4">
                    Color
                </h2>
                <div className="space-y-2">
                    {[
                        { name: "Blue", color: "bg-blue-500" },
                        { name: "Yellow", color: "bg-yellow-300" },
                        { name: "Red", color: "bg-red-500" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="form-checkbox text-orange-500 rounded"
                            />
                            <span className="text-sm text-gray-700">{item.name}</span>
                            <span className={`w-4 h-4 rounded-sm ml-auto ${item.color}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Weight */}
            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3 border-t border-gray-200 pt-4">
                    Weight
                </h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        "Vegetables",
                        "Juice",
                        "Food",
                        "Dry Fruits",
                        "Vegetables",
                        "Juice",
                    ].map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 text-xs rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Brands */}
            <div>
                <h2 className="font-semibold text-base mb-3 border-t border-gray-200 pt-4">
                    Brands
                </h2>
                {[
                    ["Acefast", 20],
                    ["Anker", 30],
                    ["AZEADA", 40],
                    ["Boat", 40],
                    ["Colmi", 40],
                    ["Foneng", 40],
                    ["Hoco", 40],
                    ["Huawei", 40],
                ].map(([brand, count], idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between mb-2 text-sm"
                    >
                        <label className="inline-flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                className="form-checkbox text-orange-500 rounded"
                            />
                            {brand}
                        </label>
                        <span className="text-xs text-gray-500">[{count}]</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
