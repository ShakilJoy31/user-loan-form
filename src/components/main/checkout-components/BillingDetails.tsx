import Image from "next/image";
import React from "react";
import collectionBanner from "../../../../assets/Logo/payment-icons.png";


const BillingAndPayment = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

                {/* Checkout Options */}
                <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Checkout Options</p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="radio" name="addressOption" className="accent-[#F53E32]" />
                            I want to use an existing address
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="radio" name="addressOption" defaultChecked className="accent-[#F53E32]" />
                            I want to use new address
                        </label>
                    </div>
                </div>

                {/* Address Inputs */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Address Line 1"
                        className="w-full border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            className="w-full border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                City*
                            </option>
                            <option value="dhaka">Dhaka</option>
                            <option value="ctg">Chattogram</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Zone"
                            className="w-full border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            className="w-full border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select Country*
                            </option>
                            <option value="bangladesh">Bangladesh</option>
                        </select>

                        <select
                            className="w-full border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Area
                            </option>
                            <option value="uttara">Uttara</option>
                            <option value="mirpur">Mirpur</option>
                        </select>
                    </div>
                </div>

                {/* Shipping Method */}
                <div className="mt-6">
                    <p className="text-sm font-medium mb-2">Shipping Method</p>
                    <div className="flex items-center gap-2 bg-[#E8F1F8] border border-blue-100 px-4 py-3 rounded-md max-w-[425px] ">
                        <input type="radio" checked readOnly className="accent-red-500" />
                        <span className="text-sm text-[#EE5A2C] font-medium">
                            Shipping out side Dhaka
                        </span>
                    </div>
                </div>


 <h2 className="text-lg font-semibold mb-4 mt-[60px] ">Payment Method</h2>

                {/* Payment Options */}
                <div className="border border-gray-300 rounded-md p-4 mb-6 max-w-[740px] ">
                    <p className="text-sm text-gray-600 mb-4">
                        Please select the preferred payment method to use on this order.
                    </p>
                    <div className="space-y-3 text-sm text-gray-700">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" defaultChecked className="accent-[#F53E32]" />
                            Cash On Delivery
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" className="accent-[#F53E32]" />
                            UPI
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" className="accent-[#F53E32]" />
                            Bank Transfer
                        </label>
                    </div>
                </div>

                {/* Payment Icons */}
                <div className="border border-gray-300 rounded-md p-4 mb-6 max-w-[584px] h-[121px] ">
                    <p className="text-sm font-semibold mb-3">Payment Method</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Image

                            width={300}
                            height={300}
                            src={collectionBanner}
                            alt='Payment image'
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* <div className="flex flex-wrap items-center gap-4">
                        {["visa", "mastercard", "paypal", "skrill", "maestro", "visaelectron"].map((method, idx) => (
                            <img
                                key={idx}
                                src={`/payments/${method}.png`}
                                alt={method}
                                className="w-12 h-8 object-contain"
                            />
                        ))}
                    </div> */}
                </div>

                {/* Discount Coupon */}
                <div className="mb-6 max-w-[457px] ">
                    <label className="text-base font-semibold mb-2 block">Discount Coupon :</label>
                    <div className="flex items-stretch gap-2">
                        {/* Icon + Input */}
                        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-md px-3 max-w-[321px] h-[48px]">
                            <svg
                                className="w-4 h-4 text-gray-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 14l2-2m0 0l2-2m-2 2l2 2m-2-2l-2 2M5 12l-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4l-2-2m-2-2a2 2 0 100-4 2 2 0 000 4z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Add promo code"
                                className="w-full bg-gray-100 text-sm outline-none h-full placeholder:text-gray-400"
                            />
                        </div>

                        {/* Apply Code Button */}
                        <button className="bg-orange-500 text-white text-sm font-medium h-[48px] px-5 w-[126px] rounded-md hover:bg-orange-600 transition-colors">
                            Apply Code
                        </button>
                    </div>
                </div>

                {/* Note Section */}
                <div className="mb-6 max-w-[388px]">
                    <label className="text-base font-semibold mb-2 block">
                        Note<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        placeholder="Write your note here"
                        className="w-full bg-gray-100 border border-gray-200 rounded-md px-4 py-3 h-[90px] text-sm outline-none resize-none placeholder:text-gray-400 focus:ring-1 focus:ring-orange-400"
                        rows={3}
                    />
                </div>

                {/* Place Order Button */}
                <button className="bg-orange-500 w-[222px] text-white font-semibold text-base py-3 rounded-md hover:bg-orange-600 transition-colors">
                    Place Order
                </button>

            </div>

           
        </div>
    );
};

export default BillingAndPayment;