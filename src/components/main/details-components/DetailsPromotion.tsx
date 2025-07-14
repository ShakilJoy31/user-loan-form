"use client"
import Image from "next/image";
import promotion2 from "../../../../assets/Home/promotion2.png";
import percentage from "../../../../assets/Home/percentage.png";
import percentage2 from "../../../../assets/Home/percentage2.png";
import WhatsAppImage from "../../../../assets/Home/WhatsAppImage.png";
import collectionBanner from "../../../../assets/Home/collectionBanner.png";
import WhatsAppHotLine from "../../../../assets/Home/WhatsAppHotLine.png";
import { StaticImageData } from "next/image";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

type PromotionItem = {
  image: StaticImageData;
  width: number;
  height: number;
  alt: string;
  description?: string[]; 
};

const DetailsPromotion = () => {

    const { translate } = useCustomTranslator();

  const promotions: PromotionItem[] = [
    {
      image: promotion2,
      width: 175,
      height: 279,
      alt: "promotion2",
      description: [
        "Available deals: <span class='text-[#EE5A2C]'>15% off</span>",
        "Tk. 500.",
        "15% off on minimum",
        "order value of ৳50 for",
        "all pandapro users",
        "Valid for all items."
      ]
    },
    {
      image: percentage,
      width: 160,
      height: 160,
      alt: "percentage"
    },
    {
      image: percentage2,
      width: 160,
      height: 69,
      alt: "percentage2"
    },
    {
      image: WhatsAppImage,
      width: 160,
      height: 94,
      alt: "WhatsAppImage"
    },
    {
      image: collectionBanner,
      width: 160,
      height: 160,
      alt: "collectionBanner"
    },
    {
      image: WhatsAppHotLine,
      width: 160,
      height: 160,
      alt: "WhatsAppHotLine"
    }
  ];

  return (
    <div className=" lg:max-w-[224px] lg:max-h-[1282px] w-full pl-[13px] pr-[36px] pb-[11.5px] shadow-lg rounded-[6px]">
      <h2 className="text-2xl font-semibold pt-[30px] mb-[13px]">
       {translate("Promotions", "প্রচার")}
        </h2>
      
      {/* Main Promotion */}
      <div className="mb-4">
        <Image
          width={promotions[0].width}
          height={promotions[0].height}
          src={promotions[0].image}
          alt={promotions[0].alt}
          className="w-full h-auto object-cover"
        />
        
        {promotions[0].description && (
          <div className="p-2 text-xs font-normal">
            {promotions[0].description.map((line, index) => (
              <p 
                key={index} 
                dangerouslySetInnerHTML={{ __html: line }} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Other Promotions */}
      <div className="space-y-4">
        {promotions.slice(1).map((promo, index) => (
          <Image
            key={index}
            width={promo.width}
            height={promo.height}
            src={promo.image}
            alt={promo.alt}
            className="w-full h-auto object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default DetailsPromotion;