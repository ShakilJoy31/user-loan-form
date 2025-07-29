"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import OrderSummary from "@/components/main/checkout-components/OrderSummary";
import BillingAndPayment from "@/components/main/checkout-components/BillingDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { useGetUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";

interface ShippingAddress {
  city: string;
  zone: string;
  area: string;
  name: string;
  email: string;
  phone: string;
  address: string;
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

interface OrderData {
  userId: number;
  customerNote: string;
  shippingMethod: string;
  shippingCharge: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  orderItems: SellerOrder[];
}

interface FormData {
  addressOption: string;
  addressLine1: string;
  city: string;
  zone: string;
  country: string;
  area: string;
  paymentMethod: string;
  promoCode: string;
  note: string;
  shippingMethod: string;
  shippingMethodId: string;
  orders?: OrderData[];
}

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

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const dispatch = useDispatch();

    // Load user on initial render if not already loaded
    useEffect(() => {
        if (!user.id) {
            loadUserFromToken(dispatch).then(() => {
                setIsUserLoaded(true);
            });
        } else {
            setIsUserLoaded(true);
        }
    }, [dispatch, user.id]);

    const { data: sellerUser} = useGetUserByIdQuery(
        user?.id,
        { skip: !user.id || !isUserLoaded } // Skip if no user ID or user not loaded
    );

      // Calculate subTotal from localStorage
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cartData);
        const calculatedSubTotal = parsedCart.reduce(
          (sum, item) => sum + (item.subTotal || (item.discountPrice || item.price) * item.quantity),
          0
        );
        setSubTotal(calculatedSubTotal);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

    console.log("sellerUser", sellerUser)
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    addressOption: "new",
    addressLine1: "",
    city: "",
    zone: "",
    country: "",
    area: "",
    paymentMethod: "cash",
    promoCode: "",
    note: "",
     shippingMethod: "", 
  shippingMethodId: "" 
  });



  return (
    <main className="max-w-[1280px] mx-auto px-4 mt-16 pt-[40px] pb-10">
      <div className="mb-4 lg:mb-10 text-[#EE5A2C] text-[16px]">
        <Button 
          onClick={() => router.back()}
          variant="outline" 
          className="p-2 h-auto text-[#EE5A2C] flex items-center gap-1"
        >
          <IoMdArrowBack />
          Back
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[416px] lg:h-[683px]">
          <OrderSummary
            selectedShippingMethodId={selectedShippingMethodId}
            formData={formData}
          />
        </div>
        <div className="w-full lg:w-[829px]">
          <BillingAndPayment
            onShippingMethodSelect={setSelectedShippingMethodId}
            onFormDataChange={setFormData}
            initialFormData={formData}
            subTotal={subTotal}
          />
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;