import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface VariationProps {
  variations: {
    id: number;
    name: string;
    VariationValue: Array<{
      id: number;
      name: string;
      variationId: number;
    }>;
  }[];
  variationCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
    discountPrice?: number;
    id?: number;
  }>;
  onCombinationChange: (updatedCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
    discount?: number;
    id?: number;
  }>) => void;
  customValues: Record<number, string[]>;
  onCustomValuesChange: (values: Record<number, string[]>) => void;
  selectedValues: Record<number, Array<{ id: number, name: string }>>;
  setSelectedValues: React.Dispatch<React.SetStateAction<Record<number, Array<{ id: number, name: string }>>>>;
  regenerateCombinations: (selectedValues: Record<number, Array<{ id: number, name: string }>>) => void;
}

const VariationComponent: React.FC<VariationProps> = ({
  variations,
  variationCombinations,
  onCombinationChange,
  customValues,
  onCustomValuesChange,
  selectedValues,
  setSelectedValues,
  regenerateCombinations
}) => {

  const { translate } = useCustomTranslator();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenMap, setIsOpenMap] = useState<Record<number, boolean>>({});
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Initialize selected values when variations change
  useEffect(() => {
    const initialSelectedValues: Record<number, Array<{ id: number, name: string }>> = {};

    variations.forEach(variation => {
      // Initialize empty array for each variation
      initialSelectedValues[variation.id] = [];

      // Find all values used in combinations for this variation
      const usedValues = new Set<string>();
      variationCombinations.forEach(comb => {
        comb.optionValues.forEach(val => {
          if (variation.VariationValue.some(v => v.name === val)) {
            usedValues.add(val);
          }
        });
      });

      // Set selected values from both predefined and custom values
      const selectedPredefined = variation.VariationValue
        .filter(v => usedValues.has(v.name))
        .map(v => ({ id: v.id, name: v.name }));

      const selectedCustom = (customValues[variation.id] || [])
        .filter(name => usedValues.has(name))
        .map(name => ({ id: -1, name }));

      initialSelectedValues[variation.id] = [...selectedPredefined, ...selectedCustom];
    });

    setIsOpenMap(variations.reduce((acc, v) => ({ ...acc, [v.id]: false }), {}));
  }, [customValues, variationCombinations, variations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([variationId, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          // Only close if the click wasn't on the toggle button
          const toggleButton = ref.querySelector('button[aria-label="Toggle dropdown"]');
          if (!toggleButton || !toggleButton.contains(event.target as Node)) {
            setIsOpenMap(prev => ({ ...prev, [variationId]: false }));
          }
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleInputChange = (index: number, field: 'price' | 'stock' | 'discountPrice' , value: string) => {
    const numericValue = value === '' ? 0 : Number(value);
    const updated = [...variationCombinations];

    updated[index] = {
      ...updated[index],
      [field]: numericValue
    };

    onCombinationChange(updated);
  };
  const toggleDropdown = (variationId: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event bubbling
    }

    setIsOpenMap(prev => {
      const newState = !prev[variationId];
      if (newState) {
        setTimeout(() => {
          inputRefs.current[variationId]?.focus();
        }, 0);
      }
      return { ...prev, [variationId]: newState };
    });
  };
  // Add this useEffect


  const handleValueSelect = (variationId: number, valueId: number, valueName: string) => {
    setSelectedValues(prev => {
      const currentValues = prev[variationId] || [];
      const isSelected = currentValues.some(v => v.id === valueId && v.name === valueName);

      const newValues = isSelected
        ? currentValues.filter(v => !(v.id === valueId && v.name === valueName))
        : [...currentValues, { id: valueId, name: valueName }];

      console.log(newValues)

      const updatedValues = {
        ...prev,
        [variationId]: newValues
      };

      console.log(updatedValues)

      // Call the parent's regenerateCombinations with updated values
      regenerateCombinations(updatedValues);

      return updatedValues;
    });
  };



  const handleAddCustomValue = (variationId: number, e: React.KeyboardEvent) => {
    // e.preventDefault();
    if (e.key === 'Enter' && searchTerm.trim()) {
      const newValue = searchTerm.trim();

      setSelectedValues(prev => {
        const updatedValues = {
          ...prev,
          [variationId]: [...(prev[variationId] || []), { id: -1, name: newValue }]
        };
        regenerateCombinations(updatedValues);
        return updatedValues;
      });

      onCustomValuesChange({
        ...customValues,
        [variationId]: [...(customValues[variationId] || []), newValue]
      });

      setSearchTerm("");
      setIsOpenMap(prev => ({ ...prev, [variationId]: false }));
    }
  };

  const removeValue = (variationId: number, value: { id: number, name: string }) => {
    setSelectedValues(prev => {
      const updatedValues = {
        ...prev,
        [variationId]: (prev[variationId] || []).filter(v => !(v.id === value.id && v.name === value.name))
      };
      regenerateCombinations(updatedValues);
      return updatedValues;
    });

    if (value.id === -1) {
      onCustomValuesChange({
        ...customValues,
        [variationId]: (customValues[variationId] || []).filter(name => name !== value.name)
      });
    }
  };

  const clearSelection = (variationId: number) => {
    setSelectedValues(prev => {
      const updatedValues = { ...prev, [variationId]: [] };
      regenerateCombinations(updatedValues);
      return updatedValues;
    });

    onCustomValuesChange({
      ...customValues,
      [variationId]: []
    });
    setSearchTerm("");
    inputRefs.current[variationId]?.focus();
  };

  const deleteRow = (index: number) => {
    const updated = [...variationCombinations];
    updated.splice(index, 1);
    onCombinationChange(updated);
  };

  const getAllValuesForVariation = (variationId: number) => {
    return selectedValues[variationId] || [];
  };

  console.log(selectedValues)

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

              <div className="relative" ref={el => { dropdownRefs.current[variation.id] = el; }}>
                <div className="relative">
                  <div
                    className="w-full min-h-[42px] px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex flex-wrap gap-2 items-center"
                    onMouseDown={(e) => toggleDropdown(variation.id, e)}
                  >
                    {getAllValuesForVariation(variation.id).length === 0 ? (
                      <span className="text-gray-400">
                        {translate("অপশন নির্বাচন করুন", "Select Options")}
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {getAllValuesForVariation(variation.id).map((value) => (
                          <div
                            key={`${value.id}-${value.name}`}
                            className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <span className="truncate">{value.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeValue(variation.id, value);
                                }}
                                className="ml-1 text-gray-400 hover:text-gray-600"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="text"
                      ref={el => { inputRefs.current[variation.id] = el; }}
                      value={isOpenMap[variation.id] ? searchTerm : ""}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => handleAddCustomValue(variation.id, e)}
                      onFocus={() => {
                        if (!isOpenMap[variation.id]) setIsOpenMap(prev => ({ ...prev, [variation.id]: true }));
                      }}
                      className="flex-1 min-w-[100px] outline-none bg-transparent"
                      placeholder={getAllValuesForVariation(variation.id).length === 0 ? "" : ""}
                    />
                  </div>

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {getAllValuesForVariation(variation.id).length > 0 && !isOpenMap[variation.id] && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearSelection(variation.id);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label={translate("নির্বাচন পরিষ্কার করুন", "Clear selection")}
                      >
                        <X size={18} />
                      </button>
                    )}
                    <button
                      type='button'
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        toggleDropdown(variation.id, e);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {isOpenMap[variation.id] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {isOpenMap[variation.id] && (
                  <div className="z-[999] mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 border-bl-md border-br-md border-gray-300 focus:outline-none overflow-auto">
                    <div className="py-1">
                      {/* Search input for custom values */}
                      <div className="px-4 py-2">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => handleAddCustomValue(variation.id, e)}
                          placeholder={translate("টাইপ করুন এবং এন্টার চাপুন", "Type and press Enter")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          autoFocus
                        />
                      </div>

                      {/* Predefined values */}
                      {variation.VariationValue.length > 0 && (
                        <>
                          <div className="px-4 py-1 text-xs text-gray-500">
                            {translate("প্রিডিফাইন্ড অপশন", "Predefined options")}
                          </div>
                          {variation.VariationValue
                            .filter(value =>
                              searchTerm === "" ||
                              value.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((value) => {
                              const isSelected = selectedValues[variation.id]?.some(v => v.id === value.id && v.name === value.name);
                              return (
                                <div
                                  key={value.id}
                                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${isSelected ? "bg-gray-100" : ""}`}
                                  onClick={() => handleValueSelect(variation.id, value.id, value.name)}
                                >
                                  <div
                                    className={`mr-2 h-4 w-4 border border-gray-300 rounded flex items-center justify-center ${isSelected ? "bg-[#EE5A2C] border-[#EE5A2C]" : ""}`}
                                  >
                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                  </div>
                                  <span className={isSelected ? "text-[#EE5A2C]" : ""}>
                                    {value.name}
                                  </span>
                                </div>
                              );
                            })}
                        </>
                      )}
                    </div>
                  </div>
                )}
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
              <div className="grid grid-cols-7 bg-[#FDEFEA] text-sm font-semibold text-gray-800 px-4 py-3 border-b min-w-[900px]">
                <h1 className="col-span-1 text-center">SL</h1>
                <h1 className="col-span-2 text-center">SKU</h1>
                <h1 className="col-span-1 text-center">Price</h1>
                <h1 className="col-span-1 text-center">Discount</h1>
                <h1 className="col-span-1 text-center">Stock</h1>
                <h1 className="col-span-1 text-center">Actions</h1>
              </div>

              {/* Generate rows for each variation combination */}
              {variationCombinations.map((combination, index) => (
                <div
                  key={`${combination.sku}-${index}`}
                  className="grid grid-cols-7 items-center gap-3 px-4 py-3 border-b min-w-[900px]"
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
                    value={combination.price || ''}
                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    placeholder="Price"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  <input
                    type="number"
                    value={combination.discountPrice || ''}
                    onChange={(e) => handleInputChange(index, 'discountPrice', e.target.value)}
                    placeholder="Discount"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  {/* Stock Input */}
                  <input
                    type="number"
                    value={combination.stock || ''}
                    onChange={(e) => handleInputChange(index, 'stock', e.target.value)}
                    placeholder="Stock"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => deleteRow(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
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

export default VariationComponent;