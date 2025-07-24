"use client"
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    };
}

const ShopDetailsMap = ({shopProfile}: ShopPageResponse) => {
    const { translate } = useCustomTranslator();
    console.log(shopProfile)
    return (
        <div>
            <h2 className="text-3xl font-medium mb-[14px]">
                {
                    translate("দোকান তথ্য", "Shop Details")
                }
            </h2>
            <div className=" mx-auto">
                 <div className="w-full h-[256px] overflow-hidden relative">
  <div 
    className="w-full h-full" 
    dangerouslySetInnerHTML={{ __html: shopProfile?.UserCompanyInfo?.map || '' }}
  >
  </div>
</div>

                 {/* Shop information section matching the image */}
                <div className="my-4 flex justify-between items-center">
                   <div>
                     <h3 className="text-xl font-bold">{shopProfile?.UserCompanyInfo?.shopName}</h3>
                    <p className="text-gray-600">{shopProfile?.UserCompanyInfo?.area} {","} {shopProfile?.UserCompanyInfo?.city}</p>
                    
                    <div className="flex items-center mt-2">
                        {/* Rating stars */}
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-500"><FaStar /></span>
                            ))}
                        </div>
                        <span className="ml-1 text-sm">4.5/5</span>
                    </div>
                   </div>
                        <div className="flex justify-end">
                            <FaRegHeart />
                        </div>
                     <div className="max-w-[140px] max-h-[40px] mt-3 text-white bg-[#EE5A2C] font-medium rounded-lg">
                         <Link href={`/products/all-products/${shopProfile?.UserCompanyInfo?.slug}`}>
                         <Button variant={"outline"} className="py-[8px] px-[15px] text-white bg-[#EE5A2C]">
                        Shop Now →
                    </Button>
                         </Link>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetailsMap;