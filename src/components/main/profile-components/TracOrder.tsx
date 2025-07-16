"use client";
import Image from "next/image";
import mapImage from "@/assets/Products_Image/Screenshot (845).png";
import productImage from "@/assets/Products_Image/products.jpg";
import { CheckCircle, CircleDot, Circle } from "lucide-react";

export default function TrackOrderTab() {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">Order Tracking</h2>
            <p className="text-sm text-gray-500 mb-6">Track your order Status</p>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,576px)_minmax(0,311px)] gap-6">
                {/* Left Side - max-w-[576px] */}
                <div className="space-y-[24px] w-full max-w-[576px]">
                    {/* Order Info */}
                    <div className="bg-[#F9FAFB] p-4 rounded-lg border border-gray-200 w-full">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm text-gray-500">Order ID Detail</p>

                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            #Customer 001
                        </h3>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 mt-2">
                            Created date <br />
                            <span className="text-gray-700 font-medium">
                                25 June, 2025 at 10:45 AM
                            </span>
                        </p>
                        <span className="text-xs bg-[#BDFEB5] text-[#098807] px-3 py-1 rounded-full font-medium">
                            Paid
                        </span>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full">
                        <h4 className="text-[24px] font-semibold text-black mb-[10px] ">
                            Order Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-gray-800 font-medium">20%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-gray-800">-49 Tk</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery</span>
                                <span className="text-gray-800">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span className="text-gray-800">5 TK</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-semibold text-[#EE5A2C]">
                                <span>Total</span>
                                <span>200 Tk</span>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full flex justify-between">
                        <div>
                            <h4 className="text-[20px] font-semibold text-black mb-1">
                                Delivery Address
                            </h4>
                            <p className="text-sm">Address</p>
                        </div>
                        <p className="text-sm text-[#667085] leading-5">
                            847 Jewess Bridge Apt. <br />
                            174 London, UK <br />
                            474-769-3919
                        </p>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full">
                        <h4 className="text-[20px] font-semibold text-black mb-3">
                            Order Items
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={productImage}
                                    alt="House Wiring Cable"
                                    className="rounded-md object-cover"
                                    width={60}
                                    height={60}
                                />
                                <div className="text-sm">
                                    <p className="text-gray-800 font-medium">House Wiring Cable</p>
                                    <p className="text-gray-500 text-xs">Size: large</p>
                                    <p className="text-gray-500 text-xs">Color: Multiple</p>
                                </div>
                            </div>
                            <div className="text-[#EE5A2C] font-semibold text-sm">245 TK</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - max-w-[311px] */}
                <div className="space-y-4 w-full max-w-[311px] lg:max-w-none">
                    {/* Map Image */}
                    <div className="rounded-xl overflow-hidden border w-full">
                        <Image
                            src={mapImage}
                            alt="Map"
                            className="w-full object-cover"
                            width={500}
                            height={300}
                        />
                    </div>

                    {/* Tracking Updates */}
                    <div className="bg-white p-4 border rounded-lg shadow-sm w-full">
                        <h4 className="text-md font-semibold text-gray-800 mb-3">
                            Tracking Updates
                        </h4>
                        <ol className="relative border-s-2 border-dashed border-gray-300 space-y-6 ps-4 text-sm">
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-orange-500">
                                    <CircleDot size={18} />
                                </span>
                                <p className="font-medium text-gray-800">
                                    Considered as a delivery
                                </p>
                                <p className="text-gray-600">12 May 2022 10 AM</p>
                                <p className="text-gray-400">Mirpur Road</p>
                            </li>
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-orange-500">
                                    <CircleDot size={18} />
                                </span>
                                <p className="font-medium text-gray-800">Assigned to Rider</p>
                                <p className="text-gray-600">12 May 2022 10 AM</p>
                                <p className="text-gray-400">Mirpur Road</p>
                            </li>
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-gray-400">
                                    <Circle size={18} />
                                </span>
                                <p className="font-medium text-gray-800">Arrived in Uttara</p>
                                <p className="text-gray-600">12 May 2022 10 AM</p>
                                <p className="text-gray-400">Mirpur Road</p>
                            </li>
                            <li className="space-y-1">
                                <span className="absolute -left-3 top-1 text-green-500">
                                    <CheckCircle size={18} />
                                </span>
                                <p className="font-medium text-gray-800">Order is Arrived</p>
                            </li>
                        </ol>
                    </div>


                </div>
            </div>
        </div>
    );
}