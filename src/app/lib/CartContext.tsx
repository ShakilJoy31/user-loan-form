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

// Context type
interface CartContextType {
  cart: CartItem[];
  groupedCart: Record<string, CartItem[]>;
  addToCart: (product: Product, shopProfile: ShopProfile) => void;
  removeFromCart: (productId: number, sku: string) => void;
  clearCart: () => void;
  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    setIsMounted(true);
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData) as CartItem[];
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        toast.error("Failed to load your cart. Please try again.");
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

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
    toast.success(`${cartItem.productName} added to cart successfully`);

    console.log("Add to cart payload:", Object.values(groupedCart));
  };

  const removeFromCart = (productId: number, sku: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.sku === sku)
    );
    setCart(updatedCart);
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared successfully");
  };

  const [cartItemCount, setCartItemCount] = useState(cart.length)
  
  console.log(cartItemCount)

  return (
    <CartContext.Provider
      value={{
        cart,
        groupedCart,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount,
        setCartItemCount,
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