"use client";

import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ProductCardProps {
    product: Product;
      shopProfile: ShopProfileProps;
  newArrival: Product[];
  relatedShop: RelatedShop[];
}

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
  category: {
    name: string;
  };
  reviews: string;
  rating: number;
  id: number;
  productName: string;
  productLink: string;
  brand: Brand;
  ProductItem: ProductItem[];
  ProductImage: ProductImage[];
}

interface UserCompanyInfo {
  id: number;
  userId: number;
  shopName: string;
  ownerName: string;
  designation: string;
  profileImage: string | null;
  bannerImage: string | null;
  city: string;
  area: string;
  tradeLicense: string;
  createdAt: string;
  updatedAt: string;
}

interface ShopProfileProps {
  id: number;
  name: string;
  contactNo: string;
  profileImage: string | null;
  avatar: string;
  bannerImage: string | null;
  UserCompanyInfo: UserCompanyInfo;
}

interface CartItem {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
  subTotal: number;
  sellerShopName: string;
  sellerId: number;
  productName: string;
  productImage: string;
}

interface RelatedShop {
  id: number;
  shopName: string;
  city: string;
  area: string;
  slug: string;
  profileImage: string | null;
  bannerImage: string | null;
  avatar: string;
  user: {
    UserShopCategory: {
      category: {
        name: string;
      };
    }[];
  };
}

export default function ProductCard({ product, shopProfile }: ProductCardProps) {
    // Get the first product item for pricing and stock
    const firstProductItem = product.ProductItem?.[0];
 const discount = firstProductItem?.discountPrice || 0;
const originalPrice = firstProductItem?.price || 0;

const discountAmount = originalPrice - discount;
const discountPercentage = ((discount / originalPrice) * 100).toFixed(0);

    const isOutOfStock = (firstProductItem?.stock || 0) <= 0;
    const mainImage = product.ProductImage?.[0]?.imageUrl || "/placeholder-product.jpg";
    const router = useRouter();

     const getFirstImageUrl = (images: ProductImage[]): string => {
    return images[0]?.imageUrl || "/placeholder-product.png";
  };

      const handleAddToCart = (product: Product) => {
        const productItem = product.ProductItem[0];
    
        const cartItem = {
          productId: product.id,
          sku: productItem.sku,
          quantity: 1,
          price: productItem.price,
          subTotal: productItem.discountPrice || productItem.price, // Since quantity is 1
          sellerShopName: shopProfile?.UserCompanyInfo?.shopName,
          sellerId: shopProfile?.UserCompanyInfo?.userId,
          productName: product.productName,
          productImage: getFirstImageUrl(product.ProductImage),
        };
    
        const existingCartString = localStorage.getItem("cart");
        let existingCart: CartItem[] = [];
    
        try {
          existingCart = existingCartString ? JSON.parse(existingCartString) : [];
        } catch (error) {
          console.error("Error parsing cart data from localStorage", error);
          toast.error("Failed to load your cart. Please try again.");
          existingCart = [];
        }
    
        // Check if the exact same product (same productId and sku) already exists in cart
        const existingItem = existingCart.find(
          (item) =>
            item.productId === cartItem.productId && item.sku === cartItem.sku
        );
    
        if (existingItem) {
          toast.error(`${cartItem.productName} is already in your cart`);
          return;
        }
    
        // If we get here, the product isn't in the cart yet, so add it
        existingCart.push(cartItem);
        toast.success(`${cartItem.productName} added to cart successfully`);
    
        try {
          localStorage.setItem("cart", JSON.stringify(existingCart));
        } catch (error) {
          console.error("Error saving to cart", error);
          toast.error("Failed to update your cart. Please try again.");
          return;
        }
    
        // Optional: Log the grouped cart like in your other component
        const groupedCart = existingCart.reduce<Record<string, CartItem[]>>(
          (acc, item) => {
            const shopName = item.sellerShopName;
            if (!acc[shopName]) {
              acc[shopName] = [];
            }
            acc[shopName].push(item);
            return acc;
          },
          {}
        );
    
        console.log("Add to cart payload:", Object.values(groupedCart));
      };
    
      const handleAddToWishlist = (product: Product) => {
        const productItem = product.ProductItem[0];
    
        const wishlistItem = {
          id: product.id,
          title: product.productName,
          price: productItem.price,
          rating: product.rating || 0, // Default to 0 if not available
          reviewCount: product.reviews?.length || 0,
          date: new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
          image: getFirstImageUrl(product.ProductImage),
        };
    
        const cartItem: CartItem = {
          productId: product.id,
          sku: productItem.sku,
          quantity: 1,
          price: productItem.price,
          subTotal: productItem.discountPrice || productItem.price,
          sellerShopName: shopProfile?.UserCompanyInfo?.shopName || "Unknown Shop",
          sellerId: shopProfile?.UserCompanyInfo?.userId || 0,
          productName: product.productName,
          productImage: getFirstImageUrl(product.ProductImage),
        };
    
        const dataToSave = {
          wishlistItem,
          cartItem,
          productData: {
            id: product.id,
            productName: product.productName,
            brand: product.brand?.brand || "Unknown Brand",
            category: product.category?.name || "Unknown Category",
          },
          timestamp: new Date().toISOString(),
        };
    
        try {
          const existingWishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
          );
    
          // Check for duplicate based on productId or sku
          const isAlreadyAdded = existingWishlist.some(
            (item: { cartItem: { productId: number; sku: string } }) =>
              item.cartItem?.productId === cartItem.productId &&
              item.cartItem?.sku === cartItem.sku
          );
    
          if (isAlreadyAdded) {
            toast.error("This product is already in your wishlist");
            return;
          }
    
          const updatedWishlist = [...existingWishlist, dataToSave];
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          toast.success("Added to wishlist");
        } catch (error) {
          console.error("Failed to save to wishlist:", error);
          toast.error("Failed to save to wishlist");
        }
      };
    
      const handleBuyNow = (product: Product) => {
        const productItem = product.ProductItem[0];
    
        const existingCartString = localStorage.getItem("cart");
        let existingCart: CartItem[] = [];
    
        try {
          existingCart = existingCartString ? JSON.parse(existingCartString) : [];
        } catch (error) {
          console.error("Error parsing cart data from localStorage", error);
          toast.error("Failed to load your cart. Please try again.");
          existingCart = [];
        }
    
        // Check if the exact same product (same productId and sku) already exists in cart
        const existingItem = existingCart.find(
          (item) => item.productId === product.id && item.sku === productItem.sku
        );
    
        if (existingItem) {
          router.push("/checkout");
          return;
        }
    
        // If product not in cart, add it and proceed to checkout
        handleAddToCart(product);
        router.push("/checkout");
      };

        const isProductInWishlist = (productId: number, sku: string): boolean => {
    try {
      const existingWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      return existingWishlist.some(
        (item: { cartItem: { productId: number; sku: string } }) =>
          item.cartItem?.productId === productId && item.cartItem?.sku === sku
      );
    } catch (error) {
      console.error("Error reading wishlist", error);
      return false;
    }
  };
    
    return (
        <div className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm p-3 w-full bg-white hover:shadow-md transition-shadow ${isOutOfStock ? 'opacity-70' : ''}`}>
            {isOutOfStock && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                    Out of Stock
                </div>
            )}
            
            <div className="relative bg-gray-100 rounded-lg p-4 aspect-square">
                <Image
                    src={mainImage}
                    alt={product.productName}
                    width={300}
                    height={300}
                    className="mx-auto h-full w-full object-contain"
                />
                <Button
                                 onClick={() => handleAddToWishlist(product)}
                                 variant={"outline"}
                                 className="absolute top-1 right-1 w-8 h-8 text-gray-400 p-0.5 bg-white rounded-full hover:text-red-500"
                               >
                                 {isProductInWishlist(
                                   product.id,
                                   product.ProductItem[0].sku
                                 ) ? (
                                   <FaHeart className="w-5 h-5 text-red-500" />
                                 ) : (
                                   <FaRegHeart className="w-5 h-5" />
                                 )}
                               </Button>
            </div>

            <div className="mt-4 space-y-1">
                <Link href={`/products/${product.id}`}>
                    <h2 className="text-sm text-gray-500 truncate hover:text-orange-500">
                        {product.productName}
                    </h2>
                </Link>

                <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-black">TK{discountAmount}</span>
                    {originalPrice > discount && (
                        <>
                            <span className="line-through text-sm text-gray-400">TK{originalPrice}</span>
                            <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded">
                        -{discountPercentage}%
                      </span>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-1 text-sm">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) =>
                            i < Math.floor(product.rating || 0) ? (
                                <StarIcon key={i} className="w-4 h-4" />
                            ) : (
                                <StarOutline key={i} className="w-4 h-4" />
                            )
                        )}
                    </div>
                    <span className="text-gray-500 text-sm">(0)</span>
                </div>

                <div className="flex items-center mt-2 space-x-2">
                    <Button 
                     onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                        variant={'outline'} 
                        className="flex items-center justify-center px-3 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50"
                        disabled={isOutOfStock}
                    >
                        <ShoppingCartIcon className="w-4 h-4" />
                    </Button>

                    <Button 
                     onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleBuyNow(product);
                            }}
                        variant={'outline'} 
                        className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors"
                        disabled={isOutOfStock}
                    >
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    );
}