"use client";

import FilterSidebar from "@/components/main/products/FilterSidebar";
import ProductCard from "@/components/main/products/ProductCard";
import TopbarFilter from "@/components/main/products/TopbarFilter";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Pagination from "@/components/common/Pagination";
import { useGetProductsByFilterMutation } from "@/redux/features/product/productApi";
import { Product, ProductFilterParams } from "@/types/products/productInterface";

const ProductsShowPage: React.FC = () => {
    const { translate } = useCustomTranslator();
    const [showSidebar, setShowSidebar] = useState(true);
    const [filterParams, setFilterParams] = useState<ProductFilterParams>({
        page: 1,
        perPage: 16
    });
    const [localSort, setLocalSort] = useState<"asc" | "desc" | null>(null);

    // Mutation for filtered products
    const [getFilteredProducts, { data: filteredData, isLoading }] = useGetProductsByFilterMutation();

    // Trigger the mutation whenever filterParams change (excluding sort)
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sortOrder, ...paramsWithoutSort } = filterParams;
        getFilteredProducts(paramsWithoutSort);
    }, [filterParams, getFilteredProducts]);

    // Apply local sorting to the products
    const sortedProducts = useMemo(() => {
        if (!filteredData?.data) return [];
        
        const productsToSort = [...filteredData.data];
        
        if (localSort === "asc") {
            return productsToSort.sort((a, b) => {
                const priceA = a.ProductItem?.[0]?.price || 0;
                const priceB = b.ProductItem?.[0]?.price || 0;
                return priceA - priceB;
            });
        } else if (localSort === "desc") {
            return productsToSort.sort((a, b) => {
                const priceA = a.ProductItem?.[0]?.price || 0;
                const priceB = b.ProductItem?.[0]?.price || 0;
                return priceB - priceA;
            });
        }
        return productsToSort;
    }, [filteredData?.data, localSort]);

    const totalProducts = filteredData?.meta?.total || 0;
    const totalPages = Math.ceil(totalProducts / filterParams.perPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setFilterParams(prev => ({
                ...prev,
                page: pageNumber
            }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageSizeChange = (size: number) => {
        setFilterParams(prev => ({
            ...prev,
            perPage: size,
            page: 1
        }));
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleFilterChange = (newFilters: Partial<ProductFilterParams>) => {
        // Handle sort locally, other filters via API
        if (newFilters.sortOrder !== undefined) {
            setLocalSort(newFilters.sortOrder);
        } else {
            setFilterParams(prev => ({
                ...prev,
                ...newFilters,
                page: 1
            }));
        }
    };

    return (
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-2 mb-[37px] mt-16 pt-[40px]">
                <span className="hover:cursor-pointer">{translate("হোম", "Home")}</span> / 
                <span className="hover:cursor-pointer">{translate("দোকানের বিবরণ", "Shop Details")}</span> / 
                <span className="hover:cursor-pointer text-[#EE5A2C]">{translate("এখনই কিনুন", "Buy Now")}</span>
            </div>

            <LayoutGroup>
                <div className="flex flex-col md:flex-row gap-6 mb-[78px]">
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
                                <FilterSidebar 
                                    productCategory={sortedProducts} 
                                    onFilterChange={handleFilterChange}
                                    currentFilters={filterParams}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        layout
                        className={`flex-1 min-w-0`}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            duration: 0.2
                        }}
                    >
                        <div className="mb-6">
                           <TopbarFilter 
                                toggleSidebar={toggleSidebar}
                                showSidebar={showSidebar}
                                onSortChange={(sortOrder) => handleFilterChange({ sortOrder })}
                            />
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="border border-gray-300 rounded-xl overflow-hidden shadow-sm p-3 w-full bg-white">
                                        <div className="animate-pulse">
                                            <div className="bg-gray-200 rounded-lg aspect-square"></div>
                                            <div className="mt-4 space-y-3">
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className={`grid grid-cols-1 sm:grid-cols-2 ${showSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
                                    {sortedProducts.map((product: Product) => (
                                        <ProductCard 
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center pt-[40px]">
                                        <Pagination
                                            totalPages={totalPages}
                                            currentPage={filterParams.page}
                                            pageSize={filterParams.perPage}
                                            onPageChange={handlePageChange}
                                            onPageSizeChange={handlePageSizeChange}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </LayoutGroup>
        </main>
    );
};

export default ProductsShowPage;