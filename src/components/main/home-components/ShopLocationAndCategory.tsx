import React from "react";
import DropdownSearch from "./DropdownSearch";
import ShopCard from "./ShopCard";
import shopLogo from '../../../../assets/Logo/shop-logo.png'

const shops = [
  {
    name: "ElectroHub",
    location: "10 no sector, Uttara",
    categories: ["Electronics", "Gadgets"],
    logoUrl: shopLogo.src,
  },
  {
    name: "GlamourZone",
    location: "Bashundhara R/A",
    categories: ["Beauty", "Skincare"],
    logoUrl: shopLogo.src,
  },
  {
    name: "BookNest",
    location: "Dhanmondi 27",
    categories: ["Books", "Stationery"],
    logoUrl: shopLogo.src,
  },
  {
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },
  {
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },{
    name: "FashionFiesta",
    location: "Banani",
    categories: ["Clothing", "Accessories"],
    logoUrl: shopLogo.src,
  },
];

const ShopLocationAndCategory: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-[24px] mb-4 font-semibold">
        Find shops via Locations & Category
      </h2>
      <DropdownSearch />

      <h2 className="text-[24px] mb-4 font-semibold mt-4">
        Shop <span className="text-[12px]">104k result</span>
      </h2>

      {/* Shop card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
