"use client";

import BillingAndPayment from "@/components/main/checkout-components/BillingDetails";
import OrderSummary from "@/components/main/checkout-components/OrderSummary";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage: React.FC = () => {
    const router = useRouter();
    return (
        <main className="max-w-[1280px] mx-auto px-4 mt-16 pt-[40px] pb-10">
            <p
                onClick={() => router.back()}
                className="flex text-sm text-black hover:cursor-pointer hover:text-orange-600 pb-[39px]"
            >
                <ArrowLeft size={18} className="mr-1" />
                Back
            </p>
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