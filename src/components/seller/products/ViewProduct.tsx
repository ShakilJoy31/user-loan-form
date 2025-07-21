// src/components/seller/products/ViewProduct.tsx
"use client";

import { useGetProductByIdQuery } from "@/redux/features/seller-api/productApi";
import { MessageSquare } from "lucide-react";
import { useEffect, useMemo } from "react";
import DataLoader from "@/components/common/DataLoader";
import toast from "react-hot-toast";
import ViewVariationComponent from "./ViewVariationComponent";
import ViewProductImageUploader from "./ViewProductImageUploader";
import { ProductImage, ProductItem, ProductItemOption, ProductResponse, ProductVariationType, VariationOption } from "@/types/seller/addProduct";
import { usePathname } from "next/navigation";

const ViewProduct = () => {
    const pathname = usePathname();
    const productId = pathname?.split('/')?.pop();
    const { data: productData, isLoading, error } = useGetProductByIdQuery(productId || '', {
        skip: !productId
    });

    useEffect(() => {
        if (error) {
            toast.error("Failed to load product");
        }
    }, [error]);

    // Transform product data to match the form structure
    const product = useMemo(() => {
        if (!productData?.data) return null;

        const product: ProductResponse = productData.data;
        return {
            name: product.productName,
            categoryId: product.categoryId,
            subCategoryId: product.subCategoryId,
            brandId: product.brandId,
            images: product.ProductImage.map((img: ProductImage) => img.imageUrl),
            tags: [], // Not available in response
            variations: product.VariationType.map((variation: ProductVariationType) => ({
                name: variation.name,
                options: variation.options.map((opt: VariationOption) => opt.value)
            })),
            items: product.ProductItem.map((item: ProductItem) => ({
                sku: item.sku,
                price: item.price,
                stock: item.stock,
                optionValues: item.options.map((opt: ProductItemOption) => opt.option.value)
            })),
            description: product.description || '',
            longDescription: product.sortDescription || '', // Assuming this is long description
            seoDescription: product.seoDescription || '',
            type: product.type,
            seoTitle: product.seoTitle || ''
        };
    }, [productData]);

    if (isLoading) {
        return <div className="flex justify-center"><DataLoader /></div>;
    }

    if (!product) {
        return <div className="flex justify-center">Product not found</div>;
    }

    return (
        <div className="relative bg-white p-6 border rounded-md shadow-sm mt-[15px]">
            {/* Floating Chat Button */}
            <button className="absolute top-4 right-4 bg-[#F4552F] hover:bg-[#e34724] p-2 rounded-md text-white">
                <MessageSquare size={18} />
            </button>

            {/* Header */}
            <div>
                {/* First Row */}
                <div className="flex justify-between items-center my-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        View Product Details
                    </h2>
                </div>

                {/* Basic Details Section */}
                <div className="border rounded-md p-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-4">
                        Basic Details
                    </h3>

                    {/* Product Title */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Product Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={product.name}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 bg-gray-100"
                            disabled
                        />
                    </div>

                    {/* Selects */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <ViewSelectField
                            label="Select Type"
                            value={product.type}
                        />

                        <ViewSelectField
                            label="Select Category"
                            value={productData?.data.category.name}
                        />

                        <ViewSelectField
                            label="Select Subcategory"
                            value={productData?.data.subCategory.name}
                        />

                        <ViewSelectField
                            label="Select Brand"
                            value={productData?.data.brand.brand}
                        />

                        <ViewMultiSelectField
                            label="Select Tag Name"
                            selected={product.tags}
                        />

                        <ViewSelectField
                            label="SEO Title"
                            value={product.seoTitle || "Not set"}
                        />
                    </div>

                    {/* SEO Description */}
                    <div>
                        <label className="text-sm font-semibold text-gray-800 mb-1 block">
                            SEO Description
                        </label>
                        <textarea
                            value={product.seoDescription || ""}
                            className="w-full min-h-[100px] border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 bg-gray-100 resize-y"
                            disabled
                        />
                    </div>
                </div>

                {/* Variation Section */}
                <ViewVariationComponent
                    variations={product.variations}
                    variationCombinations={product.items}
                />

                {/* Image Uploader Section */}
                <div className="mt-6">
                    <ViewProductImageUploader
                        images={product.images}
                    />
                </div>

                {/* Product Description */}
                <div className="border rounded-xl p-[24px] mt-6">
                    <div className="mt-10">
                        <label className="mb-3 text-[16px] block">Product Description</label>
                        <div
                            className="border rounded p-4 bg-gray-100 min-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: product.description || "No description" }}
                        />
                    </div>

                    <div className="mt-10">
                        <label className="mb-3 text-[16px] block">Long Description</label>
                        <div
                            className="border rounded p-4 bg-gray-100 min-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: product.longDescription || "No long description" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable View Select Field Component
const ViewSelectField = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    value={value}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 bg-gray-100"
                />
            </div>
        </div>
    );
};

interface ViewMultiSelectFieldProps {
    label: string;
    selected: string[];
}

const ViewMultiSelectField: React.FC<ViewMultiSelectFieldProps> = ({
    label,
    selected,
}) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-100 min-h-[42px]">
                <div className="flex flex-wrap gap-1">
                    {selected.length > 0 ? (
                        selected.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400">No tags selected</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;