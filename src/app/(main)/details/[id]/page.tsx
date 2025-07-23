"use client"
import DataLoader from "@/components/common/DataLoader";
import DetailsPromotion from "@/components/main/details-components/DetailsPromotion";
import FindShopsAndLocation from "@/components/main/details-components/FindShopsAndLocation";
import NewArrive from "@/components/main/details-components/NewArrive";
import TopProduct from "@/components/main/details-components/TopProduct";
import { useGetSellerProductByIdQuery } from "@/redux/features/seller-api/productApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const Details = () => {
            const [productDetailsData, setProductDetailsData] = useState<ShopPageResponse | null>(null);
    
       const { id } = useParams<{ id: string }>();
    const { data: singleProductsDetails, isLoading, isError } = useGetSellerProductByIdQuery(id || "");
    console.log("singleProductsDetails", singleProductsDetails)
    
    useEffect(() => {
      if (singleProductsDetails) {
        setProductDetailsData(singleProductsDetails);
      }
    }, [singleProductsDetails]);

    if(isLoading){
        return <div><DataLoader /></div>
    }
    if(isError){
        return <div>Something is wrong please try again later error</div>
    }
    return (
        <div className="lg:px-4 mt-16 lg:pt-[51px] lg:flex gap-[21px] lg:mb-[80px] mx-auto max-w-[1280px]">
            <DetailsPromotion />
            <FindShopsAndLocation />
            <div>
                {productDetailsData && <TopProduct topProducts={productDetailsData?.data} />}
                
                {productDetailsData && <NewArrive newArrival={productDetailsData?.newArrival} />}
            </div>
        </div>
    );
};

export default Details;