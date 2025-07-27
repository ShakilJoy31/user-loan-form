"use client";
import ShopCard from "../home-components/ShopCard";
import shopLogo from '@/assets/Logo/shop-logo.png';
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

export default function RelatedShops() {
    const { translate } = useCustomTranslator();
    
    const shops = Array(6).fill({
        name: translate("ফ্যাশন ফিয়েস্টা", "FashionFiesta"),
        location: translate("বনানী", "Banani"),
        categories: [
            translate("পোশাক", "Clothing"), 
            translate("অ্যাকসেসরিজ", "Accessories")
        ],
        logoUrl: shopLogo.src,
    });

    return (
        <div>
            <h3 className="font-semibold text-lg mb-3">
                {translate("সম্পর্কিত দোকান", "Related Shops")}
            </h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {shops.map((shop, index) => (
                    <ShopCard
                        key={index}
              shopName={shop.shopName}
              area={shop.area}
              city={shop.city}
              user={shop.user}
              profileImage={shop.profileImage}
              avatar={shop.avatar}
              slug={shop.slug}
              id={shop.id} bannerImage={null}    
                    />
                ))}
            </div>
        </div>
    );
}