"use client";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import toast from "react-hot-toast";

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Brand {
  id: number;
  brand: string;
  link: string;
  image: string;
  offerImage: string | null;
  description: string | null;
  isShippedFree: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  serialNo: number;
  link: string;
  image: string;
  banner: string | null;
  description: string | null;
  isShippedFree: boolean;
  isFullPay: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VariationOption {
  id: number;
  value: string;
  variationTypeId: number;
}

interface VariationType {
  id: number;
  name: string;
  productId: number;
  options: VariationOption[];
}

interface ProductItemOption {
  option: {
    id: number;
    value: string;
    variationType: {
      id: number;
      name: string;
      productId: number;
    };
    variationTypeId: number;
  };
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
  options: ProductItemOption[];
}

interface UserCompanyInfo {
  id: number;
  userId: number;
  shopName: string;
  ownerName: string;
  designation: string;
  city: string;
  area: string;
  tradeLicense: string;
  createdAt: string;
  updatedAt: string;
}

interface Seller {
  id?: number;
  name: string;
  UserCompanyInfo: UserCompanyInfo;
}

interface ProductData {
  id: number;
  productName: string;
  productLink: string;
  type: string;
  categoryId: number;
  subCategoryId: number;
  brandId: number;
  sellerId: number | null;
  rating: number;
  seoTitle: string | null;
  seoDescription: string | null;
  sortDescription: string | null;
  specifications?: { label: string; value: string }[];
  description?: string | null;
  reviews?: { name: string; daysAgo: number; rating: number; title: string; content: string }[];
  createdAt: string;
  updatedAt: string;
  vendorId: number | null;
  brand: Brand;
  category: Category;
  subCategory: {
    id: number;
    name: string;
    link: string;
    categoryId: number;
    parentSubCategoryId: number | null;
    isShippedFree: boolean;
    createdAt: string;
    updatedAt: string;
  };
  ProductImage: ProductImage[];
  VariationType: VariationType[];
  ProductItem: ProductItem[];
  seller?: Seller;
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

interface PriceSectionProps {
  productItems: ProductItem[];
  selectedOptions: Record<string, string>;
  productData: ProductData;
}

export default function PriceSection({ productItems, selectedOptions, productData }: PriceSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { translate } = useCustomTranslator();

  const findMatchingProductItem = (): ProductItem | undefined => {
    return productItems.find(item => {
      return item.options.every(itemOption => {
        const variationTypeName = itemOption.option.variationType.name;
        const selectedValue = selectedOptions[variationTypeName];
        return itemOption.option.value === selectedValue;
      });
    });
  };

  const matchingProduct = findMatchingProductItem();
  const unitPrice = matchingProduct?.price || 0;
  const unitDiscountPrice = matchingProduct?.discountPrice || 0;
  
  const actualDiscountPrice = unitPrice - unitDiscountPrice;
  const hasDiscount = unitDiscountPrice > 0 && unitDiscountPrice < unitPrice;
  
  const currentPrice = hasDiscount ? actualDiscountPrice : unitPrice;
  const subTotal = currentPrice * quantity;
  const originalSubTotal = unitPrice * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (matchingProduct && newQuantity > matchingProduct.stock) return;
    setQuantity(newQuantity);
  };

 const handleAddToCart = () => {
  if (!matchingProduct) {
    console.error("No matching product found for selected options");
    toast.error("No matching product found for selected options");
    return;
  }

  const cartItem: CartItem = {
    productId: matchingProduct.productId,
    sku: matchingProduct.sku,
    quantity: quantity,
    price: currentPrice,
    subTotal: subTotal,
    sellerShopName: productData.seller?.UserCompanyInfo?.shopName || "Unknown Shop",
    sellerId: productData.seller?.id || productData.sellerId || 0,
    productName: productData.productName,
    productImage: productData.ProductImage?.[0]?.imageUrl,
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


const handleAddToWishlist = () => {
  if (!matchingProduct) {
    console.error("No matching product found for selected options");
    toast.error("No matching product found for selected options");
    return;
  }

  const wishlistItem = {
    id: productData.id,
    title: productData.productName,
    price: currentPrice,
    rating: productData.rating,
    reviewCount: productData.reviews?.length || 0,
    date: new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }),
    image: productData.ProductImage?.[0]?.imageUrl || ''
  };

  const cartItem: CartItem = {
    productId: matchingProduct.productId,
    sku: matchingProduct.sku,
    quantity: quantity,
    price: currentPrice,
    subTotal: subTotal,
    sellerShopName: productData.seller?.UserCompanyInfo?.shopName || "Unknown Shop",
    sellerId: productData.seller?.id || productData.sellerId || 0,
    productName: productData.productName,
    productImage: productData.ProductImage?.[0]?.imageUrl
  };

  const dataToSave = {
    wishlistItem,
    cartItem,
    selectedOptions,
    productData: {
      id: productData.id,
      productName: productData.productName,
      brand: productData.brand.brand,
      category: productData.category.name
    },
    timestamp: new Date().toISOString()
  };

  try {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    // Check for duplicate based on productId or sku
    const isAlreadyAdded = existingWishlist.some(
      (item: { cartItem: { productId: number; sku: string; }; }) =>
        item.cartItem?.productId === cartItem.productId &&
        item.cartItem?.sku === cartItem.sku
    );

    if (isAlreadyAdded) {
      toast.error(translate("এই পণ্যটি ইতিমধ্যে উইশলিস্টে রয়েছে", "This product is already in your wishlist"));
      return;
    }

    const updatedWishlist = [...existingWishlist, dataToSave];
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  } catch (error) {
    console.error("Failed to save to wishlist:", error);
    toast.error(translate("উইশলিস্টে সংরক্ষণ করতে ব্যর্থ হয়েছে", "Failed to save to wishlist"));
    return;
  }

  toast.success(translate("উইশলিস্টে যোগ করা হয়েছে", "Added to wishlist"));
};


  return (
    <div className="space-y-4 mt-6">
      {/* Price Display Section */}
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold text-orange-600">
          {subTotal} {translate("টাকা", "Tk")}
          {hasDiscount && (
            <span className="line-through text-gray-400 text-base font-normal ml-2">
              {originalSubTotal} {translate("টাকা", "Tk")}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 shadow-sm">
          <button
            className="px-2 text-xl text-gray-600"
            aria-label={translate("পরিমাণ কমাও", "Decrease quantity")}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            –
          </button>
          <span className="px-3 text-sm">{quantity}</span>
          <button
            className="px-2 text-xl text-gray-600"
            aria-label={translate("পরিমাণ বাড়াও", "Increase quantity")}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={matchingProduct ? quantity >= matchingProduct.stock : true}
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <Button variant={'outline'} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-semibold text-sm shadow-md">
          {translate("এখনই কিনুন", "Buy Now")}
        </Button>
        <Button 
          variant={'outline'} 
          className="border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
          onClick={handleAddToCart}
          disabled={!matchingProduct || matchingProduct.stock <= 0}
        >
          {translate("কার্টে যোগ করুন", "Add to Cart")} <PiShoppingCartSimpleBold className="text-lg" />
        </Button>
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 border-b border-gray-300 mt-4 py-4">
        <div 
        onClick={handleAddToWishlist}
         className="flex items-center gap-2 cursor-pointer hover:text-black dark:text-white">
          <FiHeart className="text-base" />
          <span>{translate("উইশলিস্টে যোগ করুন", "Add to wishlist")}</span>
        </div>
        <div className="flex items-center gap-2 text-orange-600 font-medium">
          <Check size={16} className="text-orange-500" />
          {translate("৬ মাস অফিসিয়াল ওয়ারেন্টি", "6 Months Official Warranty")}
        </div>
        <div className="text-gray-500 underline cursor-pointer hover:text-black dark:text-white">
          {translate("এক্সচেঞ্জ পলিসি", "Exchange Policy")}
        </div>
      </div>
    </div>
  );
}