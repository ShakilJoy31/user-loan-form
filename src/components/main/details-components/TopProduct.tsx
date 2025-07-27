"use client"
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Link from "next/link";

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

const ProductCard = ({
  product,
  showBorder = true,
}: {
  product: Product;
  showBorder?: boolean;
}) => {
  const productImage = product.ProductImage?.[0]?.imageUrl;
  const productItem = product.ProductItem?.[0];
  const hasDiscount = productItem?.discountPrice && productItem.discountPrice > 0;
  
  return (
    <div className={`flex gap-3 ${showBorder ? "border-b border-gray-400 pb-3" : ""}`}>
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
                {productItem.price - productItem?.discountPrice} TK
              </span>
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-1">
          <span className="font-medium">
            {productItem ? 
              (productItem.price - productItem?.discountPrice) + " TK" 
              : "N/A"}
          </span>
          <Button className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors">
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TopProduct = ({ topProducts }: { topProducts: Product[] }) => {
  const { translate } = useCustomTranslator();

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
              {topProducts.map((product, index) => (
                // eslint-disable-next-line react/jsx-key
                <Link href={`/products/${product?.productLink}`}>
                <ProductCard
                  key={product.id}
                  product={product}
                  showBorder={index !== topProducts.length - 1}
                />
                </Link>
              ))}
            </div>

            {/* For md devices — 2-column grid layout */}
            <div className="hidden md:grid lg:hidden">
              <div className="mt-4 grid grid-cols-2 gap-4 px-5">
                {topProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showBorder={index < topProducts.length - 2 || topProducts.length % 2 !== 0}
                  />
                ))}
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