"use client"
import SingleSellerAllProducts from "@/components/main/product-details-components/SingleSellerAllProducts";
import SingleSellerProfile from "@/components/main/product-details-components/SingleSellerProfile";
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
}

interface ShopProfile {
  id: number;
  name: string;
  contactNo: string;
  UserCompanyInfo: UserCompanyInfo;
  avatar: string;
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
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://proyojon-backend.vercel.app/api/v1/user/get-seller-product/4"
                );
                const data: ApiResponse = await response.json();
                setSellerData(data);
                console.log("seller data:", data);
            } catch (err) {
                console.error("Error fetching product data:", err);
            }
        }
        fetchData();
    }, []);
    
    return (
        <div className="max-w-[1280px] mx-auto px-4 pt-[40px] pb-[99px] space-y-8 ">
            <div className="flex items-center gap-x-2 pt-16">
                <span className="hover:cursor-pointer">Home</span> /{" "}
                <span className="hover-cursor-pointer">Shop Details</span> /{" "}
            </div>

            
                {sellerData && <SingleSellerProfile shopProfile={sellerData.shopProfile} />}
            <div>
                {sellerData && <SingleSellerAllProducts products={sellerData.data} />}
            </div>
        </div>
    );
};

export default SingleSellerProducts;