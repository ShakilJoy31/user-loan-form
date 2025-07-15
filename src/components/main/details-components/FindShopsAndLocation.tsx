"use client"
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import DropdownSearch from "../home-components/DropdownSearch";
import ShopDetailsInfo from "./ShopDetailsInfo";
import ShopDetailsMap from "./ShopDetailsMap";


const FindShopsAndLocation = () => {
    const { translate } = useCustomTranslator();
    return (
        <div className="px-[20px]">
        <div className="mt-10 lg:mt-0 lg:max-w-[653px] h-auto lg:max-h-[1511px]  w-full shadow-lg rounded-[20px] pb-[19px] bg-[#FBFBFB]">
            <h2 className="text-[20px] font-semibold pt-[21] pl-[15px]">
                {
                    translate("অবস্থান ও বিভাগ অনুযায়ী দোকান খুঁজুন", "Find shops via Locations & Category")
                }
            </h2>

             <div className="pl-[15px] pr-[12px] pt-[16px]">
                <DropdownSearch />
             </div>

             <div className="pt-[42px] pl-[21px] pr-[12px]">
                <ShopDetailsMap />
             </div>

             <div className="pt-[14px] pl-[21px] pr-[12px]">
                <ShopDetailsInfo />
             </div>
        </div>
        </div>
    );
};

export default FindShopsAndLocation;