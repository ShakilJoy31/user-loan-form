"use client";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaTrashAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const getOptionsFromSku = (sku: string): Record<string, string> => {
    const parts = sku.split("-");
    // Remove the product name and shop name parts
    const optionParts = parts.slice(2, -1);
    const options: Record<string, string> = {};
    
    // Simple approach - pair parts as key-value
    for (let i = 0; i < optionParts.length; i += 2) {
      if (i + 1 < optionParts.length) {
        options[optionParts[i]] = optionParts[i + 1];
      }
    }
    
    return options;
  };

  return (
    <div>
      <h2 className="text-2xl my-5 font-semibold text-center">All Products</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {products.map((product) => {
        const lowestPrice = getLowestPrice(product.ProductItem);
        const firstImageUrl = getFirstImageUrl(product.ProductImage);
        const firstItemOptions = getOptionsFromSku(product.ProductItem[0].sku);
        
        // For demo purposes - these would come from your actual data
        const rating = 4.5;
        const reviewCount = 12;
        const date = new Date().toLocaleDateString();

        return (
          <div
            key={product.id}
            className="relative rounded-lg w-full shadow-lg transition-shadow dark:border dark:border-white"
          >
            {/* Delete Button (if needed) */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 dark:hover:text-red-600 hover:text-red-700 text-red-500 transition-colors"
                >
                  <FaTrashAlt size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove {product.productName} from your wishlist.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Product Image */}
            <div className="flex justify-center mb-3">
              <Image
                src={firstImageUrl}
                alt={product.productName}
                width={113}
                height={168}
                className="object-contain h-40 w-full border rounded-md bg-cover"
              />
            </div>
            <div className="p-3">
              {/* Product Title */}
              <h3 className="text-sm font-medium mb-1 line-clamp-1">
                {product.productName}
              </h3>

              {/* Variant Options */}
              {Object.keys(firstItemOptions).length > 0 && (
                <div className="text-xs text-gray-500 mb-2">
                  {Object.entries(firstItemOptions).map(([key, value]) => (
                    <div key={key}>{`${key}: ${value}`}</div>
                  ))}
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center text-yellow-400 text-xs mb-2">
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(rating)) {
                    return <FaStar key={i} className="text-xs" />;
                  }
                  if (i === Math.floor(rating) && rating % 1 > 0) {
                    return <FaStarHalfAlt key={i} className="text-xs" />;
                  }
                  return <FaStar key={i} className="text-xs text-gray-300" />;
                })}
                <span className="text-gray-500 ml-1">({reviewCount})</span>
              </div>

              {/* Date */}
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10m-6 4h2m-7 8h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {date}
              </div>

              {/* Price + Cart Button */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{lowestPrice} TK</span>
                <Button
                  className="bg-[#fdefea] p-2 rounded-md text-primary hover:bg-orange-100 transition-colors"
                >
                  <FiShoppingCart size={14} />
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