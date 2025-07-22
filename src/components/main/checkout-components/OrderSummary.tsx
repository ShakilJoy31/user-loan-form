"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartItem {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
  discountPrice?: number; // Optional field
  subTotal: number;
  sellerShopName: string;
  sellerId: number;
  productName: string;
  productImage: string;
  size?: string; // Optional field
  color?: string; // Optional field
}

export default function OrderSummary() {
  const { translate } = useCustomTranslator();
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cartData);
        console.log("order summary data from localStorage:", parsedCart);
        setCartItem(Array.isArray(parsedCart) ? parsedCart : [parsedCart]);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    } else {
      console.log("No cart data found in localStorage");
    }
  };

  const updateCartInLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItem(updatedCart);
  };

  const handleIncrement = (productId: number, sku: string) => {
    const updatedCart = cartItem.map(item => {
      if (item.productId === productId && item.sku === sku) {
        const newQuantity = item.quantity + 1;
        const newSubTotal = (item.discountPrice || item.price) * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          subTotal: newSubTotal
        };
      }
      return item;
    });
    updateCartInLocalStorage(updatedCart);
  };

  const handleDecrement = (productId: number, sku: string) => {
    const updatedCart = cartItem.map(item => {
      if (item.productId === productId && item.sku === sku) {
        const newQuantity = Math.max(1, item.quantity - 1); // Don't allow quantity less than 1
        const newSubTotal = (item.discountPrice || item.price) * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          subTotal: newSubTotal
        };
      }
      return item;
    });
    updateCartInLocalStorage(updatedCart);
  };

  // Calculate totals based on cart items
  const subTotal = cartItem.reduce(
    (sum, item) => sum + (item.subTotal || (item.discountPrice || item.price) * item.quantity),
    0
  );
  const deliveryCharge = 0;
  const discountPercentage = 0;
  const discountAmount = subTotal * (discountPercentage / 100);
  const total = subTotal + deliveryCharge - discountAmount;
  const payableOnDelivery = total;

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-300 shadow-sm overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">
        {translate("অর্ডার সারাংশ", "Order summary")}
      </h2>

      <div className="mt-4 space-y-4">
        {cartItem.map((item) => (
          <div
            key={`${item.productId}-${item.sku}`}
            className="flex items-start space-x-3 border-b border-gray-300 pb-3"
          >
            <Image
              src={item.productImage || "/placeholder-product.jpg"}
              alt={item.productName}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="text-sm flex-1">
              <h4 className="font-semibold">{item.productName}</h4>
              {item?.size ? (
                <p>
                  <span className="text-gray-600">
                    {translate("সাইজ:", "Size:")}
                  </span>{" "}
                  {item.size || translate("N/A", "N/A")}
                </p>
              ) : null}
              {item?.color ? (
                <p>
                  <span className="text-gray-600">
                    {translate("রং:", "Color:")}
                  </span>{" "}
                  {item.color || translate("N/A", "N/A")}
                </p>
              ) : null}
              <p className="text-red-600 font-bold">
                {(item.discountPrice || item.price)} {translate("টাকা", "Tk")}{" "}
                {item.discountPrice && (
                  <span className="line-through text-gray-400 font-normal">
                    {item.price} {translate("টাকা", "Tk")}
                  </span>
                )}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-600">
                  {translate("পরিমাণ:", "Quantity:")}
                </p>
                <div className="flex items-center border border-gray-300 rounded-md w-fit">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 md:px-3 h-8"
                    onClick={() => handleDecrement(item.productId, item.sku)}
                  >
                    -
                  </Button>
                  <span className="px-2 text-sm">{item.quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 md:px-3 h-8"
                    onClick={() => handleIncrement(item.productId, item.sku)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <p className="text-gray-600">
                {translate("ভ্যারিয়েন্ট:", "Variant:")} {item.sku.slice(19, 50)}
              </p>
              <p className="text-gray-600">
                {translate("বিক্রেতা:", "Seller:")} {item.sellerShopName}
              </p>
              <p className="text-gray-600 font-semibold mt-1">
                {translate("সাবটোটাল:", "Subtotal:")} {item.subTotal} {translate("টাকা", "Tk")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-gray-700 mt-4">
        <div className="flex justify-between">
          <span>{translate("সাব-টোটাল", "Sub-Total")}</span>
          <span>{translate(`${subTotal} টাকা`, `${subTotal} Tk`)}</span>
        </div>
        <div className="flex justify-between">
          <span>{translate("ডেলিভারি চার্জ", "Delivery Charges")}</span>
          <span>
            {translate(`${deliveryCharge} টাকা`, `${deliveryCharge} Tk`)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{translate("ডিসকাউন্ট", "Discount")}</span>
          <span className="text-red-500 font-semibold">
            {translate(`${discountPercentage}%`, `${discountPercentage}%`)}
          </span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>{translate("মোট", "Total")}</span>
          <span className="text-red-600">
            {translate(`${total} টাকা`, `${total} Tk`)}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{translate("মোট পরিমাণ", "Total Amount")}</span>
        <span>{translate(`${total} টাকা`, `${total} Tk`)}</span>
      </div>

      <Button
        variant={"outline"}
        className="mt-6 w-full bg-[#EE5A2C] hover:bg-orange-800 text-white hover:text-white font-semibold py-2 rounded"
        onClick={() => {
          console.log("Proceeding to pay with cart data:", cartItem);
          console.log("Order Summary:", {
            subTotal,
            deliveryCharge,
            discountPercentage,
            discountAmount,
            total,
            sellerIds: cartItem.map(item => item.sellerId),
            payableOnDelivery,
          });
          toast.success(
            translate(
              "পেমেন্ট প্রক্রিয়া শুরু হয়েছে",
              "Payment process initiated"
            )
          );
        }}
      >
        {translate("পেমেন্ট করুন", "Proceed To Pay")}
      </Button>
    </div>
  );
}