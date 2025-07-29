// components/main/products/FilterSidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Product, ProductFilterParams } from "@/types/products/productInterface";

interface FilterSidebarProps {
    productCategory: Product[];
    onFilterChange: (filters: Partial<ProductFilterParams>) => void;
    currentFilters: ProductFilterParams;
}

export default function FilterSidebar({ 
    productCategory, 
    onFilterChange,
    currentFilters 
}: FilterSidebarProps) {
    const { translate } = useCustomTranslator();
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [, setIsMobile] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>(currentFilters.categories || []);
    const [selectedBrands, setSelectedBrands] = useState<number[]>(currentFilters.brands || []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Extract unique categories
    const uniqueCategories = Array.from(
        new Set(productCategory?.map(product => product.category?.id).filter(Boolean))
    ).map(id => {
        const productWithCategory = productCategory.find(p => p.category?.id === id);
        return productWithCategory?.category;
    }).filter((category): category is NonNullable<typeof category> => !!category);

    // Extract unique brands
    const uniqueBrands = Array.from(
        new Set(productCategory?.map(product => product.brand?.id).filter(Boolean))
    ).map(id => {
        const productWithBrand = productCategory.find(p => p.brand?.id === id);
        return productWithBrand?.brand;
    }).filter((brand): brand is NonNullable<typeof brand> => !!brand);

    const handleCategoryChange = (id: number) => {
        const newCategories = selectedCategories.includes(id) 
            ? selectedCategories.filter(catId => catId !== id)
            : [...selectedCategories, id];
        
        setSelectedCategories(newCategories);
        onFilterChange({ categories: newCategories });
    };

    const handleBrandChange = (id: number) => {
        const newBrands = selectedBrands.includes(id)
            ? selectedBrands.filter(brandId => brandId !== id)
            : [...selectedBrands, id];
        
        setSelectedBrands(newBrands);
        onFilterChange({ brands: newBrands });
    };

    const handlePriceChange = (values: [number, number]) => {
        setPriceRange(values);
    };

    const applyPriceFilter = () => {
        onFilterChange({
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
        });
    };

    return (
        <div className="w-full p-4 border border-gray-300 rounded-md bg-white relative">
            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3">
                    {translate("পণ্য বিভাগ", "Product Category")}
                </h2>
                <hr className="mb-3 border-t border-gray-200" />
                {uniqueCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between mb-3 text-sm">
                        <label className="inline-flex items-center gap-2 text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => handleCategoryChange(category.id)}
                                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                            {category.name}
                        </label>
                        <span className="text-xs text-gray-500">
                            [{productCategory.filter(p => p.category?.id === category.id).length}]
                        </span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3">
                    {translate("দাম দ্বারা ফিল্টার করুন", "Filter By Price")}
                </h2>
                <hr className="mb-3 border-t border-gray-200" />

                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">
                            ${priceRange[0].toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">
                            ${priceRange[1].toLocaleString()}
                        </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full">
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange([+e.target.value, priceRange[1]])}
                            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                        />
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange([priceRange[0], +e.target.value])}
                            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute h-2 bg-orange-500 rounded-full"
                            style={{
                                left: `${(priceRange[0] / 100000) * 100}%`,
                                right: `${100 - (priceRange[1] / 100000) * 100}%`
                            }}
                        />
                    </div>
                </div>

                <Button 
                    onClick={applyPriceFilter}
                    variant={'outline'} 
                    className="w-full bg-[#F53E32] text-white font-semibold text-sm py-2 rounded shadow hover:bg-red-600 transition duration-200"
                >
                    {translate("ফিল্টার", "Filter")}
                </Button>
            </div>

            <div className="mb-6">
                <h2 className="font-semibold text-base mb-3 border-t border-gray-200 pt-4">
                    {translate("ব্র্যান্ড", "Brands")}
                </h2>
                {uniqueBrands.map((brand) => (
                    <div key={brand.id} className="flex items-center justify-between mb-2 text-sm">
                        <label className="inline-flex items-center gap-2 text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand.id)}
                                onChange={() => handleBrandChange(brand.id)}
                                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                            {brand.brand}
                        </label>
                        <span className="text-xs text-gray-500">
                            [{productCategory.filter(p => p.brand?.id === brand.id).length}]
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}