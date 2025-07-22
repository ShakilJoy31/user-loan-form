"use client";

import BillingAndPayment from "@/components/main/checkout-components/BillingDetails";
import OrderSummary from "@/components/main/checkout-components/OrderSummary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const CheckoutPage: React.FC = () => {
    const router = useRouter();
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
                    <OrderSummary />
                </div>
                <div className="w-full lg:w-[829px]">
                    <BillingAndPayment />
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;