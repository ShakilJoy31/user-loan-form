import React from "react";
import { X } from "lucide-react";

const OptionPill = ({ label }: { label: string }) => (
  <div className="flex items-center border border-[#F17152] text-sm px-3 py-1 rounded-full text-[#F17152] bg-white">
    <span>{label}</span>
    <X className="w-3.5 h-3.5 ml-1" />
  </div>
);

const Variation: React.FC = () => {
  return (
    <div className="py-4">
      <div className="border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Variant Details
        </h3>

        {/* Variant List */}
        <div className="border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-2 bg-[#FEF1EC] text-sm font-semibold text-gray-800 px-4 py-3 border-b">
            <div>Variants Name</div>
            <div>Options</div>
          </div>

          {/* Weight */}
          <div className="grid grid-cols-2 items-start gap-4 px-4 py-4 border-b">
            <div className="text-sm font-medium text-gray-700 pt-1">Weight</div>
            <div className="flex flex-wrap gap-2">
              <OptionPill label="25 KG" />
              <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                50 KG
              </div>
              <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                100 KG
              </div>
            </div>
          </div>

          {/* Type of Rice */}
          <div className="grid grid-cols-2 items-start gap-4 px-4 py-4 border-b">
            <div className="text-sm font-medium text-gray-700 pt-1">
              Type of Rice
            </div>
            <div className="flex flex-wrap gap-2">
              <OptionPill label="Bashmati (Imported)" />
              <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                Atop
              </div>
              <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                Chinigura
              </div>
            </div>
          </div>

          {/* Quality Grade */}
          <div className="grid grid-cols-2 items-start gap-4 px-4 py-4">
            <div className="text-sm font-medium text-gray-700 pt-1">
              Quality Grade
            </div>
            <div className="flex flex-wrap gap-2">
              <OptionPill label="Standard (Loose)" />
              <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                Polished
              </div>
              <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                Broken grain
              </div>
            </div>
          </div>
        </div>

        {/* Auto Generated Variants */}
        <div className="mt-6">
          <p className="text-sm font-medium text-green-700 mb-2">
            Auto Generated Variants:
          </p>

          <div className="border rounded-xl overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-[#FDEFEA] text-sm font-semibold text-gray-800 px-4 py-3 border-b min-w-[700px]">
              <div className="col-span-2">Options</div>
              <div>Price</div>
              <div>Discount Price</div>
              <div>Purchas Point</div>
              <div>Stock</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-6 items-center gap-3 px-4 py-3 border-b min-w-[700px]">
              <div className="col-span-2 flex flex-wrap gap-2">
                <OptionPill label="25 KG" />
                <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                  50 KG
                </div>
                <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                  100 KG
                </div>
              </div>
              <input
                type="text"
                defaultValue="400 Tk"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                defaultValue="10%"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                defaultValue="100"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                defaultValue="22"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-6 items-center gap-3 px-4 py-3 min-w-[700px]">
              <div className="col-span-2 flex flex-wrap gap-2">
                <OptionPill label="25 KG" />
                <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                  50 KG
                </div>
                <div className="flex items-center border border-gray-300 text-sm px-3 py-1 rounded-full">
                  100 KG
                </div>
              </div>
              <input
                type="text"
                defaultValue="400 Tk"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                defaultValue="10%"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                defaultValue="100"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                defaultValue="45"
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation;
