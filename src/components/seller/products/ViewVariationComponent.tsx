import React from "react";

interface Variation {
  name: string;
  options: string[];
}

interface OptionPillProps {
  label: string;
}

interface ViewVariationProps {
  variations: Variation[];
  variationCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
    discount?: number;
    purchasePoint?: number;
  }>;
}

const OptionPill: React.FC<OptionPillProps> = ({ label }) => (
  <div className="flex items-center border border-[#F17152] text-sm px-3 py-1 rounded-full text-[#F17152] bg-white">
    <span>{label}</span>
  </div>
);

const ViewVariationComponent: React.FC<ViewVariationProps> = ({
  variations,
  variationCombinations,
}) => {
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
          {variations.map((variation, index) => (
            <div
              key={index}
              className="grid grid-cols-2 items-start gap-4 px-4 py-4 border-b"
            >
              <div className="text-sm font-medium text-gray-700 pt-1">
                {variation.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {variation.options.map((value, idx) => (
                  <OptionPill
                    key={idx}
                    label={value}
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
              <div className="grid grid-cols-8 bg-[#FDEFEA] text-sm font-semibold text-gray-800 px-4 py-3 border-b min-w-[900px]">
                <h1 className="col-span-1 text-center">SL</h1>
                <h1 className="col-span-2 text-center">SKU</h1>
                <h1 className="col-span-1 text-center">Price</h1>
                <h1 className="col-span-1 text-center">Discount</h1>
                <h1 className="col-span-1 text-center">Purchas Point</h1>
                <h1 className="col-span-1 text-center">Stock</h1>
                <h1 className="col-span-1 text-center">Actions</h1>
              </div>

              {/* Generate rows for each variation combination */}
              {variationCombinations.map((combination, index) => (
                <div 
                  key={`${combination.sku}-${index}`}
                  className="grid grid-cols-8 items-center gap-3 px-4 py-3 border-b min-w-[900px]"
                >
                  <div className="col-span-1">
                    <div className="text-sm font-medium text-gray-700 text-center">
                      {index + 1}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-700 text-center">
                      {combination.sku}
                    </div>
                  </div>

                  {/* Price Input */}
                  <input
                    type="number"
                    value={combination.price === 0 ? '' : combination.price}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center bg-gray-50"
                  />

                  <input
                    type="number"
                    value={combination.discount || ''}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center bg-gray-50"
                  />

                  <input
                    type="number"
                    value={combination.purchasePoint || ''}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center bg-gray-50"
                  />

                  {/* Stock Input */}
                  <input
                    type="number"
                    value={combination.stock === 0 ? '' : combination.stock}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center bg-gray-50"
                  />

                  {/* Delete Button - Disabled in view mode */}
                  <button
                    disabled
                    className="text-gray-400 text-sm font-medium cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewVariationComponent;