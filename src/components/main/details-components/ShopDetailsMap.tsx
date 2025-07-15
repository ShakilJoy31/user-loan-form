"use client"
import Image from "next/image";
import map from "../../../../assets/Home/map.png"
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Button } from "@/components/ui/button";

const ShopDetailsMap = () => {
    const { translate } = useCustomTranslator();
    return (
        <div>
            <h2 className="text-3xl font-medium mb-[14px]">
                {
                    translate("দোকান তথ্য", "Shop Details")
                }
            </h2>
            <div className="pr-[18px] mx-auto">
                <Image 
                width={614}
                height={256}
                src={map}
                alt="map"
                className="w-full h-auto object-cover"
                />

                 {/* Shop information section matching the image */}
                <div className="my-4 flex justify-between items-center">
                   <div>
                     <h3 className="text-xl font-bold">ElectroHub</h3>
                    <p className="text-gray-600">© 10 no sector, Uttara</p>
                    
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
                         <Button className="py-[8px] px-[15px]">
                        Shop Now →
                    </Button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetailsMap;