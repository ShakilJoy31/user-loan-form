"use client";
import Image from "next/image";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import product5 from "@/assets/Products_Image/products.jpg";
import { Button } from "@/components/ui/button";
// import { IoMdGitCompare } from "react-icons/io";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { useGetReviewByProductQuery } from "@/redux/features/review/reviewApi";
import { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
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

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProductItemOption {
  option: string;
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

interface SubCategory {
  id: number;
  name: string;
  link: string;
  categoryId: number;
  parentSubCategoryId: number | null;
  isShippedFree: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: number;
  rating: number;
  // Add other review properties as needed
}

interface Product {
  id: number;
  productName: string;
  productLink: string;
  type: string;
  categoryId: number;
  subCategoryId: number;
  brandId: number;
  sellerId: number;
  rating: number;
  isTop: boolean;
  isNew: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  sortDescription: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  category: Category;
  subCategory: SubCategory;
  ProductImage: ProductImage[];
  VariationType: VariationType[];
  ProductItem: ProductItem[];
}

interface ProductsResponse {
  data: Product[];
  // Add other response properties as needed
}

interface ReviewResponse {
  data: Review[];
  // Add other response properties as needed
}

interface Property {
  key: string;
  label: string;
}

export default function CompareTab() {
  const { translate } = useCustomTranslator();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([null, null]);
  const [productIds, setProductIds] = useState<(number | null)[]>([null, null]);

  const { data: searchResults, isLoading } = useGetProductsQuery(
    { search: searchTerm },
    { skip: !searchTerm }
  );

  // Only fetch reviews if the productId is not null
  const { data: reviewsData1 } = useGetReviewByProductQuery(productIds[0] as number, {
    skip: !productIds[0],
  });
  const { data: reviewsData2 } = useGetReviewByProductQuery(productIds[1] as number, {
    skip: !productIds[1],
  });

  const reviews1 = useMemo(() => (reviewsData1 as ReviewResponse)?.data || [], [reviewsData1]);
  const reviews2 = useMemo(() => (reviewsData2 as ReviewResponse)?.data || [], [reviewsData2]);

  const averageRating1 = useMemo(() => {
    if (!reviews1.length) return 0;
    const sum = reviews1.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews1.length).toFixed(1);
  }, [reviews1]);

  const averageRating2 = useMemo(() => {
    if (!reviews2.length) return 0;
    const sum = reviews2.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews2.length).toFixed(1);
  }, [reviews2]);

  const handleProductSelect = (product: Product) => {
    const updatedProducts = [...selectedProducts];
    const updatedProductIds = [...productIds];
    
    if (!updatedProducts[0]) {
      updatedProducts[0] = product;
      updatedProductIds[0] = product.id;
    } else if (!updatedProducts[1]) {
      updatedProducts[1] = product;
      updatedProductIds[1] = product.id;
    } else {
      console.log("Both slots are filled. Clear one slot to add more.");
    }
    
    setSelectedProducts(updatedProducts);
    setProductIds(updatedProductIds);
    setSearchTerm("");
  };

  console.log(selectedProducts)

  const clearSlot = (index: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = null;
    setSelectedProducts(updatedProducts);
    
    const updatedProductIds = [...productIds];
    updatedProductIds[index] = null;
    setProductIds(updatedProductIds);
  };

  const removeAll = () => {
    setSelectedProducts([null, null]);
    setProductIds([null, null]);
  };

  // Define properties with both English and Bangla keys
  const properties: Property[] = [
    { key: "image", label: translate("ছবি", "Image") },
    { key: "brand", label: translate("ব্র্যান্ড", "Brand") },
    { key: "rating", label: translate("রেটিং", "Rating") },
    { key: "ram", label: translate("র‍্যাম", "RAM") },
    { key: "storage", label: translate("স্টোরেজ", "Storage") },
    { key: "price", label: translate("দাম", "Price") },
    { key: "discountPrice", label: translate("ডিসকাউন্ট মূল্য", "Discount Price") },
    { key: "bookingPrice", label: translate("বুকিং মূল্য", "Booking Price") },
    { key: "description", label: translate("বিবরণ", "Description") },
  ];

const findVariation = (product: Product, variationName: string) => {
  return product.VariationType.find(v => 
    v.name.toLowerCase() === variationName.toLowerCase()
  );
};

const getRamValue = (product: Product): string => {
  const ramVariation = findVariation(product, "ram");
  return ramVariation?.options?.[0]?.value || "-";
};

const getStorageValue = (product: Product): string => {
  const romVariation = findVariation(product, "rom");
  return romVariation?.options?.[0]?.value || "-";
};

  const getPriceValue = (product: Product): string => {
    if (!product.ProductItem.length) return "-";
    return `${product.ProductItem[0].price} TK`;
  };

  const getDiscountPriceValue = (product: Product): string => {
    if (!product.ProductItem.length) return "-";
    return `${product.ProductItem[0].discountPrice} TK`;
  };

  return (
    <div className="bg-white p-6 shadow-sm dark:bg-black dark:border border-gray-300 rounded-md dark:text-white">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4 border-b border-gray-300 pb-[14px]">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {translate("পণ্য তুলনা করুন", "Compare products")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-white">
            {translate("আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন", "Track your order Status")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-[23px] gap-4 flex-wrap">
        {/* <Button variant={'outline'} className="bg-[#F6F6F6] dark:bg-black dark:text-white dark:border dark:border-white gap-x-[4px] shadow-md px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition">
          {translate("তুলনা যোগ করুন", "Add to compare")} <span><IoMdGitCompare /></span>
        </Button> */}

        <div className="mb-4 w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Search for a product..."
            className="border rounded-lg px-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="bg-white border rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg">
              {isLoading ? (
                <p className="text-center p-4">Loading...</p>
              ) : (searchResults as ProductsResponse)?.data?.length > 0 ? (
                (searchResults as ProductsResponse).data.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.productName}
                  </div>
                ))
              ) : (
                <p className="text-center p-4 text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg p-1">
        <table className="min-w-[700px] w-full text-sm text-left dark:bg-black dark:text-white ">
          <thead>
            <tr className="text-gray-700">
              <th className="py-3 px-4 text-sm font-medium w-[160px]">
                <p 
                  onClick={removeAll}
                  className="text-sm text-[#EB4335] underline hover:text-red-600 dark:text-white cursor-pointer"
                >
                  {translate("সব মুছে ফেলুন", "Remove all")}
                </p>
              </th>
              {selectedProducts.map((product, index) => (
                <th
                  key={index}
                  className="py-3 px-4 text-sm font-semibold text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    {product ? (
                      <>
                        <p 
                          onClick={() => clearSlot(index)}
                          className="text-[#EB4335] hover:text-red-500 cursor-pointer"
                        >
                          <FiTrash2 />
                        </p>
                        <p className="text-gray-800 dark:text-white">
                          {product.productName}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-400">{translate("খালি স্লট", "Empty Slot")}</p>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={index}
                className={`${index % 2 !== 1 ? "bg-[#FFF1E9] dark:bg-black" : "bg-white dark:bg-black"}`}
              >
                <td className={`py-3 px-4 font-medium bg-[#FDEFEA] dark:bg-black dark:text-white dark:border dark:border-white ${properties.length === index + 1 ? '' : 'border-b border-[#EE5A2C]'}`}>
                  {property.label}
                </td>
                {selectedProducts.map((product, idx) => (
                  <td
                    key={idx}
                    className="py-3 px-4 text-center align-middle dark:bg-black dark:text-white dark:border dark:border-white"
                  >
                    {product ? (
                      <>
                        {property.key === "image" ? (
                          <Image
                            src={product.ProductImage[0]?.imageUrl || product5.src}
                            alt={product.productName}
                            width={80}
                            height={80}
                            className="inline-block rounded-md mx-auto"
                          />
                        ) : property.key === "rating" ? (
                          <div className="flex justify-center items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={
                                  idx === 0
                                    ? i < Number(averageRating1)
                                      ? "text-yellow-500 text-sm"
                                      : "text-gray-400 text-sm"
                                    : i < Number(averageRating2)
                                    ? "text-yellow-500 text-sm"
                                    : "text-gray-400 text-sm"
                                }
                              />
                            ))}
                          </div>
                        ) : property.key === "description" ? (
                          <div className="text-xs text-gray-600 flex flex-col dark:text-white">
                            <div 
                              dangerouslySetInnerHTML={{ __html: product.sortDescription || '' }}
                              className="mb-2 [&_img]:w-full [&_img]:h-auto"
                            />
                            <div className="flex items-center gap-x-[7px] justify-center">
                              <span className="p-2 bg-white rounded-sm">
                                <FiShoppingCart size={14} color={'#642612'} />
                              </span>
                              <Link href={`/products/${product?.productLink}`}>
                              <Button 
                              variant={'outline'} className="flex items-center gap-1 text-white bg-[#EE5A2C] hover:bg-orange-600 text-xs px-4 py-1.5 rounded-sm hover:text-white">
                                {translate("বিস্তারিত দেখুন", "View details")}
                              </Button>
                              </Link>
                            </div>
                          </div>
                        ) : property.key === "ram" ? (
                          getRamValue(product)
                        ) : property.key === "storage" ? (
                          getStorageValue(product)
                        ) : property.key === "price" ? (
                          getPriceValue(product)
                        ) : property.key === "discountPrice" ? (
                          getDiscountPriceValue(product)
                        ) : property.key === "bookingPrice" ? (
                          "-" // Replace with actual booking price logic if available
                        ) : property.key === "brand" ? (
                          product.brand?.brand || "-"
                        ) : (
                          "-"
                        )}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}