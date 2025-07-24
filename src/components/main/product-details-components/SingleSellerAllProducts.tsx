"use client";
import Image from "next/image";
import { FaRegStar, FaStar, FaTrashAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

interface SingleSellerProductsProps {
  products: Product[];
  shopProfile: ShopProfileProps;
}


const SingleSellerAllProducts = ({ products, shopProfile }: SingleSellerProductsProps) => {
  // Helper function to get the lowest price from product items
  const getLowestPrice = (items: ProductItem[]): number => {
    return Math.min(...items.map((item) => item.discountPrice || item.price));
  };

  // Helper function to get the first image URL
  const getFirstImageUrl = (images: ProductImage[]): string => {
    return images[0]?.imageUrl || "/placeholder-product.png";
  };

  const router = useRouter();

  console.log(shopProfile)

   const handleAddToCart = (product: Product) => {
    const productItem = product.ProductItem[0];
    
    const cartItem = {
      productId: product.id,
      sku: productItem.sku,
      quantity: 1, 
      price:  productItem.price,
      subTotal: productItem.discountPrice || productItem.price, // Since quantity is 1
      sellerShopName: shopProfile?.UserCompanyInfo?.shopName,
      sellerId: shopProfile?.UserCompanyInfo?.userId, 
      productName: product.productName,
      productImage: getFirstImageUrl(product.ProductImage)
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
      return;
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

    // Optional: Log the grouped cart like in your other component
    const groupedCart = existingCart.reduce<Record<string, CartItem[]>>((acc, item) => {
      const shopName = item.sellerShopName;
      if (!acc[shopName]) {
        acc[shopName] = [];
      }
      acc[shopName].push(item);
      return acc;
    }, {});

    console.log("Add to cart payload:", Object.values(groupedCart));
  };


const handleBuyNow = (product: Product) => {
  const productItem = product.ProductItem[0];
  
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
    item.productId === product.id && 
    item.sku === productItem.sku
  );

  if (existingItem) {
    toast.error(`${product.productName} is already in your cart`);
    return; // Don't proceed to checkout
  }

  // If product not in cart, add it and proceed to checkout
  handleAddToCart(product);
  router.push('/checkout');
};


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
            <div
              key={product.id}
              className="border border-gray-300 rounded-xl overflow-hidden shadow-sm p-3 w-full bg-white hover:shadow-md transition-shadow"
            >
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
                <h2 className="text-sm text-gray-500 truncate">
                  {product.productName}
                </h2>

                {/* Pricing */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-black">
                    {lowestPrice} TK
                  </span>
                  <span className="line-through text-sm text-gray-400">
                    {originalPrice} TK
                  </span>
                  <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded">
                    -{discount}%
                  </span>
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
                  {product?.ProductItem.length > 1 ? (
                    <Button
                      onClick={() => router.push(`/products/${product?.productLink}`)}
                      variant={"outline"}
                      className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition-colors"
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
    </div>
  );
};

export default SingleSellerAllProducts;
