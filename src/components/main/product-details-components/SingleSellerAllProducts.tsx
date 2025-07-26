"use client";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ShopCard from "../home-components/ShopCard";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

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

interface SingleSellerProductsProps {
  products: Product[];
  shopProfile: ShopProfileProps;
  newArrival: Product[];
  relatedShop: RelatedShop[];
}

const SingleSellerAllProducts = ({
  products,
  shopProfile,
  newArrival,
  relatedShop,
}: SingleSellerProductsProps) => {
  // Helper function to get the  price from product items
  const getLowestPrice = (items: ProductItem[]): number => {
    return Math.min(...items.map((item) => item.price));
  };

  const getHighestDiscountPrice = (items: ProductItem[]): number => {
    return Math.max(...items.map((item) => item.discountPrice));
  };

  // Helper function to get the first image URL
  const getFirstImageUrl = (images: ProductImage[]): string => {
    return images[0]?.imageUrl || "/placeholder-product.png";
  };

  const router = useRouter();
  const { translate } = useCustomTranslator();

  console.log("relatedShop", relatedShop);

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
        toast.error(
          translate(
            "এই পণ্যটি ইতিমধ্যে উইশলিস্টে রয়েছে",
            "This product is already in your wishlist"
          )
        );
        return;
      }

      const updatedWishlist = [...existingWishlist, dataToSave];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success(translate("উইশলিস্টে যোগ করা হয়েছে", "Added to wishlist"));
    } catch (error) {
      console.error("Failed to save to wishlist:", error);
      toast.error(
        translate(
          "উইশলিস্টে সংরক্ষণ করতে ব্যর্থ হয়েছে",
          "Failed to save to wishlist"
        )
      );
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
    <div>
      <h2 className="text-2xl my-5 font-semibold text-start bg-gray-100 py-2.5 pl-2.5 rounded-md shadow-md">
        New Arrival
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {newArrival.map((product) => {
          const firstImageUrl = getFirstImageUrl(product.ProductImage);
          const lowestPrice = getLowestPrice(product.ProductItem);
          const highestDiscountPrice = getHighestDiscountPrice(
            product.ProductItem
          );
          const discountPercentage = (highestDiscountPrice / lowestPrice) * 100;
          const showDiscount =
            highestDiscountPrice > 0 && highestDiscountPrice < lowestPrice;
          const finalPrice = lowestPrice - highestDiscountPrice;

          // Sample data (replace with actual data when available)
          const rating = 4;
          const reviewCount = 12;

          return (
            <div
              key={product.id}
              className="border border-gray-300 rounded-md overflow-hidden shadow-sm p-3 w-full bg-white hover:shadow-md transition-shadow"
            >
              {/* Image + Wishlist Button */}
              <div className="relative bg-gray-100 rounded-t-lg aspect-square">
                <Image
                  width={300}
                  height={300}
                  src={firstImageUrl}
                  alt={product.productName}
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

              {/* Product Info */}
              <div className="mt-4 space-y-1">
                <h2 className="text-sm font-medium text-gray-900 truncate">
                  {product.productName}
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  {product.brand.brand}
                </p>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[16px] font-bold text-black">
                    {finalPrice.toLocaleString()} TK
                  </span>
                  {showDiscount && (
                    <>
                      <span className="line-through text-sm text-gray-400">
                        {lowestPrice.toLocaleString()} TK
                      </span>
                      <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded">
                        -{discountPercentage.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 text-sm mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) =>
                      i < rating ? (
                        <FaStar key={i} className="w-4 h-4" />
                      ) : (
                        <FaRegStar key={i} className="w-4 h-4" />
                      )
                    )}
                  </div>
                  <span className="text-gray-500 text-xs">({reviewCount})</span>
                </div>

                {/* Button Group */}
                <div className="flex items-center mt-3 space-x-2">
                  {product?.ProductItem.length > 1 ? (
                    <Button
                      onClick={() =>
                        router.push(`/products/${product?.productLink}`)
                      }
                      variant={"outline"}
                      className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors hover:text-white"
                    >
                      Select
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        variant={"outline"}
                        className="flex items-center justify-center px-3 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleBuyNow(product)}
                        variant={"outline"}
                        className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors"
                      >
                        Buy Now
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="text-2xl my-5 font-semibold text-start bg-gray-100 py-2.5 pl-2.5 rounded-md shadow-md">
        Shop Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {products.map((product) => {
          const firstImageUrl = getFirstImageUrl(product.ProductImage);
          const lowestPrice = getLowestPrice(product.ProductItem);
          const highestDiscountPrice = getHighestDiscountPrice(
            product.ProductItem
          );
          const discountPercentage = (highestDiscountPrice / lowestPrice) * 100;
          const showDiscount =
            highestDiscountPrice > 0 && highestDiscountPrice < lowestPrice;
          const finalPrice = lowestPrice - highestDiscountPrice;

          // Sample data (replace with actual data when available)
          const rating = 4;
          const reviewCount = 12;

          return (
            <div
              key={product.id}
              className="border border-gray-300 rounded-md overflow-hidden shadow-sm p-3 w-full bg-white hover:shadow-md transition-shadow"
            >
              {/* Image + Wishlist Button */}
              <div className="relative bg-gray-100 rounded-t-lg aspect-square">
                <Image
                  width={300}
                  height={300}
                  src={firstImageUrl}
                  alt={product.productName}
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

              {/* Product Info */}
              <div className="mt-4 space-y-1">
                <h2 className="text-sm font-medium text-gray-900 truncate">
                  {product.productName}
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  {product.brand.brand}
                </p>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[16px] font-bold text-black">
                    {finalPrice.toLocaleString()} TK
                  </span>
                  {showDiscount && (
                    <>
                      <span className="line-through text-sm text-gray-400">
                        {lowestPrice.toLocaleString()} TK
                      </span>
                      <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded">
                        -{discountPercentage.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 text-sm mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) =>
                      i < rating ? (
                        <FaStar key={i} className="w-4 h-4" />
                      ) : (
                        <FaRegStar key={i} className="w-4 h-4" />
                      )
                    )}
                  </div>
                  <span className="text-gray-500 text-xs">({reviewCount})</span>
                </div>

                {/* Button Group */}
                <div className="flex items-center mt-3 space-x-2">
                  {product?.ProductItem.length > 1 ? (
                    <Button
                      onClick={() =>
                        router.push(`/products/${product?.productLink}`)
                      }
                      variant={"outline"}
                      className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors hover:text-white"
                    >
                      Select
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        variant={"outline"}
                        className="flex items-center justify-center px-3 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleBuyNow(product)}
                        variant={"outline"}
                        className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors"
                      >
                        Buy Now
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl my-5 font-semibold text-start bg-gray-100 py-2.5 pl-2.5 rounded-md shadow-md">
        Related Shop
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pr-6">
        {relatedShop?.map((shop, index) => (
          <ShopCard
            key={index}
            shopName={shop.shopName}
            area={shop.area}
            city={shop.city}
            user={shop.user}
            profileImage={shop.profileImage}
            avatar={shop.avatar}
            slug={shop.slug}
            id={shop.id}
            bannerImage={null}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleSellerAllProducts;
