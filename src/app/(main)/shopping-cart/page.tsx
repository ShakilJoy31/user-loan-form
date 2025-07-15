"use client"
import Image from "next/image";
import { FiTrash2, FiTag } from "react-icons/fi";
import wiring from "@/assets/Home/wiring.png";
import { Button } from "@/components/ui/button";

const ShoppingCart = () => {
  return (
    <div className="mt-16 lg:pt-[40px] max-w-[1280px] mx-auto px-4">
      <h2 className="text-[18px] font-medium mb-[51px] text-gray-300">
        Home / Shop details / Gang Light{" "}
        <span className="text-[#EE5A2C]">/ Cart</span>{" "}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Products Table */}
        <div className="flex-1 lg:max-w-[715px]">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#FDEFEA]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700">Product</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700">Price</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700">Quantity</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700">Warranty</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700">Subtotal</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-12 w-12 border border-gray-200 rounded-md overflow-hidden">
                        <Image
                          src={wiring}
                          alt="House Wiring Cable"
                          className="h-full w-full object-cover"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium">House Wiring Cable</p>
                        <p className="text-xs text-gray-500">Color: Multiple</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-primary">180Tk</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center border border-gray-300 rounded-md w-fit">
                      <Button variant="ghost" size="sm" className="px-2 md:px-3">-</Button>
                      <span className="px-2 text-sm">1</span>
                      <Button variant="ghost" size="sm" className="px-2 md:px-3">+</Button>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1 Year</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">180Tk</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:max-w-[400px] xl:max-w-[505px]">
          <div className="border border-gray-200 rounded-xl lg:-mt-2 p-4 md:p-6 space-y-6">
            <h2 className="text-lg md:text-xl font-bold">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">565Tk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount (-20%)</span>
                <span className="text-primary">-113Tk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-medium">15Tk</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-base md:text-lg">
                <span>Total</span>
                <span>467Tk</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button className="bg-[#EE5A2C] text-white px-4 py-2 max-w-[126px] max-h-[48px] whitespace-nowrap">
                Apply Code
              </Button>
            </div>

            <Button className="w-full bg-[#EE5A2C] text-white py-2 rounded-md">
              Proceed To Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;