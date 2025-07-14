// app/components/AdditionalInfoCard.tsx
import { FaRegCreditCard, FaTags, FaTruck } from "react-icons/fa";

export default function AdditionalInfoCard() {
    return (
        <div>
            <h2 className="text-gray-700 font-semibold text-[15px]">Additional information</h2>
            <div className="w-full bg-white border border-gray-300 rounded-xl p-5 space-y-4">

                {/* Row 1: Minimum Booking */}
                <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                        <FaRegCreditCard className="text-[#f15a29]" />
                        <span>Minimum Booking</span>
                    </div>
                    <span className="text-[#f15a29] font-bold">500 Tk</span>
                </div>

                {/* Row 2: Purchase Points */}
                <div className="flex items-center justify-between text-sm font-medium text-gray-700 border-t border-gray-300 pt-3">
                    <div className="flex items-center gap-2">
                        <FaTags className="text-[#f15a29]" />
                        <span>Purchas Points</span>
                    </div>
                    <span className="text-[#f15a29] font-bold">0 Tk</span>
                </div>

                {/* Row 3: Return Delivery */}
                <div className="flex items-start gap-2 border-t border-gray-300 pt-3">
                    <FaTruck className="text-[#f15a29] mt-1" />
                    <div>
                        <p className="font-semibold text-[#1d3557]">Return Delivery</p>
                        <p className="text-sm text-gray-500">
                            Free 30 days Delivery Return.{" "}
                            <a href="#" className="text-gray-600 underline">Details</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
