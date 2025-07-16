"use client";
import { FiEdit, FiTrash2, FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Address = {
  id: number;
  city: string;
  zone: string;
  area: string;
  addressLine: string;
};

const dummyAddresses: Address[] = [
  {
    id: 1,
    city: "Bagerhat",
    zone: "Bagerhat Sadar",
    area: "Bagerhat sadar",
    addressLine: "sahapara, bagerhat",
  },
  {
    id: 2,
    city: "Bagerhat",
    zone: "Bagerhat Sadar",
    area: "Bagerhat sadar",
    addressLine: "sahapara, bagerhat",
  },
];

export default function ShippingAddressTab() {
  const [addresses, setAddresses] = useState<Address[]>(dummyAddresses);

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleDeleteAll = () => {
    setAddresses([]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Shipping Address
          </h2>
          <p className="text-sm text-gray-500">Trac your order Status</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Button variant={'outline'} className="bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            Add New Address
          </Button>
          <Button variant={'outline'}
            onClick={handleDeleteAll}
            className="bg-white font-medium px-4 py-2 rounded-md transition text-sm text-black border border-gray-200"
          >
            Delete All
          </Button>
        </div>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg px-4 py-3 relative"
          >
            {/* Top Left */}
            <div className="flex items-center gap-2 mb-3">
              <FiMapPin className="text-gray-500" />
              <p className="text-sm font-medium text-gray-800">Address {address.id}</p>
            </div>

            {/* Address Details */}
            <div className="text-sm space-y-1 pl-6 text-gray-700">
              <p>
                <span className="font-semibold">City:</span> {address.city}
              </p>
              <p>
                <span className="font-semibold">Zone:</span> {address.zone}
              </p>
              <p>
                <span className="font-semibold">Area:</span> {address.area}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {address.addressLine}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <Button variant={'outline'} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm px-3 py-1 border border-gray-300 rounded-md">
                <FiEdit size={14} />
                Edit
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
}
