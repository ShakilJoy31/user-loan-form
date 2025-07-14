import React from "react";
import DropdownSearch from "./DropdownSearch";
import ShopCard from "./ShopCard";
import shopLogo from '../../../../assets/Logo/shop-logo.png'

const shops = Array(12).fill({
  name: "FashionFiesta",
  location: "Banani",
  categories: ["Clothing", "Accessories"],
  logoUrl: shopLogo.src,
});

const ShopLocationAndCategory: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-semibold">
        Find shops via Locations & Category
      </h2>
      <DropdownSearch />

      <h2 className="text-lg sm:text-xl md:text-2xl my-3 sm:my-4 font-semibold">
        Shop <span className="text-xs sm:text-sm">104k result</span>
      </h2>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {shops.map((shop, index) => (
          <ShopCard
            key={index}
            name={shop.name}
            location={shop.location}
            categories={shop.categories}
            logoUrl={shop.logoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopLocationAndCategory;