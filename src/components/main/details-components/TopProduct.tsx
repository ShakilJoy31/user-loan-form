import Image from "next/image";
import cellingFan from "../../../../assets/Home/cellingFan.png";
import wiring from "../../../../assets/Home/wiring.png";
import soket from "../../../../assets/Home/soket.png";
import light from "../../../../assets/Home/light.png";
import switch2 from "../../../../assets/Home/switch.png";
import { ShoppingCart } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// 1. Product Type
type Product = {
  id: number;
  name: string;
  image: string | StaticImport;
  size: string;
  color: string;
  price: string;
};

// 2. Product Data
const products: Product[] = [
  {
    id: 1,
    name: "Celling Fan",
    image: cellingFan,
    size: "Large",
    color: "White",
    price: "145 TK",
  },
  {
    id: 2,
    name: "House Wiring Cable",
    image: wiring,
    size: "Large",
    color: "White",
    price: "145 TK",
  },
  {
    id: 3,
    name: "6A 6 Gang 1 Way Switch",
    image: soket,
    size: "Large",
    color: "White",
    price: "145 TK",
  },
  {
    id: 4,
    name: "Walton 12W Fast Char...",
    image: light,
    size: "Large",
    color: "White",
    price: "145 TK",
  },
  {
    id: 5,
    name: "Gang Switch",
    image: switch2,
    size: "Large",
    color: "White",
    price: "145 TK",
  },
];

// 3. Reusable Product Card Component
const ProductCard = ({
  product,
  showBorder = true,
}: {
  product: Product;
  showBorder?: boolean;
}) => (
  <div className={`flex gap-3 ${showBorder ? "border-b border-gray-400 pb-3" : ""}`}>
    <div className="w-[99px] h-auto">
      <Image
        src={product.image}
        alt={product.name}
        width={99}
        height={149}
        className="w-full h-auto object-cover"
      />
    </div>
    <div className="w-full">
      <p className="text-base font-medium">{product.name}</p>
      <p className="text-xs">
        Size: <span className="text-gray-400">{product.size}</span>
      </p>
      <p className="text-xs">
        Color: <span className="text-gray-400">{product.color}</span>
      </p>
      <div className="flex justify-between items-center mt-1">
        <span>{product.price}</span>
        <button className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors">
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  </div>
);

// 4. TopProduct Component
const TopProduct = () => {
  return (
    <div className="mt-10 lg:mt-0 w-full lg:max-w-[343px] h-auto lg:max-h-[767px] shadow-lg rounded-[20px] pb-5 bg-white px-3">
      <h2 className="text-xl font-semibold pt-8 pl-3">Top Products</h2>

      {/* For sm and lg devices — 1-column list layout */}
      <div className="mt-4 space-y-3 md:hidden lg:block">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            showBorder={index !== products.length - 1}
          />
        ))}
      </div>

      {/* For md devices — 2-column grid layout */}
      <div className="hidden md:grid lg:hidden mt-4 grid grid-cols-2 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            showBorder={index < products.length - 2 || products.length % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
};

export default TopProduct;
