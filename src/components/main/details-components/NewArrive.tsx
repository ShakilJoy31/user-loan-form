"use client"
import Image from "next/image";
import pip from "../../../../assets/Home/image.png";
import collectionBanner from "../../../../assets/Home/collectionBanner.png";
import tool from "../../../../assets/Home/tool.png";
import toolBox from "../../../../assets/Home/toolBox.png";
import { FaStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Product {
  id: number;
  image: string | StaticImport;
  name: string;
  price: string;
  discount: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

const products: Product[] = [
  {
    id: 1,
    image: pip,
    name: "50 Mm Jindal GI Pipe",
    price: "500 TK",
    discount: "-10%",
    rating: 5,
    reviews: 44,
  },
  {
    id: 2,
    image: collectionBanner,
    name: "50 Mm Jindal GI Pipe",
    price: "500 TK",
    discount: "-10%",
    rating: 5,
    reviews: 44,
  },
  {
    id: 3,
    image: tool,
    name: "50 Mm Jindal GI Pipe",
    price: "500 TK",
    discount: "-10%",
    rating: 5,
    reviews: 44,
  },
  {
    id: 4,
    image: toolBox,
    name: "50 Mm Jindal GI Pipe",
    price: "500 TK",
    discount: "-10%",
    rating: 5,
    reviews: 44,
  },
];

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-full lg:max-w-[153px] sm:max-w-[180px]">
      <div className="relative w-full aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium line-clamp-2">{product.name}</p>
        <div className="flex items-center mt-1">
          {[...Array(product.rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 w-3 h-3" />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm font-bold">
            {product.price}{" "}
            {product.discount && (
              <span className="bg-[#EE5A2C] text-white p-1 text-[8px] rounded-full ml-1">
                -10%
              </span>
            )}
          </p>
          <button className="text-gray-700 hover:text-[#EE5A2C] transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const NewArrive = () => {
  return (
    <div className="lg:max-w-[343px] mt-[21px] h-auto lg:max-h-[724px] w-full shadow-lg rounded-[6px] pb-[19px] bg-[#F6F6F6] px-[12px]">
      <h2 className="text-xl font-semibold pt-8 pl-6">New Arrivals</h2>

      <div className="mt-6 px-3 sm:px-4">
        {/* Flex layout for sm and lg (not md) */}
        <div className="block md:hidden lg:block">
          {/* First row */}
          <div className="flex gap-3 sm:gap-4 pb-4 border-b border-gray-300">
            <ProductCard product={products[0]} />
            <ProductCard product={products[1]} />
          </div>

          {/* Second row */}
          <div className="flex gap-3 sm:gap-4 pt-4">
            <ProductCard product={products[2]} />
            <ProductCard product={products[3]} />
          </div>
        </div>

        {/* Grid layout only for md devices */}
        <div className="hidden md:grid lg:hidden grid-cols-4 gap-3 sm:gap-4 border-b border-gray-300 py-4">
          <ProductCard product={products[0]} />
          <ProductCard product={products[1]} />
          <ProductCard product={products[2]} />
          <ProductCard product={products[3]} />
        </div>
      </div>
    </div>
  );
};

export default NewArrive;
