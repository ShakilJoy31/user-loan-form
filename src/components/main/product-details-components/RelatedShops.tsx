import ShopCard from "../home-components/ShopCard";
import shopLogo from '../../../../assets/Logo/shop-logo.png'

// const shops = [
//   { name: "FoodBazaar", tags: ["Grocery"], logo: "/shop1.png" },
//   { name: "BookCafe", tags: ["Books"], logo: "/shop2.png" },
//   { name: "GadgetZone", tags: ["Electronics"], logo: "/shop3.png" },
// ];

export default function RelatedShops() {
    const shops = Array(6).fill({
  name: "FashionFiesta",
  location: "Banani",
  categories: ["Clothing", "Accessories"],
  logoUrl: shopLogo.src,
});


  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Related Shops</h3>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
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
}
