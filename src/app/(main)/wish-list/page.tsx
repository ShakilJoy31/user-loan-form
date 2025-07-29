"use client";
import { Button } from "@/components/ui/button";
import { 
  FaTrashAlt, 
  FaStar, 
  FaStarHalfAlt 
} from "react-icons/fa";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import DataLoader from "@/components/common/DataLoader";
import toast from "react-hot-toast";
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

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  date: string;
  image: string;
}

interface CartItem {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  subTotal: number;
  sellerShopName: string;
  sellerId: number;
  productName: string;
  productImage: string;
}

interface ProductData {
  id: number;
  productName: string;
  brand: string;
  category: string;
}

interface WishlistEntry {
  wishlistItem: WishlistItem;
  cartItem: CartItem;
  selectedOptions: Record<string, string>;
  productData: ProductData;
  timestamp: string;
}

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistData = () => {
      try {
        const wishlistData = localStorage.getItem('wishlist');
        if (wishlistData) {
          const parsedWishlist = JSON.parse(wishlistData);
          console.log("wishlist", parsedWishlist);
          // If the data is an object, convert it to an array
          const itemsArray: WishlistEntry[] = (Array.isArray(parsedWishlist) 
            ? parsedWishlist 
            : [parsedWishlist]
          ).map(item => ({
            ...item,
            selectedOptions: item.selectedOptions || {}
          }));
          setWishlistItems(itemsArray);
        }
      } catch (error) {
        console.error("Error parsing wishlist data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, []);

  const handleRemoveItem = (sku: string) => {
    try {
      // Find the item being deleted for the toast message
      const deletedItem = wishlistItems.find(item => 
        item.cartItem.sku === sku
      );
      
      // Filter out only the item with the matching ID
      const updatedWishlist = wishlistItems.filter(item => 
        item.cartItem.sku !== sku
      );
      
      // Update state and localStorage
      setWishlistItems(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Show success message with the deleted item's name
      if (deletedItem) {
        toast.success(`${deletedItem.wishlistItem.title} removed from wishlist`);
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item from wishlist. Please try again.");
    }
  };

  const handleAddToCart = (item: WishlistEntry) => {
    try {
      // Get existing cart items from localStorage
      const existingCart = localStorage.getItem('cart');
      const cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
      
      // Check if this item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        cartItem => cartItem.sku === item.cartItem.sku
      );
      
      if (existingItemIndex >= 0) {
        // Show message that item is already in cart
        toast.error(`${item.cartItem.productName} is already in your cart!`);
        return; // Exit the function without adding again
      } else {
        // Item doesn't exist, add new item
        cartItems.push(item.cartItem);
        
        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        // Show success toast
        toast.success(`${item.cartItem.productName} added to cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="mt-16 lg:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-[291px]">
        <DataLoader />
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div className="mt-16 lg:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-[291px]">
        <div className="mb-4 lg:mb-14 text-[#EE5A2C] text-[16px]">
          <Button 
            variant="outline" 
            className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
          >
            <IoMdArrowBack />
            Back
          </Button>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-7">
          Your wishlist is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-16 lg:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-[291px]">
      {/* Back Button */}
      <div className="mb-4 lg:mb-14 text-[#EE5A2C] text-[16px]">
        <Button 
          variant="outline" 
          className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
        >
          <IoMdArrowBack />
          Back
        </Button>
      </div>

      {/* Wishlist Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-7">
        Wishlist ({wishlistItems?.length})
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {wishlistItems.map((item) => (
          <div 
            key={item.wishlistItem.id}
            className="relative rounded-lg w-full shadow-lg transition-shadow dark:border dark:border-white"
          >
            {/* Delete Button with Confirmation Modal */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant={'outline'} 
                  className="absolute top-3 right-3 bg-white rounded-full p-2 dark:hover:text-red-600 hover:text-red-700  text-red-500 transition-colors"
                >
                  <FaTrashAlt size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove {item.wishlistItem.title} from your wishlist.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleRemoveItem(item.cartItem.sku)}
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
                src={item.wishlistItem?.image}
                alt={item.wishlistItem?.title}
                width={113}
                height={168}
                className="object-contain h-40 w-full border rounded-md"
              />
            </div>
            <div className="p-3">
              {/* Product Title */}
              <h3 className="text-sm font-medium mb-1 line-clamp-1">
                {item.wishlistItem?.title}
              </h3>

              {/* Variant Options */}
              {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                <div className="text-xs text-gray-500 mb-2">
                  {Object.entries(item.selectedOptions).map(([key, value]) => (
                    <div key={key}>{`${key}: ${value}`}</div>
                  ))}
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center text-yellow-400 text-xs mb-2">
                {[...Array(5)]?.map((_, i) => {
                  if (i < Math.floor(item.wishlistItem.rating)) {
                    return <FaStar key={i} className="text-xs" />;
                  }
                  if (i === Math.floor(item.wishlistItem.rating) && item.wishlistItem.rating % 1 > 0) {
                    return <FaStarHalfAlt key={i} className="text-xs" />;
                  }
                  return <FaStar key={i} className="text-xs text-gray-300" />;
                })}
                <span className="text-gray-500 ml-1">({item.wishlistItem.reviewCount})</span>
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
                {item.wishlistItem?.date}
              </div>

              {/* Price + Cart Button */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {item.wishlistItem?.price} TK
                </span>
                <Button 
                  className="bg-[#fdefea] p-2 rounded-md text-primary hover:bg-orange-100 transition-colors"
                  onClick={() => handleAddToCart(item)}
                >
                  <FiShoppingCart size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;