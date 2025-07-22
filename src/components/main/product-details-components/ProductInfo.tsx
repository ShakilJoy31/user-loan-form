"use client";
import { FiStar } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VariationOption {
    id: number;
    value: string;
    variationTypeId: number;
}

interface VariationType {
    id: number;
    name: string;
    productId: number;
    options: VariationOption[];
}

interface ProductItemOption {
    option: {
        id: number;
        value: string;
        variationType: {
            id: number;
            name: string;
            productId: number;
        };
        variationTypeId: number;
    };
}

interface ProductItem {
    id: number;
    productId: number;
    sku: string;
    price: number;
    purchasePoint: number;
    discountPrice: number;
    stock: number;
    barcode: string | null;
    options: ProductItemOption[];
}

interface Brand {
    id: number;
    brand: string;
    link: string;
    image: string;
    offerImage: string | null;
    description: string | null;
    isShippedFree: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Category {
    id: number;
    name: string;
    serialNo: number;
    link: string;
    image: string;
    banner: string | null;
    description: string | null;
    isShippedFree: boolean;
    isFullPay: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ProductInfoProps {
    productName: string;
    brand: Brand;
    category: Category;
    rating: number;
    ProductItem: ProductItem[];
    VariationType: VariationType[];
    sortDescription: string | null;
    selectedOptions: Record<string, string>;
    onOptionSelect: (variationName: string, optionValue: string) => void;
    productData: ProductData | null; 
}

interface ProductData {
  id: number;
  productName: string;
  productLink: string;
  type: string;
  categoryId: number;
  subCategoryId: number;
  brandId: number;
  sellerId: number | null;
  rating: number;
  seoTitle: string | null;
  seoDescription: string | null;
  sortDescription: string | null;
  specifications?: { label: string; value: string }[];
  description?: string | null;
  reviews?: { name: string; daysAgo: number; rating: number; title: string; content: string }[];
  createdAt: string;
  updatedAt: string;
  vendorId: number | null;
  brand: Brand;
  category: Category;
  subCategory: {
    id: number;
    name: string;
    link: string;
    categoryId: number;
    parentSubCategoryId: number | null;
    isShippedFree: boolean;
    createdAt: string;
    updatedAt: string;
  };
  ProductImage: ProductImage[];
  VariationType: VariationType[];
  ProductItem: ProductItem[];
  seller?: Seller;
}

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Seller {
  id?: number;
  name: string;
  UserCompanyInfo: UserCompanyInfo;
}

interface UserCompanyInfo {
  id: number;
  userId: number;
  shopName: string;
  ownerName: string;
  designation: string;
  city: string;
  area: string;
  tradeLicense: string;
  createdAt: string;
  updatedAt: string;
}


export default function ProductInfo({
    productName,
    rating,
    ProductItem,
    VariationType,
    sortDescription,
    selectedOptions,
    onOptionSelect,
    productData,
}: ProductInfoProps) {
    const { translate } = useCustomTranslator();

    // Find the matching product item based on selected options
    const findSelectedProductItem = (): ProductItem | undefined => {
        return ProductItem.find(item => {
            return Object.entries(selectedOptions).every(([variationName, optionValue]) => {
                return item.options.some(
                    itemOption => itemOption.option.variationType.name === variationName && 
                                itemOption.option.value === optionValue
                );
            });
        });
    };

    const selectedProductItem = findSelectedProductItem();
    const isSelectedCombinationAvailable = !!selectedProductItem;
    
    // Calculate stock status
    const selectedStock = selectedProductItem?.stock || 0;
    const inStock = isSelectedCombinationAvailable && selectedStock > 0;
    const totalStock = ProductItem.reduce((sum, item) => sum + item.stock, 0);
    const hasAnyStock = totalStock > 0;

    // Calculate prices with discount logic
    const originalPrice = selectedProductItem?.price || 0;
    const discountAmount = selectedProductItem?.discountPrice || 0;
    const currentPrice = originalPrice - discountAmount;
    const hasDiscount = discountAmount > 0 && discountAmount < originalPrice;

    return (
        <div className="space-y-6 mt-4 lg:mt-0  dark:text-white">
            {/* Brand and Compare/Share */}
            <div className="flex items-center justify-between  dark:text-white">
                <Link href={`/products/all-products/${productData?.seller?.UserCompanyInfo?.shopName}`}>
                <p className="text-orange-600 font-bold text-sm  dark:text-white">{productData?.seller?.UserCompanyInfo?.shopName}</p>
                </Link>
                <div className="flex gap-x-2 items-center  dark:text-white">
                    <Button
                        variant={"outline"}
                        className="bg-[#F6F6F6] shadow-md px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition"
                    >
                        {translate("তুলনা যোগ করুন", "Add to compare")}
                    </Button>
                    <span>
                        <CiShare2 size={22} />
                    </span>
                </div>
            </div>

            {/* Stock Status */}
            <p className="text-sm text-gray-600  dark:text-white">
                {translate("স্ট্যাটাস:", "Status:")}{" "}
                <span className={inStock ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    {inStock
                        ? translate("স্টকে আছে", "In Stock")
                        : hasAnyStock
                            ? translate("অন্যান্য ভ্যারিয়েন্ট স্টকে আছে", "Other variants in stock")
                            : translate("স্টকে নেই", "Out of Stock")}
                </span>
            </p>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-semibold leading-tight text-gray-900  dark:text-white">
                {productName}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 text-sm text-gray-600  dark:text-white">
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <FiStar className="text-lg" />
                    {rating || "0"}
                </span>
                <span className="text-gray-800">
                    {translate("২৮৮ রিভিউ", "288 reviews")}
                </span>
                <BsDot className="text-lg text-gray-400" />
                <span>{translate("২০+ বিক্রিত", "20+ Sold")}</span>
            </div>

            {/* Price Display */}
            {originalPrice > 0 && (
                <div className="flex items-center gap-3  dark:text-white">
                    <span className="text-2xl font-bold text-[#3A4980]">
                        {currentPrice.toLocaleString()} TK
                    </span>
                    {hasDiscount && (
                        <>
                            <span className="text-lg line-through text-gray-500">
                                {originalPrice.toLocaleString()} TK
                            </span>
                            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                                {Math.round((discountAmount / originalPrice) * 100)}% OFF
                            </span>
                        </>
                    )}
                </div>
            )}

            {/* Special Offer Banner */}
            <div className=" dark:text-white flex items-center gap-4 rounded-[12px] bg-[linear-gradient(180deg,#F2973E_27.72%,#FECA40_100%)] px-6 py-4 text-white w-full max-w-[404px]">
                <div className="flex-1 text-left">
                    <p className="font-extrabold text-2xl">
                        {translate("২৫% ছাড়", "25% OFF")}
                    </p>
                    <p className="text-base font-medium mt-1 text-[#5A5A5A]">
                        {translate("যদি অর্ডার $১২০ এর উপর হয়", "If order over $120")}
                    </p>
                </div>

                <div className="flex flex-col items-end">
                    <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
                        {translate("২৪ জুলাই, ২০২৫ পর্যন্ত", "Until 24 July, 2025")}
                    </div>
                    <p className="text-white/90 mt-1 text-sm">
                        {translate("৩ দিনে শুরু", "Starts in 3 days")}
                    </p>
                    <p className="text-2xl font-bold tracking-widest mt-1 flex gap-1">
                        <span>10</span>:<span>53</span>:<span>48</span>
                    </p>
                </div>
            </div>

            {/* Short Description */}
            <ul className=" dark:text-white text-sm space-y-2 text-gray-600 list-disc list-inside pt-4">
                {sortDescription ? (
                    sortDescription
                        .split("\n")
                        .map((item, index) => <li key={index}>{item}</li>)
                ) : (
                    <li>
                        {translate("কোনো বিবরণ পাওয়া যায়নি", "No description available")}
                    </li>
                )}
            </ul>

             {/* color button */}
      {/* <div className="space-y-2 pt-4 border-t border-gray-300">
                <p className="text-sm font-medium text-gray-700">
                    {translate("একটি রং নির্বাচন করুন", "Choose a Color")}
                </p>
                <div className="flex items-center gap-4">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            className={`w-[64px] h-[64px] rounded-full flex items-center justify-center relative border-2 ${
                                selectedColor === color.id
                                    ? "border-gray-300"
                                    : "border-transparent"
                            }`}
                            onClick={() => setSelectedColor(color.id)}
                            title={color.name}
                        >
                            <div
                                className={`w-[44px] h-[44px] rounded-full ${color.bg}`}
                            ></div>
                            {selectedColor === color.id && (
                                <Check
                                    size={25}
                                    className="absolute text-white bg-gray-300 rounded-full p-[1px]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* Variation Options */}
            {VariationType.map((variation) => (
                <div
                    key={variation.id}
                    className="space-y-2 pt-4 border-t border-gray-300  dark:text-white"
                >
                    <p className="text-sm font-medium text-gray-700  dark:text-white">
                        {translate(
                            `একটি ${variation.name} নির্বাচন করুন`,
                            `Choose a ${variation.name}`
                        )}
                    </p>
                    <div className="flex flex-wrap gap-3  dark:text-white">
                        {variation.options.map((option) => (
                            <label
                                key={option.id}
                                className={`relative cursor-pointer px-3 py-1.5 text-sm rounded-[8px] flex items-center gap-2 border transition ${
                                    selectedOptions[variation.name] === option.value
                                        ? "bg-[#EDF0F8] text-[#3A4980] border-[#3A4980]"
                                        : "bg-[#F3F3F3] text-[#726C6C] border-transparent"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={variation.name}
                                    value={option.value}
                                    className="peer hidden"
                                    checked={selectedOptions[variation.name] === option.value}
                                    onChange={() =>
                                        onOptionSelect(variation.name, option.value)
                                    }
                                />
                                <span
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        selectedOptions[variation.name] === option.value
                                            ? "border-[#3A4980]"
                                            : "border-gray-400"
                                    }`}
                                >
                                    {selectedOptions[variation.name] === option.value && (
                                        <span className="w-2 h-2 bg-[#3A4980] rounded-full"></span>
                                    )}
                                </span>
                                {option.value}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            {/* Out of Stock Message */}
            {Object.keys(selectedOptions).length > 0 && !isSelectedCombinationAvailable && (
                <div className="text-red-500 font-medium text-sm">
                    {translate("এই কম্বিনেশনের পণ্য স্টকে নেই", "This combination is out of stock")}
                </div>
            )}

            <hr className="border-t border-gray-300 mt-3" />
        </div>
    );
}