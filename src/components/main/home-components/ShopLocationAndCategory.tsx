"use client";
import React from "react";
import DropdownSearch from "./DropdownSearch";
import ShopCard from "./ShopCard";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useGetFilteredShopsQuery } from "@/redux/features/user/userApi";
import DataLoader from "@/components/common/DataLoader";

interface Shop {
    id: number;
    shopName: string;
    city: string;
    area: string;
    slug: string;
    profileImage: string | null;
    user: {
        UserShopCategory: Array<{
            category: {
                name: string;
            };
        }>;
    };
    avatar: string;
}

const ShopLocationAndCategory: React.FC = () => {
  const { translate } = useCustomTranslator();
  
  // const shops = Array(20).fill({
  //   name: translate("ফ্যাশনফিয়েস্টা", "FashionFiesta"),
  //   location: translate("বনানী", "Banani"),
  //   categories: [translate("পোশাক", "Clothing"), translate("অ্যাকসেসরিজ", "Accessories")],
  //   logoUrl: shopLogo.src,
  // });

    const { data: shopsData, isLoading, isError } = useGetFilteredShopsQuery({
    city: "",
    area: "",
    categoryId: "",
    search: "",
  });

  const shop: Shop[] = shopsData?.data || [];

    if (isLoading) {
    return <div><DataLoader /></div>;
  }

  if (isError) {
    return <div>Error loading shops</div>;
  }

  // // Log the data
  // console.log("Shops data:", shopsData?.data);
  // console.log("Loading state:", isLoading);
  // console.log("Error state:", isError);

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-semibold">
        {translate("লোকেশন এবং বিভাগ অনুযায়ী দোকান খুঁজুন", "Find shops via Locations & Category")}
      </h2>
      <DropdownSearch />

      <h2 className="text-lg sm:text-xl md:text-2xl my-3 sm:my-4 font-semibold">
        {translate("দোকান", "Shop")} <span className="text-xs sm:text-sm">{translate("১০৪k ফলাফল", "104k result")}</span>
      </h2>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {shop.map((shop, index) => (
          <ShopCard
              key={index}
              shopName={shop.shopName}
              area={shop.area}
              city={shop.city}
              user={shop.user}
              profileImage={shop.profileImage}
              avatar={shop.avatar}
              slug={shop.slug}
              id={shop.id} bannerImage={null}          />
        ))}
      </div>
    </div>
  );
};

export default ShopLocationAndCategory;