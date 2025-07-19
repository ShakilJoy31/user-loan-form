"use client";
import { FiEdit, FiTrash2, FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

type Address = {
  id: number;
  city: string;
  zone: string;
  area: string;
  addressLine: string;
};

const ShippingAddressTab = () => {
  const { translate } = useCustomTranslator();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      city: translate("বাগেরহাট", "Bagerhat"),
      zone: translate("বাগেরহাট সদর", "Bagerhat Sadar"),
      area: translate("বাগেরহাট সদর", "Bagerhat sadar"),
      addressLine: translate("সাহাপাড়া, বাগেরহাট", "sahapara, bagerhat"),
    },
    {
      id: 1,
      city: translate("বাগেরহাট", "Bagerhat"),
      zone: translate("বাগেরহাট সদর", "Bagerhat Sadar"),
      area: translate("বাগেরহাট সদর", "Bagerhat sadar"),
      addressLine: translate("সাহাপাড়া, বাগেরহাট", "sahapara, bagerhat"),
    }
  ]);

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleDeleteAll = () => {
    setAddresses([]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {translate("শিপিং ঠিকানা", "Shipping Address")}
          </h2>
          <p className="text-sm text-gray-500">
            {translate("আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন", "Track your order Status")}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Button variant={'outline'} className="bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            {translate("নতুন ঠিকানা যোগ করুন", "Add New Address")}
          </Button>
          <Button variant={'outline'}
            onClick={handleDeleteAll}
            className="bg-white font-medium px-4 py-2 rounded-md transition text-sm text-black border border-gray-200"
          >
            {translate("সব মুছে ফেলুন", "Delete All")}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg px-4 py-3 relative"
          >
            <div className="flex items-center gap-2 mb-3">
              <FiMapPin className="text-gray-500" />
              <p className="text-sm font-medium text-gray-800">
                {translate("ঠিকানা", "Address")} {address.id}
              </p>
            </div>

            <div className="text-sm space-y-1 pl-6 text-gray-700">
              <p>
                <span className="font-semibold">
                  {translate("শহর:", "City:")}
                </span> {address.city}
              </p>
              <p>
                <span className="font-semibold">
                  {translate("জোন:", "Zone:")}
                </span> {address.zone}
              </p>
              <p>
                <span className="font-semibold">
                  {translate("এলাকা:", "Area:")}
                </span> {address.area}
              </p>
              <p>
                <span className="font-semibold">
                  {translate("ঠিকানা:", "Address:")}
                </span> {address.addressLine}
              </p>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <Button variant={'outline'} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm px-3 py-1 border border-gray-300 rounded-md">
                <FiEdit size={14} />
                {translate("সম্পাদনা", "Edit")}
              </Button>
              <Button variant={'outline'}
                onClick={() => handleDelete(address.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <FiTrash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingAddressTab;