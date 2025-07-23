"use client";

import DataLoader from "@/components/common/DataLoader";
import AdditionalInfoCard from "@/components/main/product-details-components/AdditionalInfo";
import DeliveryOptions from "@/components/main/product-details-components/DeliveryOptions";
import PriceSection from "@/components/main/product-details-components/PriceSection";
import ProductGallery from "@/components/main/product-details-components/ProductGallery";
import ProductInfo from "@/components/main/product-details-components/ProductInfo";
import { RecommendedProducts } from "@/components/main/product-details-components/RecommendedProducts";
import RelatedShops from "@/components/main/product-details-components/RelatedShops";
import TabsSection from "@/components/main/product-details-components/TabsSection";
import { useGetProductByIdQuery } from "@/redux/features/seller-api/productApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
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

interface Specification {
  label: string;
  value: string;
}

interface Review {
  name: string;
  daysAgo: number;
  rating: number;
  title: string;
  content: string;
}

interface UserCompanyInfo {
  id: number;
  userId: number;
  shopName: string;
  slug: string;
  ownerName: string;
  designation: string;
  city: string;
  area: string;
  tradeLicense: string;
  createdAt: string;
  updatedAt: string;
}

interface Seller {
  name: string;
  UserCompanyInfo: UserCompanyInfo;
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
  specifications?: Specification[];
  description?: string | null;
  reviews?: Review[];
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

export default function ProductDetailsPage() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

      const pathname = usePathname();
    const productId = pathname?.split('/')?.pop();
    const { data: productsDetails, isLoading, isError } = useGetProductByIdQuery(productId || '', {
        skip: !productId
    });
  console.log("product details",productsDetails?.data)

  useEffect(() => {
    if (productsDetails?.data) {
      console.log("product details",productsDetails?.data)
      setProductData(productsDetails.data as ProductData);

      if (productsDetails.data.VariationType) {
        const initialOptions: Record<string, string> = {};
        productsDetails.data.VariationType.forEach((variation: VariationType) => {
          if (variation.options.length > 0) {
            initialOptions[variation.name] = variation.options[0].value;
          }
        });
        setSelectedOptions(initialOptions);
      }
    }
  }, [productsDetails]);

  const handleOptionSelect = (variationName: string, optionValue: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [variationName]: optionValue,
    }));
  };

  if (isLoading) {
    return <div><DataLoader /></div>;
  }

  if (isError || !productData) {
    return <div>Error loading product data</div>;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 pt-[40px] pb-[99px] space-y-8 ">
      <div className="flex items-center gap-x-2 pt-16">
        <span className="hover:cursor-pointer">Home</span> /{" "}
        <span className="hover-cursor-pointer">Shop Details</span> /{" "}
        <span className="hover-cursor-pointer text-[#EE5A2C]">
          {productData?.productName || "Product"}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-[122px]">
        <div className="space-y-4 w-full lg:w-1/2">
          <ProductGallery productImages={productData?.ProductImage || []} />
          <AdditionalInfoCard />
          <DeliveryOptions />
          <RecommendedProducts />
        </div>

        <div className="flex-1 space-y-4 w-full lg:w-1/2 ">
          <ProductInfo
            productName={productData?.productName || ""}
            brand={
              productData?.brand || {
                brand: "",
                id: 0,
                link: "",
                image: "",
                offerImage: null,
                description: null,
                isShippedFree: false,
                createdAt: "",
                updatedAt: "",
              }
            }
            category={
              productData?.category || {
                name: "",
                id: 0,
                serialNo: 0,
                link: "",
                image: "",
                banner: null,
                description: null,
                isShippedFree: false,
                isFullPay: false,
                createdAt: "",
                updatedAt: "",
              }
            }
            rating={productData?.rating || 0}
            ProductItem={productData?.ProductItem || []}
            VariationType={productData?.VariationType || []}
            sortDescription={productData?.sortDescription || null}
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            productData={productData} 
          />
          {productData && (
            <PriceSection
              productItems={productData.ProductItem}
              selectedOptions={selectedOptions}
              productData={productData}
            />
          )}
          <TabsSection
            specifications={productData?.specifications || null}
            description={productData?.description || null}
            reviews={productData?.reviews || null}
            rating={productData?.rating || 0}
            productName={productData?.productName || ""}
          />
        </div>
      </div>
      <RelatedShops />
    </div>
  );
}