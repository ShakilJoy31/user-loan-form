// contexts/CartContext.tsx
'use client';

import { createContext, useState, useEffect, useContext, useMemo } from "react";
import toast from "react-hot-toast";

// Define your product types
interface ProductImage {
  url: string;
  // other image properties
}

interface ProductItem {
  sku: string;
  price: number;
  discountPrice?: number;
  // other item properties
}

interface UserCompanyInfo {
  shopName: string;
  userId: string;
  // other company info properties
}

interface ShopProfile {
  UserCompanyInfo?: UserCompanyInfo;
  // other shop profile properties
}

interface Product {
  id: number;
  productName: string;
  ProductItem: ProductItem[];
  ProductImage: ProductImage[];
  // other product properties
}

// Cart item interface
interface CartItem {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
  subTotal: number;
  sellerShopName: string;
  sellerId: string;
  productName: string;
  productImage: string;
}

// Wishlist item interface (similar to CartItem but without quantity/subTotal)
interface WishlistItem {
  productId: number;
  sku: string;
  price: number;
  sellerShopName: string;
  sellerId: string;
  productName: string;
  productImage: string;
}

// Context type
interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  groupedCart: Record<string, CartItem[]>;
  groupedWishlist: Record<string, WishlistItem[]>;
  addToCart: (product: Product, shopProfile: ShopProfile) => void;
  removeFromCart: (productId: number, sku: string) => void;
  clearCart: () => void;
  addToWishlist: (product: Product, shopProfile: ShopProfile) => void;
  removeFromWishlist: (productId: number, sku: string) => void;
  clearWishlist: () => void;
  moveToCart: (wishlistItem: WishlistItem) => void;
  numberOfCartProduct: number;
  setNumberOfCartProduct: React.Dispatch<React.SetStateAction<number>>;
  numberOfWishlistProduct: number;
  setNumberOfWishlistProduct: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [numberOfCartProduct, setNumberOfCartProduct] = useState(0);
  const [numberOfWishlistProduct, setNumberOfWishlistProduct] = useState(0);

  // Initialize cart and wishlist from localStorage
  useEffect(() => {
    setIsMounted(true);
    const cartData = localStorage.getItem("cart");
    const wishlistData = localStorage.getItem("wishlist");
    
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData) as CartItem[];
        setCart(parsedCart);
        setNumberOfCartProduct(parsedCart.length);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        toast.error("Failed to load your cart. Please try again.");
      }
    }
    
    if (wishlistData) {
      try {
        const parsedWishlist = JSON.parse(wishlistData) as WishlistItem[];
        setWishlist(parsedWishlist);
        setNumberOfWishlistProduct(parsedWishlist.length);
      } catch (error) {
        console.error("Error parsing wishlist data:", error);
        toast.error("Failed to load your wishlist. Please try again.");
      }
    }
  }, []);

  // Update localStorage when cart or wishlist changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setNumberOfCartProduct(cart.length);
      setNumberOfWishlistProduct(wishlist.length);
    }
  }, [cart, wishlist, isMounted]);

  // Group cart items by shop
  const groupedCart = useMemo(() => {
    return cart.reduce<Record<string, CartItem[]>>((acc, item) => {
      const shopName = item.sellerShopName;
      if (!acc[shopName]) {
        acc[shopName] = [];
      }
      acc[shopName].push(item);
      return acc;
    }, {});
  }, [cart]);

  // Group wishlist items by shop
  const groupedWishlist = useMemo(() => {
    return wishlist.reduce<Record<string, WishlistItem[]>>((acc, item) => {
      const shopName = item.sellerShopName;
      if (!acc[shopName]) {
        acc[shopName] = [];
      }
      acc[shopName].push(item);
      return acc;
    }, {});
  }, [wishlist]);

  const getFirstImageUrl = (images: ProductImage[]): string => {
    return images[0]?.url || "";
  };

  const addToCart = (product: Product, shopProfile: ShopProfile) => {
    const productItem = product.ProductItem[0];
    const shopName = shopProfile.UserCompanyInfo?.shopName || "Unknown Shop";
    const sellerId = shopProfile.UserCompanyInfo?.userId || "";

    const cartItem: CartItem = {
      productId: product.id,
      sku: productItem.sku,
      quantity: 1,
      price: productItem.price,
      subTotal: productItem.discountPrice || productItem.price,
      sellerShopName: shopName,
      sellerId: sellerId,
      productName: product.productName,
      productImage: getFirstImageUrl(product.ProductImage),
    };

    // Check if item already exists in cart
    const existingItem = cart.find(
      (item) => item.productId === cartItem.productId && item.sku === cartItem.sku
    );

    if (existingItem) {
      toast.error(`${cartItem.productName} is already in your cart`);
      return;
    }

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    setNumberOfCartProduct(updatedCart.length);
    toast.success(`${cartItem.productName} added to cart successfully`);
  };

  const removeFromCart = (productId: number, sku: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.sku === sku)
    );
    setCart(updatedCart);
    setNumberOfCartProduct(updatedCart.length);
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    setNumberOfCartProduct(0);
    toast.success("Cart cleared successfully");
  };

  const addToWishlist = (product: Product, shopProfile: ShopProfile) => {
    const productItem = product.ProductItem[0];
    const shopName = shopProfile.UserCompanyInfo?.shopName || "Unknown Shop";
    const sellerId = shopProfile.UserCompanyInfo?.userId || "";

    const wishlistItem: WishlistItem = {
      productId: product.id,
      sku: productItem.sku,
      price: productItem.discountPrice || productItem.price,
      sellerShopName: shopName,
      sellerId: sellerId,
      productName: product.productName,
      productImage: getFirstImageUrl(product.ProductImage),
    };

    // Check if item already exists in wishlist
    const existingItem = wishlist.find(
      (item) => item.productId === wishlistItem.productId && item.sku === wishlistItem.sku
    );

    if (existingItem) {
      toast.error(`${wishlistItem.productName} is already in your wishlist`);
      return;
    }

    const updatedWishlist = [...wishlist, wishlistItem];
    setWishlist(updatedWishlist);
    setNumberOfWishlistProduct(updatedWishlist.length);
    toast.success(`${wishlistItem.productName} added to wishlist successfully`);
  };

  const removeFromWishlist = (productId: number, sku: string) => {
    const updatedWishlist = wishlist.filter(
      (item) => !(item.productId === productId && item.sku === sku)
    );
    setWishlist(updatedWishlist);
    setNumberOfWishlistProduct(updatedWishlist.length);
    toast.success("Item removed from wishlist");
  };

  const clearWishlist = () => {
    setWishlist([]);
    setNumberOfWishlistProduct(0);
    toast.success("Wishlist cleared successfully");
  };

  const moveToCart = (wishlistItem: WishlistItem) => {
    // Check if item already exists in cart
    const existingInCart = cart.find(
      (item) => item.productId === wishlistItem.productId && item.sku === wishlistItem.sku
    );
    
    if (existingInCart) {
      toast.error(`${wishlistItem.productName} is already in your cart`);
      return;
    }

    const cartItem: CartItem = {
      ...wishlistItem,
      quantity: 1,
      subTotal: wishlistItem.price,
    };

    const updatedCart = [...cart, cartItem];
    const updatedWishlist = wishlist.filter(
      (item) => !(item.productId === wishlistItem.productId && item.sku === wishlistItem.sku)
    );
    
    setCart(updatedCart);
    setWishlist(updatedWishlist);
    setNumberOfCartProduct(updatedCart.length);
    setNumberOfWishlistProduct(updatedWishlist.length);
    toast.success(`${wishlistItem.productName} moved to cart`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        groupedCart,
        groupedWishlist,
        addToCart,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        moveToCart,
        numberOfCartProduct,
        setNumberOfCartProduct,
        numberOfWishlistProduct,
        setNumberOfWishlistProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};