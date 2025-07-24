"use client";
import DataLoader from "@/components/common/DataLoader";
import SingleSellerAllProducts from "@/components/main/product-details-components/SingleSellerAllProducts";
import SingleSellerProfile from "@/components/main/product-details-components/SingleSellerProfile";
import { useGetSellerProductByIdQuery } from "@/redux/features/seller-api/productApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define interfaces for the response data
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
  profileImage: string | null;
  bannerImage: string | null;
}

interface ShopProfile {
  id: number;
  name: string;
  contactNo: string;
  UserCompanyInfo: UserCompanyInfo;
  avatar: string;
  profileImage: string | null;
  bannerImage: string | null;
}

interface Brand {
  brand: string;
  image: string;
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
}

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  productName: string;
  productLink: string;
  brand: Brand;
  ProductItem: ProductItem[];
  ProductImage: ProductImage[];
}

interface Meta {
  page: number;
  size: number;
  total: number;
  totalPage: number;
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: Meta;
  shopProfile: ShopProfile;
  data: Product[];
}

const SingleSellerProducts = () => {
  const [sellerData, setSellerData] = useState<ApiResponse | null>(null);

  const { id } = useParams<{ id: string }>();
  const {
    data: sellerSingleProducts,
    isLoading,
    isError,
  } = useGetSellerProductByIdQuery(id || "");
  console.log("sellerSingleProducts", sellerSingleProducts);

  useEffect(() => {
    if (sellerSingleProducts) {
      setSellerData(sellerSingleProducts);
    }
  }, [sellerSingleProducts]);

  if (isLoading || !sellerData) {
    return (
      <div className="flex justify-center mt-40">
        <DataLoader />
      </div>
    );
  }

  if (isError) {
    return <p>Filed to load data</p>;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 pt-[40px] pb-[99px] space-y-8 ">
      <div className="flex items-center gap-x-2 pt-16">
        <span className="hover:cursor-pointer">Home</span> /{" "}
        <span className="hover-cursor-pointer">Shop Details</span> /{" "}
      </div>

        <SingleSellerProfile shopProfile={sellerData.shopProfile} />
    
      <div>
          <SingleSellerAllProducts
            shopProfile={sellerData.shopProfile}
            products={sellerData.data}
          />
      </div>
    </div>
  );
};

export default SingleSellerProducts;
