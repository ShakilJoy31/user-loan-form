"use client";
import Image from "next/image";
import mapImage from "@/assets/Products_Image/Screenshot (845).png";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useLazyGetOrderByOrderIdQuery } from "@/redux/features/order/orderApi";
import { useState } from "react";
import DataLoader from "@/components/common/DataLoader";

interface OrderTracking {
  id: number;
  userId: number | null;
  orderId: number;
  orderStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED" | string;
  note: string | null;
  cancelReason: string | null;
  courierId: number | null;
  createdAt: string;
  updatedAt: string;
}


interface OrderDetails {
  product: {
    size: string;
    color: string;
    productName: string;
    ProductImage: Array<{
      imageUrl: string;
    }>;
  };
  quantity: number;
  price: number;
}

export default function TrackOrderTab() {
  const { translate } = useCustomTranslator();

  const [orderId, setOrderId] = useState<string>("");
  const [trigger, { data: orderDetails, isLoading, isError }] = useLazyGetOrderByOrderIdQuery();

  const handleTrackOrder = () => {
    if (orderId.length >= 8) {
      trigger(orderId);
    }
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-40">
        <DataLoader />
      </div>
    );
  }

  if (isError) {
    return <p>Something want wrong error!</p>;
  }

  const orderProgress = orderDetails?.data?.orderStatus;
  const orderProgress1 = orderDetails?.data;
  console.log("orderProgress", orderProgress1);

  return (
    <div className="bg-white p-6 shadow-sm dark:bg-black dark:border border-gray-300 rounded-md dark:text-white">
      <div className="flex justify-center">
        <div className=" p-6 w-full text-center mb-8">
          <h2 className="text-2xl font-semibold text-primary">
            Track Your Order
          </h2>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleTrackOrder}
            className="mt-4 cursor-pointer w-full px-4 py-2 bg-[#FD6801] hover:bg-orange-800 hover:text-white text-white rounded-md"
            disabled={isLoading || orderId.length < 8}
          >
            {isLoading ? "Loading..." : "Track Order"}
          </button>
        </div>
      </div>

      {orderDetails && !isLoading && !isError && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {translate("অর্ডার ট্র্যাকিং", "Order Tracking")}
          </h2>
          <p className="text-sm text-gray-500 mb-6 dark:text-white">
            {translate(
              "আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন",
              "Track your order Status"
            )}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,576px)_minmax(0,311px)] gap-6 ">
            <div className="space-y-[24px] w-full max-w-[576px] ">
              <div className="bg-[#F9FAFB] p-4 rounded-lg border border-gray-200 w-full dark:bg-black dark:text-white">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500 dark:text-white">
                    {translate("অর্ডার আইডি বিবরণ", "Order ID Detail")}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  #Customer {orderDetails?.data?.orderId}
                </h3>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 mt-2 dark:text-white">
                  {translate("তৈরি তারিখ", "Created date")} <br />
                  <span>
                    {orderDetails?.data?.createdAt
                      ? formatDate(orderDetails.data.createdAt)
                      : "N/A"}
                  </span>
                </p>
                <span className="text-xs bg-[#BDFEB5] text-[#098807] px-3 py-1 rounded-full font-medium ">
                  {orderProgress}
                </span>
              </div>

              <div className="bg-white p-4 border rounded-lg shadow-sm w-full dark:bg-black dark:text-white dark:border dark:border-white">
                <h4 className="text-[24px] font-semibold text-black mb-[10px] dark:text-white">
                  {translate("অর্ডার সারাংশ", "Order Summary")}
                </h4>
                <div className="space-y-2 text-sm">

                  {/* <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">
                      {translate("ডিসকাউন্ট", "Discount")}
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      20%
                    </span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">
                      {translate("ডিসকাউন্ট", "Discount")}
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      Tk
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">
                      {translate("ডেলিভারি", "Delivery")}
                    </span>
                    <span className="text-gray-800 dark:text-white">{orderDetails?.data?.shippingCharge} TK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">
                      {translate("ট্যাক্স", "Tax")}
                    </span>
                    <span className="text-gray-800 dark:text-white">5 TK</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-[#EE5A2C]">
                    <span>{translate("মোট", "Total")}</span>
                    <span>{orderDetails?.data?.totalAmount} Tk</span>
                  </div>
                </div>


              </div>

              <div className="bg-white p-4 border rounded-lg shadow-sm w-full flex justify-between dark:bg-black dark:text-white dark:border dark:border-white">
                <div>
                  <h4 className="text-[20px] font-semibold text-black mb-1 dark:text-white">
                    {translate("ডেলিভারি ঠিকানা", "Delivery Address")}
                  </h4>
                  <p className="text-sm">{translate("ঠিকানা", "Address")}</p>
                </div>
                <p className="text-sm text-[#667085] leading-5 dark:text-white">
                  {orderDetails?.data?.OrderShippingInfo[0].address} <br />
                  {orderDetails?.data?.OrderShippingInfo[0].area}, {orderDetails?.data?.OrderShippingInfo[0].city} <br />
                  {orderDetails?.data?.OrderShippingInfo[0].phone}
                </p>
              </div>

              <div className="bg-white p-4 border rounded-lg shadow-sm w-full dark:bg-black dark:text-white dark:border dark:border-white">
                <h4 className="text-[20px] font-semibold text-black mb-3 dark:text-white">
                  {translate("অর্ডার আইটেম", "Order Items")}
                </h4>
                {orderDetails?.data?.OrderItem?.map((item: OrderDetails) => (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 space-y-3">
                        <Image
                          src={item?.product?.ProductImage[0]?.imageUrl}
                          alt={translate(
                            "হাউস ওয়্যারিং কেবল",
                            "House Wiring Cable"
                          )}
                          className="rounded-md object-cover"
                          width={60}
                          height={60}
                        />
                        <div className="text-sm">
                          <p className="text-gray-800 font-medium dark:text-white">
                            {item?.product?.productName}
                          </p>
                          <div className="text-gray-500 text-xs dark:text-white">
                            <span >Size:</span>{" "}
                            <span >
                              {item?.product?.size || "N/A"}
                            </span>
                            <div className="text-gray-500 text-xs dark:text-white">
                              <span >Color:</span>{" "}
                              <span >
                                {item?.product?.color || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="text-gray-500 text-xs dark:text-white">
                            <span>Qty:</span>{" "}
                            <span>{item?.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[#EE5A2C] font-semibold text-sm">
                        {item?.price} TK
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="space-y-4 w-full max-w-[311px] lg:max-w-none">
              <div className="rounded-xl overflow-hidden border w-full">
                <Image
                  src={mapImage}
                  alt={translate("মানচিত্র", "Map")}
                  className="w-full object-cover"
                  width={500}
                  height={300}
                />
              </div>

              <div className="bg-white p-4 border rounded-lg shadow-sm w-full dark:bg-black dark:text-white dark:border dark:border-white">
                <h4 className="text-md font-semibold text-gray-800 mb-3 dark:text-white">
                  {translate("ট্র্যাকিং আপডেট", "Tracking Updates")}
                </h4>
                <ol className="relative border-s-2 border-dashed border-gray-300 space-y-6 ps-4 text-sm">
                  {orderDetails?.data?.OrderTracking?.map((tracking: OrderTracking, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="">
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {formatDate(tracking.createdAt)}
                          </span>
                          <span className="font-normal border-l-2 text-primary border-0 border-black ml-1 pl-1">
                            {tracking.orderStatus}
                          </span>
                          {tracking?.note && (
                            <span className="font-medium border-l-2 border-0 border-black ml-1 pl-1">
                              {tracking.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
