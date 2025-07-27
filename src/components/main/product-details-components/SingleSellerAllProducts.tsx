"use client";
import Image from "next/image";
import { FaRegStar, FaStar, FaTrashAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface Brand {
  brand: string;
  image: string;
}

interface ProductItem {
  id: number;
  productId: number;
  sku: string;
  price: number;
  purchasePoint: number;
  discountPrice: number;
  stock: number;
  barcode: string | null;
}

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  productName: string;
  productLink: string;
  brand: Brand;
  ProductItem: ProductItem[];
  ProductImage: ProductImage[];
}

interface SingleSellerProductsProps {
  products: Product[];
}

const SingleSellerAllProducts = ({ products }: SingleSellerProductsProps) => {
  // Helper function to get the lowest price from product items
  const getLowestPrice = (items: ProductItem[]): number => {
    return Math.min(...items.map((item) => item.discountPrice || item.price));
  };

  // Helper function to get the first image URL
  const getFirstImageUrl = (images: ProductImage[]): string => {
    return images[0]?.imageUrl || "/placeholder-product.png";
  };

  // Helper function to extract options from SKU
 

  return (
    <div>
      <h2 className="text-2xl my-5 font-semibold text-center">All Products</h2>
   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
  {products.map((product) => {
    const lowestPrice = getLowestPrice(product.ProductItem);
    const firstImageUrl = getFirstImageUrl(product.ProductImage);
    
    // Sample data to match example structure
    const rating = 4;
    const reviewCount = 12;
    const originalPrice = Math.round(lowestPrice * 1.2); // Example original price
    const discount = 20; // Example discount percentage

    return (
      <div key={product.id} className="border border-gray-300 rounded-xl overflow-hidden shadow-sm p-3 w-full bg-white hover:shadow-md transition-shadow">
        {/* Image + Delete Button */}
        <div className="relative bg-gray-100 rounded-t-lg p-4 aspect-square">
          <Image
            width={300}
            height={300}
            src={firstImageUrl}
            alt={product.productName}
            className="mx-auto h-full w-full object-contain"
          />
          <Button className="absolute top-1 right-1 text-gray-400 p-0.5 bg-white rounded-full hover:text-red-500">
            <FaTrashAlt className="w-5 h-5" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h2 className="text-sm text-gray-500 truncate">{product.productName}</h2>

          {/* Pricing */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-black">{lowestPrice} TK</span>
            <span className="line-through text-sm text-gray-400">{originalPrice} TK</span>
            <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded">-{discount}%</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 text-sm">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <FaStar key={i} className="w-4 h-4" />
                ) : (
                  <FaRegStar key={i} className="w-4 h-4" />
                )
              )}
            </div>
            <span className="text-gray-500 text-sm">({reviewCount})</span>
          </div>

          {/* Button Group */}
          <div className="flex items-center mt-2 space-x-2">
            <Button variant={'outline'} className="flex items-center justify-center px-3 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
              <FiShoppingCart className="w-4 h-4" />
            </Button>

            <Button variant={'outline'} className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default SingleSellerAllProducts;