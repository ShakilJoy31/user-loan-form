"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetSingleShippingMethodQuery } from "@/redux/features/order/shippingMethodApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { useCreateOrderMutation } from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import { usePaymentInstanceMutation } from "@/redux/features/user/paymentApi";

interface CartItem {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  subTotal: number;
  sellerShopName: string;
  sellerId: number;
  productName: string;
  productImage: string;
  size?: string;
  color?: string;
}

interface OrderItem {
  productId: number;
  sku: string;
  quantity: number;
}

interface SellerOrder {
  sellerId: number;
  products: OrderItem[];
}

interface ShippingAddress {
  city: string;
  zone: string;
  area: string;
  name: string | null;
  email: string | null;
  phone: string;
  address: string;
}

interface OrderData {
  userId: string | null;
  customerNote: string;
  shippingMethod: string;
  shippingCharge: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  orderItems: SellerOrder[];
}

interface OrderSummaryProps {
  selectedShippingMethodId?: string | null;
  formData: {
    note: string;
    shippingMethod: string;
    shippingMethodId: string;
    paymentMethod: string;
    city: string;
    zone: string;
    area: string;
    addressLine1: string;
    couponCode?: string;
    couponDiscount?: number;
    couponType?: string;
  };
}

export default function OrderSummary({
  selectedShippingMethodId,
  formData,
}: OrderSummaryProps) {
  const { translate } = useCustomTranslator();
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const user = useSelector(selectUser);
  const router = useRouter();
  console.log(user);

  const { data: shippingMethodData } = useGetSingleShippingMethodQuery(
    selectedShippingMethodId || "",
    { skip: !selectedShippingMethodId }
  );

  const [paymentInstance] =
    usePaymentInstanceMutation();

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cartData);
        setCartItem(Array.isArray(parsedCart) ? parsedCart : [parsedCart]);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  };

  const updateCartInLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItem(updatedCart);
  };

  const handleIncrement = (productId: number, sku: string) => {
    const updatedCart = cartItem.map((item) => {
      if (item.productId === productId && item.sku === sku) {
        const newQuantity = item.quantity + 1;
        const newSubTotal = (item.discountPrice || item.price) * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          subTotal: newSubTotal,
        };
      }
      return item;
    });
    updateCartInLocalStorage(updatedCart);
  };

  const handleDecrement = (productId: number, sku: string) => {
    const updatedCart = cartItem.map((item) => {
      if (item.productId === productId && item.sku === sku) {
        const newQuantity = Math.max(1, item.quantity - 1);
        const newSubTotal = (item.discountPrice || item.price) * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          subTotal: newSubTotal,
        };
      }
      return item;
    });
    updateCartInLocalStorage(updatedCart);
  };

  // Calculate totals
  const subTotal = cartItem.reduce(
    (sum, item) =>
      sum +
      (item.subTotal || (item.discountPrice || item.price) * item.quantity),
    0
  );

  // Calculate coupon discount
  let couponDiscountAmount = 0;
  if (formData.couponDiscount) {
    if (formData.couponType === "percentage") {
      couponDiscountAmount = subTotal * (formData.couponDiscount / 100);
    } else {
      // Fixed amount discount
      couponDiscountAmount = formData.couponDiscount;
    }
  }

  const deliveryCharge = shippingMethodData?.data?.price || 0;
  const total = subTotal + deliveryCharge - couponDiscountAmount;

  const [createOrder] = useCreateOrderMutation();

  const handleProceedToPay = async () => {
    if (!formData.shippingMethodId) {
      toast.error(
        translate("শিপিং মেথড নির্বাচন করুন", "Please select shipping method")
      );
      return;
    }

    if (!formData.paymentMethod) {
      toast.error(
        translate("পেমেন্ট মেথড নির্বাচন করুন", "Please select payment method")
      );
      return;
    }

    if (
      !formData.city ||
      !formData.zone ||
      !formData.area ||
      !formData.addressLine1
    ) {
      toast.error(
        translate(
          "অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা লিখুন",
          "Please enter your complete address"
        )
      );
      return;
    }

    const orderItems = cartItem.reduce<SellerOrder[]>((acc, item) => {
      const existingSeller = acc.find(
        (seller) => seller.sellerId === item.sellerId
      );

      if (existingSeller) {
        existingSeller.products.push({
          productId: item.productId,
          sku: item.sku,
          quantity: item.quantity,
        });
      } else {
        acc.push({
          sellerId: item.sellerId,
          products: [
            {
              productId: item.productId,
              sku: item.sku,
              quantity: item.quantity,
            },
          ],
        });
      }
      return acc;
    }, []);

    const orderData: OrderData = {
      userId: user.id,
      customerNote: formData.note,
      shippingMethod: formData.shippingMethod,
      shippingCharge: deliveryCharge,
      paymentMethod: formData.paymentMethod,
      shippingAddress: {
        city: formData.city,
        zone: formData.zone,
        area: formData.area,
        name: user.name,
        email: user.email,
        phone: user.phone || "01837308476",
        address: formData.addressLine1,
      },
      orderItems: orderItems,
    };

    try {
      const response = await createOrder(orderData).unwrap();

      // Remove ordered products from localStorage
      const orderedSkus = cartItem.map((item) => item.sku);
      const cartData = localStorage.getItem("cart");

      if (cartData) {
        const currentCart: CartItem[] = JSON.parse(cartData);
        const updatedCart = currentCart.filter(
          (item) => !orderedSkus.includes(item.sku)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
      }

      toast.success(
        translate("অর্ডার সফলভাবে তৈরি হয়েছে", "Order created successfully")
      );
      console.log("Order creation response:", response);

      const orderId = response.data[0].dbId
      const orderId1 = response.data[0].orderId
      console.log("orderId", orderId1)

      // Redirect based on shipping method
      if (formData.paymentMethod === "ONLINE") {
        try {
          const paymentResponse = await paymentInstance({
            id: orderId,
          }).unwrap();
          if (paymentResponse?.success) {
            window.location.href = paymentResponse.data.url;
          } else {
            toast.error("Payment Initialization Failed");
          }
        } catch (error) {
          console.log(error);
        }
      }
      else{
        router.push("/my-profile/order")
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(
        translate(
          "অর্ডার তৈরি করতে সমস্যা হয়েছে",
          "There was a problem creating your order"
        )
      );
    }
  };

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
              {item?.size && (
                <p>
                  <span className="text-gray-600">
                    {translate("সাইজ:", "Size:")}
                  </span>{" "}
                  {item.size}
                </p>
              )}
              {item?.color && (
                <p>
                  <span className="text-gray-600">
                    {translate("রং:", "Color:")}
                  </span>{" "}
                  {item.color}
                </p>
              )}
              <p className="text-red-600 font-bold">
                {item.discountPrice || item.price} {translate("টাকা", "Tk")}
                {item.discountPrice && (
                  <span className="line-through text-gray-400 font-normal ml-2">
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
                {translate("ভ্যারিয়েন্ট:", "Variant:")} {item.sku.length > 20 ? `${item.sku.slice(0, 20)}...` : item.sku}
              </p>
              <p className="text-gray-600">
                {translate("বিক্রেতা:", "Seller:")} {item.sellerShopName}
              </p>
              <p className="text-gray-600 font-semibold mt-1">
                {translate("সাবটোটাল:", "Subtotal:")} {item.subTotal}{" "}
                {translate("টাকা", "Tk")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-gray-700 mt-4">
        <div className="flex justify-between">
          <span>{translate("সাব-টোটাল", "Sub-Total")}</span>
          <span>
            {subTotal} {translate("টাকা", "Tk")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{translate("ডেলিভারি চার্জ", "Delivery Charges")}</span>
          <span>
            {deliveryCharge} {translate("টাকা", "Tk")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{translate("ডিসকাউন্ট", "Discount")}</span>
          <span className="text-red-500 font-semibold">
            -{couponDiscountAmount.toFixed(2)} {translate("টাকা", "Tk")}
            {formData.couponType === "percentage" && (
              <span className="text-gray-500 ml-1">
                ({formData.couponDiscount}%)
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>{translate("মোট", "Total")}</span>
          <span className="text-red-600">
            {total} {translate("টাকা", "Tk")}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{translate("মোট পরিমাণ", "Total Amount")}</span>
        <span>
          {total} {translate("টাকা", "Tk")}
        </span>
      </div>

      <Button
        variant={"outline"}
        className="mt-6 w-full bg-[#EE5A2C] hover:bg-orange-800 text-white hover:text-white font-semibold py-2 rounded"
        onClick={handleProceedToPay}
      >
        {translate("পেমেন্ট করুন", "Proceed To Pay")}
      </Button>
    </div>
  );
}
