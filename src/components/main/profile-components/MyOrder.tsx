"use client";
import Image from "next/image";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import product1 from "@/assets/Products_Image/products.jpg";
import product2 from "@/assets/Products_Image/products.jpg";
import product3 from "@/assets/Products_Image/products.jpg";
import product4 from "@/assets/Products_Image/products.jpg";
import product5 from "@/assets/Products_Image/products.jpg";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const OrderTab = () => {
  const { translate } = useCustomTranslator();
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

const orders = [
    {
        id: 1,
        image: product1,
        name: "3D computer improved version",
        category: "3D Product",
        price: "800 Tk",
        date: "Aug 15",
    },
    {
        id: 2,
        image: product2,
        name: "Classic yellow-gray wallpaper",
        category: "Wallpaper 3D",
        price: "800 Tk",
        date: "Aug 15",
    },
    {
        id: 3,
        image: product3,
        name: "3D soothing wallaperme 4",
        category: "Wallpaper",
        price: "800 Tk",
        date: "Aug 15",
    },
    {
        id: 4,
        image: product4,
        name: "Abstract virtual reality personality",
        category: "Abstract",
        price: "800 Tk",
        date: "Aug 15",
    },
    {
        id: 5,
        image: product5,
        name: "Gray vintage 3D computer",
        category: "3D Product",
        price: "800 Tk",
        date: "Aug 15",
    },
];


  const toggleOrder = (id: number) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {translate("পণ্য", "Products")}
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder={translate("অনুসন্ধান...", "Search...")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50 text-sm text-gray-600 text-left">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  className="accent-[#EE5A2C]"
                  checked={selectedOrders.length === orders.length}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-4 py-2">{translate("পণ্য", "Product")}</th>
              <th className="px-4 py-2">{translate("দাম", "Price")}</th>
              <th className="px-4 py-2">{translate("অর্ডার করা হয়েছে", "Ordered")}</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`border-b hover:bg-[#F1F1F1] rounded-lg ${
                  selectedOrders.includes(order.id) ? "bg-gray-50" : ""
                }`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="accent-[#EE5A2C]"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleOrder(order.id)}
                  />
                </td>
                <td className="px-4 py-4 flex gap-3 items-center">
                  <Image
                    src={order.image}
                    alt={order.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover w-12 h-12"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{order.name}</p>
                    <p className="text-xs text-gray-500">{order.category}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-[#FDEFEA] text-[#5A5A5A] rounded-md px-2 py-1 text-sm">
                    {order.price}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-600">{order.date}</td>
                <td className="px-4 py-4">
                  <Button variant={'outline'} className="bg-[#EE5A2C] text-white font-bold text-xs px-4 py-2 rounded-full">
                    {translate("অর্ডার ট্র্যাক করুন", "Track order")}
                  </Button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-x-4">
                    <button className="text-black font-bold hover:text-red-500">
                      <FiTrash2 />
                    </button>
                    <button className="text-black font-bold hover:text-orange-500">
                      <FaArrowRight />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
        <div className="text-sm text-gray-600">
          ✓ {selectedOrders.length} {translate("পণ্য নির্বাচিত হয়েছে", "products selected")}
        </div>
        <div className="flex items-center gap-3">
          <Button variant={'outline'} className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-sm">
            {translate("মুছে ফেলুন", "Delete")}
          </Button>
          <Button variant={'outline'} className="bg-[#EE5A2C] hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
            {translate("আনপাবলিশ", "Unpublish")}
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
          {translate("পূর্ববর্তী", "Previous")}
        </Button>
        {[1, 2, 3].map((num) => (
          <Button variant={'outline'}
            key={num}
            className={`text-sm px-3 py-1 border ${
              num === 1
                ? "bg-orange-500 text-white"
                : "border-gray-300 hover:bg-gray-100"
            } rounded-md`}
          >
            {num}
          </Button>
        ))}
        <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
          {translate("পরবর্তী", "Next")}
        </Button>
      </div>
    </div>
  );
};

export default OrderTab;