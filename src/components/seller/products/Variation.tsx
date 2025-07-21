import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Types for variations
interface VariationValue {
  id: number;
  variationId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Variation {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  VariationValue: VariationValue[];
}

interface OptionPillProps {
  label: string;
  onRemove?: () => void;
}

interface VariationProps {
  variations: Variation[];
  variationCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
  }>;
  onCombinationChange: (updatedCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
  }>) => void;
}

const OptionPill: React.FC<OptionPillProps> = ({ label, onRemove }) => (
  <div className="flex items-center border border-[#F17152] text-sm px-3 py-1 rounded-full text-[#F17152] bg-white">
    <span>{label}</span>
    {onRemove && (
      <X
        className="w-3.5 h-3.5 ml-1 cursor-pointer"
        onClick={onRemove}
      />
    )}
  </div>
);

const VariationComponent: React.FC<VariationProps> = ({
  variations,
  variationCombinations,
  onCombinationChange
}) => {

  const [localCombinations, setLocalCombinations] = useState(variationCombinations);

  // Sync with parent when props change
  useEffect(() => {
    setLocalCombinations(variationCombinations);
  }, [variationCombinations]);

  const handleInputChange = (index: number, field: 'price' | 'stock', value: string) => {
    // Remove leading zeros and convert to number
    const numericValue = value === '' ? 0 : Number(value.replace(/^0+/, ''));
    const updated = [...localCombinations];

    updated[index] = {
      ...updated[index],
      [field]: numericValue
    };

    setLocalCombinations(updated);
    onCombinationChange(updated);
  };

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

          {/* Render each variation */}
          {variations.map((variation) => (
            <div
              key={variation.id}
              className="grid grid-cols-2 items-start gap-4 px-4 py-4 border-b"
            >
              <div className="text-sm font-medium text-gray-700 pt-1">
                {variation.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {variation.VariationValue.map((value) => (
                  <OptionPill
                    key={value.id}
                    label={value.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Auto Generated Variants */}
        {variationCombinations.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium text-green-700 mb-2">
              Auto Generated Variants:
            </p>

            <div className="border rounded-xl overflow-x-auto">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-[#FDEFEA] text-sm font-semibold text-gray-800 px-4 py-3 border-b min-w-[700px]">
                <div className="col-span-2">SKU</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-1">Stock</div>
              </div>

              {/* Generate rows for each variation combination */}
             {localCombinations.map((combination, index) => (
          <div 
            key={`${combination.sku}-${index}`}
            className="grid grid-cols-4 items-center gap-3 px-4 py-3 border-b min-w-[700px]"
          >
            <div className="col-span-2">
              <div className="text-sm font-medium text-gray-700">
                {combination.sku}
              </div>
            </div>

            {/* Price Input */}
            <input
              type="number"
              value={combination.price === 0 ? '' : combination.price}
              onChange={(e) => handleInputChange(index, 'price', e.target.value)}
              placeholder="Price"
              className="w-full px-3 py-2 text-sm border rounded-md col-span-1"
            />

            {/* Stock Input */}
            <input
              type="number"
              value={combination.stock === 0 ? '' : combination.stock}
              onChange={(e) => handleInputChange(index, 'stock', e.target.value)}
              placeholder="Stock"
              className="w-full px-3 py-2 text-sm border rounded-md col-span-1"
            />
          </div>
        ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariationComponent;