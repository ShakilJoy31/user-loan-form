"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

interface ShopPageResponse {
  newArrival: Product[];
  shopProfile: ShopProfile[];
}

interface ShopProfile {
    id?: number;
    name?: string;
    email?: string;
    contactNo?: string;
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

const ProductCard = ({ product, handleAddToCart }: { 
  product: Product, 
  shopProfile: ShopProfile,
  handleAddToCart: (product: Product) => void 
}) => {
  const productImage = product.ProductImage?.[0]?.imageUrl;
  const productItem = product.ProductItem?.[0];
  const hasDiscount =
    productItem?.discountPrice && productItem.discountPrice > 0;
  const finalPrice = productItem
    ? productItem.price - productItem.discountPrice
    : 0;

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
          {/* add to cart */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(product);
            }}
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

const NewArrive = ({ newArrival, shopProfile }: ShopPageResponse) => {
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
      sellerShopName: shopProfile[0]?.UserCompanyInfo?.shopName,
      sellerId: shopProfile[0]?.UserCompanyInfo?.userId,
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
                  <Link key={product.id} href={`/products/${product?.productLink}`}>
                    <ProductCard 
                      product={product} 
                      shopProfile={shopProfile[0]}
                      handleAddToCart={handleAddToCart}
                    />
                  </Link>
                ))}
              </div>
            </div>
            {/* Grid layout only for md devices */}
            <div className="hidden md:grid lg:hidden grid-cols-4 gap-3 sm:gap-4 border-b border-gray-300 py-4">
              {newArrival.map((product) => (
                <Link key={product.id} href={`/products/${product?.productLink}`}>
                  <ProductCard 
                    product={product} 
                    shopProfile={shopProfile[0]}
                    handleAddToCart={handleAddToCart}
                  />
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