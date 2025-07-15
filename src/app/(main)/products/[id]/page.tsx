import AdditionalInfoCard from "@/components/main/product-details-components/AdditionalInfo";
import DeliveryOptions from "@/components/main/product-details-components/DeliveryOptions";
import PriceSection from "@/components/main/product-details-components/PriceSection";
import ProductGallery from "@/components/main/product-details-components/ProductGallery";
import ProductInfo from "@/components/main/product-details-components/ProductInfo";
import { RecommendedProducts } from "@/components/main/product-details-components/RecommendedProducts";
import RelatedShops from "@/components/main/product-details-components/RelatedShops";
import TabsSection from "@/components/main/product-details-components/TabsSection";


export default function ProductDetailsPage() {
    return (
        <div className="max-w-[1280px] mx-auto px-4  space-y-8">
            <div className="flex items-center gap-x-2">
                <span className="hover:cursor-pointer">Home</span> / <span className="hover:cursor-pointer">Shop Details</span> / <span className="hover:cursor-pointer text-[#EE5A2C] ">Gang Light</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-x-[122px]">
                <div className="space-y-4 w-full lg:w-1/2">
                    <ProductGallery />
                    <AdditionalInfoCard></AdditionalInfoCard>
                    <DeliveryOptions />
                    <RecommendedProducts />
                </div>

                <div className="flex-1 space-y-4 w-full lg:w-1/2">
                    <ProductInfo />
                    <PriceSection />
                     <TabsSection />
                </div>
            </div>
            <RelatedShops />
        </div>
    );
}
