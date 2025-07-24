"use client"
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

interface ShopProfile {
    id: number;
    name: string;
    email: string;
    contactNo: string;
    UserCompanyInfo: {
        id: number;
        userId: number;
        shopName: string;
        profileImage: string;
        bannerImage: string;
        slug: string;
        ownerName: string;
        designation: string;
        city: string;
        area: string;
        tradeLicense: string;
        map: string;
        about: string | null;
        createdAt: string;
        updatedAt: string;
    };
    UserShopCategory: {
        id: number;
        userId: number;
        categoryId: number;
        createdAt: string;
        updatedAt: string;
    }[];
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
    shopProfile: ShopProfile;
}

interface CartItem {
    productId: number;
    sku: string;
    quantity: number;
    price: number;
    subTotal: number;
    sellerShopName: string;
    sellerId: number;
    productName?: string;
    productImage?: string;
}

const TopProduct = ({ topProducts, shopProfile }: { topProducts: Product[]; shopProfile: ShopProfile }) => {
  const { translate } = useCustomTranslator();
  const [quantity] = useState(1);

  const handleAddToCart = (product: Product) => {
    const productItem = product.ProductItem?.[0];
    if (!productItem) {
      console.error("No product item found");
      toast.error("No product item found");
      return;
    }

    const currentPrice = (productItem.price - productItem.discountPrice);

    const cartItem: CartItem = {
      productId: product.id,
      sku: productItem.sku,
      quantity: quantity,
      price: currentPrice || 0,
      subTotal: currentPrice * quantity,
      sellerShopName: shopProfile?.UserCompanyInfo?.shopName,
      sellerId: shopProfile?.UserCompanyInfo?.userId,
      productName: product.productName,
      productImage: product.ProductImage?.[0]?.imageUrl,
    };

       const existingCartString = localStorage.getItem('cart');
    let existingCart: CartItem[] = [];
    
    try {
      existingCart = existingCartString ? JSON.parse(existingCartString) : [];
    } catch (error) {
      console.error("Error parsing cart data from localStorage", error);
      toast.error("Failed to load your cart. Please try again.");
      existingCart = [];
    }

    // Check if the exact same product (same productId and sku) already exists in cart
    const existingItem = existingCart.find(item => 
      item.productId === cartItem.productId && 
      item.sku === cartItem.sku
    );

    if (existingItem) {
      toast.error(`${cartItem.productName} is already in your cart`);
      return; // Exit the function if product already exists
    }

    // If we get here, the product isn't in the cart yet, so add it
    existingCart.push(cartItem);
    toast.success(`${cartItem.productName} added to cart successfully`);

    try {
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } catch (error) {
      console.error("Error saving to cart", error);
      toast.error("Failed to update your cart. Please try again.");
      return;
    }

    const groupedCart = existingCart.reduce<Record<string, CartItem[]>>((acc, item) => {
      const shopName = item.sellerShopName;
      if (!acc[shopName]) {
        acc[shopName] = [];
      }
      acc[shopName].push(item);
      return acc;
    }, {});

    const cartPayload = Object.values(groupedCart);



    console.log("Add to cart payload:", cartPayload);
  };

  return (
    <div className="px-[20px]">
      <div className="mt-10 lg:mt-0 w-full lg:max-w-[343px] h-auto lg:max-h-[767px] shadow-lg rounded-[20px] pb-5 bg-white md:px-3 overflow-y-auto">
        <h2 className="text-xl font-semibold pt-8 pl-3 sticky top-0 bg-white z-10">
          {translate("শীর্ষ পণ্য", "Top Products")}
        </h2>

        {topProducts && topProducts.length > 0 ? (
          <>
            {/* For sm and lg devices — 1-column list layout */}
            <div className="mt-4 space-y-3 md:hidden lg:block px-[15px] lg:px-0">
              {topProducts.map((product, index) => {
                const productImage = product.ProductImage?.[0]?.imageUrl;
                const productItem = product.ProductItem?.[0];
                const hasDiscount = productItem?.discountPrice && productItem.discountPrice > 0;
                const currentPrice = (productItem.price - productItem.discountPrice);

                return (
                  <Link key={product.id} href={`/products/${product?.productLink}`}>
                    <div className={`flex gap-3 ${index !== topProducts.length - 1 ? "border-b border-gray-400 pb-3" : ""}`}>
                      <div className="w-[99px] h-auto">
                        {productImage ? (
                          <Image
                            src={productImage}
                            alt={product.productName}
                            width={99}
                            height={149}
                            className="w-full h-auto object-cover"
                          />
                        ) : (
                          <div className="w-full h-[149px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <p className="text-base font-medium">{product.productName}</p>
                        <p className="text-xs">
                          Brand: <span className="text-gray-400">{product.brand.brand}</span>
                        </p>
                        {productItem && (
                          <div className="space-y-1">
                            <p className="text-xs">
                              Price: <span className={`${hasDiscount ? " text-gray-400" : ""}`}>
                                {currentPrice} TK
                              </span>
                            </p>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-medium">
                            {productItem ? 
                              currentPrice + " TK" 
                              : "N/A"}
                          </span>
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                          >
                            <ShoppingCart size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* For md devices — 2-column grid layout */}
            <div className="hidden md:grid lg:hidden">
              <div className="mt-4 grid grid-cols-2 gap-4 px-5">
                {topProducts.map((product, index) => {
                  const productImage = product.ProductImage?.[0]?.imageUrl;
                  const productItem = product.ProductItem?.[0];
                  const hasDiscount = productItem?.discountPrice && productItem.discountPrice > 0;
                  const currentPrice = (productItem.price - productItem.discountPrice);

                  return (
                    <div 
                      key={product.id} 
                      className={`flex gap-3 ${index < topProducts.length - 2 || topProducts.length % 2 !== 0 ? "border-b border-gray-400 pb-3" : ""}`}
                    >
                      <div className="w-[99px] h-auto">
                        {productImage ? (
                          <Image
                            src={productImage}
                            alt={product.productName}
                            width={99}
                            height={149}
                            className="w-full h-auto object-cover"
                          />
                        ) : (
                          <div className="w-full h-[149px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <p className="text-base font-medium">{product.productName}</p>
                        <p className="text-xs">
                          Brand: <span className="text-gray-400">{product.brand.brand}</span>
                        </p>
                        {productItem && (
                          <div className="space-y-1">
                            <p className="text-xs">
                              Price: <span className={`${hasDiscount ? " text-gray-400" : ""}`}>
                                {currentPrice} TK
                              </span>
                            </p>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-medium">
                            {productItem ? 
                              currentPrice + " TK" 
                              : "N/A"}
                          </span>
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                          >
                            <ShoppingCart size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-gray-500">
              {translate("কোন শীর্ষ পণ্য নেই", "No top products available")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProduct;