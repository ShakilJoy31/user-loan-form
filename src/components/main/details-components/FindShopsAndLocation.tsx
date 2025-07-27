"use client"
import { useEffect, useState } from "react";
import ShopDetailsInfo from "./ShopDetailsInfo";
import ShopDetailsMap from "./ShopDetailsMap";
import { useParams } from "next/navigation";
import { useGetSellerProductByIdQuery } from "@/redux/features/seller-api/productApi";

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
            storeHours: string;
            deliveryAvailable: string
            pickupAvailable: string;
            products: string;
            homeAppliances: string;
            accessories: string
        };
        UserShopCategory: {
            id: number;
            userId: number;
            categoryId: number;
            createdAt: string;
            updatedAt: string;
        }[];

    };
    data: Product[];
    newArrival: Product[];
    relatedShop: RelatedShop[];
}

interface Product {
    id: number;
    productName: string;
    productLink: string;
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

const FindShopsAndLocation = () => {
        const [productDetailsData, setProductDetailsData] = useState<ShopPageResponse | null>(null);
    
       const { id } = useParams<{ id: string }>();
    const { data: singleProductsDetails } = useGetSellerProductByIdQuery(id || "");
    console.log("singleProductsDetails", singleProductsDetails)
    
    useEffect(() => {
      if (singleProductsDetails) {
        setProductDetailsData(singleProductsDetails);
      }
    }, [singleProductsDetails]);

    return (
        <div className="px-[20px]">
        <div className="mt-10 lg:mt-0 lg:max-w-[653px] h-auto lg:max-h-[1711px]  w-full shadow-lg rounded-[20px] pb-[19px] bg-[#FBFBFB]">
             <div className="pt-[42px] pl-[21px] pr-[12px]">
               {productDetailsData &&  <ShopDetailsMap shopProfile={productDetailsData?.shopProfile} success={false} statusCode={0} message={""} meta={{
                        page: 0,
                        size: 0,
                        total: 0,
                        totalPage: 0
                    }} />}
             </div>

             <div className="pt-[14px] pl-[21px] pr-[12px]">
                {productDetailsData && <ShopDetailsInfo shopProfile={productDetailsData?.shopProfile} 
                    relatedShop= {productDetailsData?.relatedShop}
                    />}
             </div>
        </div>
        </div>
    );
};

export default FindShopsAndLocation;