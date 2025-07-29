// products/ProductsShowPage.tsx
"use client";

import FilterSidebar from "@/components/main/products/FilterSidebar";
import ProductCard from "@/components/main/products/ProductCard";
import TopbarFilter from "@/components/main/products/TopbarFilter";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Pagination from "@/components/common/Pagination";
import { useGetProductsByFilterMutation, useGetProductsQuery } from "@/redux/features/product/productApi";
import { ProductFilterParams } from "@/types/products/productInterface";
import { useGetSellerProductByIdQuery } from "@/redux/features/seller-api/productApi";
import { useParams } from "next/navigation";

interface ShopPageResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        page: number;
        size: number;
        total: number;
        totalPage: number;
    };
     shopProfile?: ShopProfile; 
    data: Product[];
    newArrival: Product[];
    relatedShop: RelatedShop[];
}

interface ShopProfile {
    id: number;
    name: string;
    email: string;
    contactNo: string;
    UserCompanyInfo: {
        id: number;
        userId: number;
        shopName: string;
        profileImage: string;
        bannerImage: string;
        slug: string;
        ownerName: string;
        designation: string;
        city: string;
        area: string;
        tradeLicense: string;
        map: string;
        about: string | null;
        createdAt: string;
        updatedAt: string;
    };
    UserShopCategory: {
        id: number;
        userId: number;
        categoryId: number;
        createdAt: string;
        updatedAt: string;
    }[];
}

interface Product {
  id: number;
  productName: string;
  productLink: string;
  category: {
    name: string;
  };
  reviews: string;
  rating: number;
  brand: {
    brand: string;
    image: string;
  };
  ProductItem: {
    id: number;
    productId: number;
    sku: string;
    price: number;
    purchasePoint: number;
    discountPrice: number;
    stock: number;
    barcode: string | null;
  }[];
  ProductImage: {
    id: number;
    productId: number;
    imageUrl: string;
    alt: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  shopProfile: {
    id: number;
    name: string;
    email: string;
    contactNo: string;
    UserCompanyInfo: {
      id: number;
      userId: number;
      shopName: string;
      profileImage: string;
      bannerImage: string;
      slug: string;
      ownerName: string;
      designation: string;
      city: string;
      area: string;
      tradeLicense: string;
      map: string;
      about: string | null;
      createdAt: string;
      updatedAt: string;
    };
    UserShopCategory: {
      id: number;
      userId: number;
      categoryId: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

interface RelatedShop {
    id: number;
    shopName: string;
    city: string;
    area: string;
    slug: string;
    profileImage: string | null;
    bannerImage: string | null;
    avatar: string;
    user: {
        UserShopCategory: {
            category: {
                name: string;
            };
        }[];
    };
}


const ProductsShowPage: React.FC = () => {
    const { translate } = useCustomTranslator();
    const [showSidebar, setShowSidebar] = useState(true);
    const [filterParams, setFilterParams] = useState<ProductFilterParams>({
        page: 1,
        perPage: 16
    });

    // Fetch all products initially
    const { data: initialProductsData } = useGetProductsQuery({});
    
    // Mutation for filtered products
    const [getFilteredProducts, { data: filteredData, isLoading }] = useGetProductsByFilterMutation();

    // Trigger the mutation whenever filterParams change
    useEffect(() => {
        const hasFilters = filterParams.categories || filterParams.brands || filterParams.minPrice || filterParams.maxPrice;
        if (hasFilters) {
            getFilteredProducts(filterParams);
        }
    }, [filterParams, getFilteredProducts]);

    // Determine which products to display
    const products = filterParams.categories || filterParams.brands || filterParams.minPrice || filterParams.maxPrice
        ? filteredData?.data || []
        : initialProductsData?.data || [];

    const totalProducts = filterParams.categories || filterParams.brands || filterParams.minPrice || filterParams.maxPrice
        ? filteredData?.meta?.total || 0
        : initialProductsData?.meta?.total || 0;

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
        setFilterParams(prev => ({
            ...prev,
            ...newFilters,
            page: 1
        }));
    };

      const [productDetailsData, setProductDetailsData] = useState<ShopPageResponse | null>(null);
        
           const { id } = useParams<{ id: string }>();
        const { data: singleProductsDetails } = useGetSellerProductByIdQuery(id || "");
        console.log("singleProductsDetails", singleProductsDetails)
        
        useEffect(() => {
          if (singleProductsDetails) {
            setProductDetailsData(singleProductsDetails);
          }
        }, [singleProductsDetails]);

        console.log("productDetailsData", productDetailsData)

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
                                    productCategory={initialProductsData?.data || []} 
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
                                    {products.map((product: Product) => (
                                        <ProductCard 
                                            key={product.id}
                                            product={product}
                                            //@ts-ignore
                                            shopProfile={productDetailsData?.shopProfile} 
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