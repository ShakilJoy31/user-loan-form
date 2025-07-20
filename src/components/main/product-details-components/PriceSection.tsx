"use client";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

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

interface PriceSectionProps {
    productItems: ProductItem[];
    selectedOptions: Record<string, string>;
}

export default function PriceSection({ productItems, selectedOptions }: PriceSectionProps) {
    const [quantity, setQuantity] = useState(1);
    const { translate } = useCustomTranslator();

    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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
    const currentPrice = unitDiscountPrice > 0 ? unitDiscountPrice : unitPrice;
    const subTotal = currentPrice * quantity;
    const originalSubTotal = unitPrice * quantity;

    const handleAddToCart = () => {
        if (!matchingProduct) {
            console.error("No matching product found for selected options");
            return;
        }

        const cartItem = {
            productId: matchingProduct.productId,
            sku: matchingProduct.sku,
            quantity: quantity,
            price: currentPrice,
            subTotal: subTotal
        };
        console.log("Add to cart payload:", [cartItem]);
    };

    return (
        <div className="space-y-4 mt-6 dark:bg-black dark:text-white">
            {/* Price Display Section */}
            <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold text-orange-600">
                    {subTotal} {translate("টাকা", "Tk")}
                    {unitDiscountPrice > 0 && unitPrice !== unitDiscountPrice && (
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
                        onClick={decreaseQty}
                        className="px-2 hover:cursor-pointer text-xl text-gray-600 hover:text-black"
                        aria-label={translate("পরিমাণ কমাও", "Decrease quantity")}
                    >
                        –
                    </button>
                    <span className="px-3 text-sm">{quantity}</span>
                    <button
                        onClick={increaseQty}
                        className="px-2 hover:cursor-pointer text-xl text-gray-600 hover:text-black"
                        aria-label={translate("পরিমাণ বাড়াও", "Increase quantity")}
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
                >
                    {translate("কার্টে যোগ করুন", "Add to Cart")} <PiShoppingCartSimpleBold className="text-lg" />
                </Button>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 border-b border-gray-300 mt-4 py-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-black">
                    <FiHeart className="text-base" />
                    <span>{translate("উইশলিস্টে যোগ করুন", "Add to wishlist")}</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600 font-medium">
                    <Check size={16} className="text-orange-500" />
                    {translate("৬ মাস অফিসিয়াল ওয়ারেন্টি", "6 Months Official Warranty")}
                </div>
                <div className="text-gray-500 underline cursor-pointer hover:text-black">
                    {translate("এক্সচেঞ্জ পলিসি", "Exchange Policy")}
                </div>
            </div>
        </div>
    );
}