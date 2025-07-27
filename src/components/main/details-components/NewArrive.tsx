"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Link from "next/link";

interface ShopPageResponse {
  newArrival: Product[];
}

interface Product {
  id: number;
  productName: string;
  productLink: string;
  brand: {
    brand: string;
    image: string;
  };
  ProductItem: {
    id: number;
    productId: number;
    sku: string;
    price: number;
    purchasePoint: number;
    discountPrice: number;
    stock: number;
    barcode: string | null;
  }[];
  ProductImage: {
    id: number;
    productId: number;
    imageUrl: string;
    alt: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const productImage = product.ProductImage?.[0]?.imageUrl;
  const productItem = product.ProductItem?.[0];
  const hasDiscount =
    productItem?.discountPrice && productItem.discountPrice > 0;
  const finalPrice = productItem
    ? productItem.price - productItem.discountPrice
    : 0;

  // Default rating and reviews since they're not in the API response
  const rating = 5;
  const reviews = 44;

  return (
    <div className="w-full lg:max-w-[153px] sm:max-w-[180px]">
      <div className="relative w-full aspect-square">
        {productImage ? (
          <Image
            src={productImage}
            alt={product.productName}
            fill
            className="object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-xs">No Image</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium line-clamp-2">
          {product.productName}
        </p>
        <div className="flex items-center mt-1">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 w-3 h-3" />
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviews})</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm font-bold">
            {finalPrice} TK{" "}
            {hasDiscount && (
              <span className="bg-[#EE5A2C] text-white p-1 text-[8px] rounded-full ml-1">
                -
                {Math.round(
                  (productItem.discountPrice / productItem.price) * 100
                )}
                %
              </span>
            )}
          </p>
          <Button
            variant={"outline"}
            size={"xs"}
            className="text-gray-700 hover:text-[#EE5A2C] transition-colors"
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const NewArrive = ({ newArrival }: ShopPageResponse) => {
  const { translate } = useCustomTranslator();

  return (
    <div className="px-[20px] mb-10 lg:mb-0">
      <div className="lg:max-w-[343px] mt-[21px] h-auto lg:max-h-[724px] w-full shadow-lg rounded-[6px] pb-[19px] bg-[#F6F6F6] md:px-[12px] overflow-y-auto">
        <h2 className="text-xl font-semibold pt-8 pl-6">
          {translate("নতুন আগমন", "New Arrivals")}
        </h2>

        {newArrival && newArrival.length > 0 ? (
          <div className="mt-6 px-3 sm:px-4">
            {/* Two-column layout for sm and lg devices showing all products */}
            <div className="block md:hidden lg:block">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {newArrival.map((product) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/products/${product?.productLink}`}>
                  <ProductCard key={product.id} product={product} />
                  </Link>
                ))}
              </div>
            </div>
            {/* Grid layout only for md devices */}
            <div className="hidden md:grid lg:hidden grid-cols-4 gap-3 sm:gap-4 border-b border-gray-300 py-4">
              {newArrival.map((product) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/products/${product?.productLink}`}>
                  <ProductCard key={product.id} product={product} />
                  </Link>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-gray-500">
              {translate("কোন নতুন পণ্য নেই", "No new arrivals available")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrive;
