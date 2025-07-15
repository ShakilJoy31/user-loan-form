"use client";

import FilterSidebar from "@/components/main/products/FilterSidebar";
import ProductCard from "@/components/main/products/ProductCard";
import TopbarFilter from "@/components/main/products/TopbarFilter";
import React, { useState } from "react";
import productImage from '../../../../assets/Products_Image/mobile.png';
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const ProductsShowPage: React.FC = () => {
    // Mock product data
    const allProducts = Array(32).fill({
        name: "TDX Sinkers",
        currentPrice: 145,
        originalPrice: 205,
        discount: 30,
        rating: 4,
        reviewCount: 121,
        productImage: productImage.src
    });

    // State for sidebar visibility and pagination
    const [showSidebar, setShowSidebar] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    // Calculate current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    // Toggle sidebar
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // Change page
    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-2 mb-[37px] mt-16 pt-[40px]">
                <span className="hover:cursor-pointer">Home</span> / <span className="hover:cursor-pointer">Shop Details</span> / <span className="hover:cursor-pointer text-[#EE5A2C]">Buy Now</span>
            </div>

            <LayoutGroup>
                <div className="flex flex-col md:flex-row gap-6 mb-[78px]">
                    {/* Filter Sidebar - Left Column with Animation */}
                    <AnimatePresence mode="popLayout">
                        {showSidebar && (
                            <motion.div
                                layout
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 400,
                                    damping: 30,
                                    duration: 0.2
                                }}
                                className="w-full md:w-[287px]"
                            >
                                <FilterSidebar />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content - Right Column */}
                    <motion.div
                        layout
                        className={`flex-1 min-w-0`}  // Ensures content doesn't overflow
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            duration: 0.2
                        }}
                    >
                        {/* Top Filter Bar */}
                        <div className="mb-6">
                            <TopbarFilter 
                                toggleSidebar={toggleSidebar} 
                                showSidebar={showSidebar}
                            />
                        </div>

                        {/* Product Grid */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${showSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} ${showSidebar ? 'xl:grid-cols-4' : 'xl:grid-cols-5'} gap-6`}>
                            {currentProducts.map((product, index) => (
                                <ProductCard key={index} {...product} />
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
                                            className={`px-4 py-2 hover:cursor-pointer text-sm font-medium border-r border-l border-gray-300 ${currentPage === pageNumber
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
                    </motion.div>
                </div>
            </LayoutGroup>
        </main>
    );
};

export default ProductsShowPage;