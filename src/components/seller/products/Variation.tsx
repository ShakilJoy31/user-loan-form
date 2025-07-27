import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Variation } from "@/types/seller/productInterface";

interface VariationProps {
  variations: Variation[];
  variationCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
    discount?: number;
    purchasePoint?: number;
  }>;
  onCombinationChange: (updatedCombinations: Array<{
    sku: string;
    optionValues: string[];
    price: number;
    stock: number;
    discount?: number;
    purchasePoint?: number;
  }>) => void;
  customValues: Record<number, string[]>;
  onCustomValuesChange: (values: Record<number, string[]>) => void;
  selectedValues: Record<number, Array<{ id: number, name: string }>>;
  setSelectedValues: React.Dispatch<React.SetStateAction<Record<number, Array<{ id: number, name: string }>>>>;
}


const VariationComponent: React.FC<VariationProps> = ({
  variations,
  variationCombinations,
  onCombinationChange, customValues, onCustomValuesChange, selectedValues, setSelectedValues
}) => {
  const { translate } = useCustomTranslator();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenMap, setIsOpenMap] = useState<Record<number, boolean>>({});
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  console.log(selectedValues)

  // Initialize state when variations change
  useEffect(() => {
    const initialSelectedValues: Record<number, Array<{ id: number, name: string }>> = {};
    const initialCustomValues: Record<number, string[]> = {};
    const initialIsOpenMap: Record<number, boolean> = {};

    variations.forEach(variation => {
      initialSelectedValues[variation.id] = [];
      initialCustomValues[variation.id] = [];
      initialIsOpenMap[variation.id] = false;
    });

    setSelectedValues(initialSelectedValues);
    onCustomValuesChange(initialCustomValues);
    setIsOpenMap(initialIsOpenMap);
  }, []);

  // Handle clicks outside dropdowns
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

  // Generate combinations when selections change
  const generateCombinations = useCallback(() => {
    const combinations: Array<{
      sku: string;
      optionValues: string[];
      price: number;
      stock: number;
      discount?: number;
      purchasePoint?: number;
    }> = [];

    // Get all selected values (predefined and custom)
    const allSelectedValues = variations.map(variation => {
      const predefined = selectedValues[variation.id] || [];
      const custom = (customValues[variation.id] || []).map(name => ({
        id: -1, // Use -1 to indicate custom values
        name
      }));
      return [...predefined, ...custom];
    });

    // Only proceed if at least one variation has values
    const hasValues = allSelectedValues.some(values => values.length > 0);
    if (!hasValues) {
      onCombinationChange([]);
      return;
    }

    // Generate cartesian product of all selected values
    const cartesianProduct = (...arrays: Array<Array<{ id: number, name: string }>>) => {
      return arrays.reduce((a, b) =>
        a.flatMap(d => b.map(e => [d, e].flat()))
        , [[]] as Array<Array<{ id: number, name: string }>>).filter(arr => arr.length > 0);
    };

    const allCombinations = cartesianProduct(...allSelectedValues);

    // Create combination objects
    allCombinations.forEach(combination => {
      const optionValues = combination.map((value) => value.name);

      // Generate SKU by combining all selected values in lowercase with hyphens
      const skuParts = combination.map((value) =>
        value.name.toLowerCase().replace(/\s+/g, '-')
      );

      const sku = skuParts.join('-');

      // Check if this combination already exists
      const existingCombination = variationCombinations.find(c =>
        c.optionValues.join(',') === optionValues.join(',')
      );

      combinations.push({
        sku,
        optionValues,
        price: existingCombination?.price || 0,
        stock: existingCombination?.stock || 0,
        discount: existingCombination?.discount,
        purchasePoint: existingCombination?.purchasePoint
      });
    });

    onCombinationChange(combinations);
  }, [selectedValues, customValues, variations, onCombinationChange]);




  // Then use this effect:
  useEffect(() => {
    generateCombinations();
  }, [generateCombinations]); // Now this is safe



  const handleInputChange = (index: number, field: 'price' | 'stock' | 'discount', value: string) => {
    const numericValue = value === '' ? undefined : Number(value.replace(/^0+/, ''));
    const updated = [...variationCombinations];

    updated[index] = {
      ...updated[index],
      [field]: numericValue
    };

    onCombinationChange(updated);
  };

  const toggleDropdown = (variationId: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent immediate closing
      e.stopPropagation();
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


  const handleValueSelect = (variationId: number, valueId: number, valueName: string) => {
    setSelectedValues(prev => {
      const currentValues = prev[variationId] || [];
      const isSelected = currentValues.some(v => v.id === valueId);

      return {
        ...prev,
        [variationId]: isSelected
          ? currentValues.filter(v => v.id !== valueId)
          : [...currentValues, { id: valueId, name: valueName }]
      };
    });

    setSearchTerm("");
  };


  const handleAddCustomValue = (variationId: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const newValue = searchTerm.trim();
      onCustomValuesChange({
        ...customValues,
        [variationId]: [...(customValues[variationId] || []), newValue]
      });
      setSearchTerm("");
      setIsOpenMap(prev => ({ ...prev, [variationId]: false }));
    }
  };


  const removeValue = (variationId: number, value: { id: number, name: string }) => {
    if (value.id === -1) {
      // Remove custom value - use the current state
      onCustomValuesChange({
        ...customValues,
        [variationId]: (customValues[variationId] || []).filter(name => name !== value.name)
      });
    } else {
      // Remove predefined value - this can stay the same
      setSelectedValues(prev => ({
        ...prev,
        [variationId]: (prev[variationId] || []).filter(v => v.id !== value.id)
      }));
    }
  };

  const clearSelection = (variationId: number) => {
    setSelectedValues(prev => ({ ...prev, [variationId]: [] }));
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
    const predefined = selectedValues[variationId] || [];
    const custom = (customValues[variationId] || []).map(name => ({ id: -1, name }));
    return [...predefined, ...custom];
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
                            <span className="truncate">{value.name}</span>
                            <button type='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                removeValue(variation.id, value);
                              }}
                              className="ml-1 text-gray-400 hover:text-gray-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="text"
                      ref={el => { inputRefs.current[variation.id] = el; }}
                      value={isOpenMap[variation.id] ? searchTerm : ""}
                      onChange={(e) => {
                        console.log('function triggered.')
                        setSearchTerm(e.target.value);
                        generateCombinations()
                        if (!isOpenMap[variation.id]) setIsOpenMap(prev => ({ ...prev, [variation.id]: true }));
                      }}
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
                      onMouseDown={(e) => { // Changed to onMouseDown
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
                      {variation.VariationValue.filter(value =>
                        value.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length > 0 && (
                          <>
                            <div className="px-4 py-1 text-xs text-gray-500">
                              {translate("প্রিডিফাইন্ড অপশন", "Predefined options")}
                            </div>
                            {variation.VariationValue
                              .filter(value =>
                                value.name.toLowerCase().includes(searchTerm.toLowerCase())
                              )
                              .map((value) => {
                                const isSelected = selectedValues[variation.id]?.some(v => v.id === value.id);
                                return (
                                  <div
                                    key={value.id}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${isSelected ? "bg-gray-100" : ""
                                      }`}
                                    onClick={() => {
                                      handleValueSelect(variation.id, value.id, value.name);
                                      generateCombinations();
                                      console.log('checkjdfhsgdjfg')
                                    }}
                                  >
                                    <div
                                      className={`mr-2 h-4 w-4 border border-gray-300 rounded flex items-center justify-center ${isSelected ? "bg-[#EE5A2C] border-[#EE5A2C]" : ""
                                        }`}
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

                      {/* Custom values */}
                      {(customValues[variation.id] || []).filter(name =>
                        name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length > 0 && (
                          <>
                            <div className="px-4 py-1 text-xs text-gray-500">
                              {translate("কাস্টম অপশন", "Custom options")}
                            </div>
                            {(customValues[variation.id] || [])
                              .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((name) => (
                                <div
                                  key={name}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                >
                                  <div className="mr-2 h-4 w-4 border rounded flex items-center justify-center bg-[#EE5A2C] border-[#EE5A2C]">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="text-[#EE5A2C]">{name}</span>
                                </div>
                              ))}
                          </>
                        )}

                      {variation.VariationValue.filter(value =>
                        value.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length === 0 &&
                        (customValues[variation.id] || []).filter(name =>
                          name.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length === 0 && (
                          <div className="px-4 py-2 text-gray-500">
                            {searchTerm
                              ? translate("কোন অপশন পাওয়া যায়নি", "No options found")
                              : translate("অনুসন্ধান করতে টাইপ করুন", "Start typing to search")}
                          </div>
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
                    value={combination.price === 0 ? '' : combination.price}
                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    placeholder="Price"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  <input
                    type="number"
                    value={combination.discount || ''}
                    onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                    placeholder="Discount"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  {/* Stock Input */}
                  <input
                    type="number"
                    value={combination.stock === 0 ? '' : combination.stock}
                    onChange={(e) => handleInputChange(index, 'stock', e.target.value)}
                    placeholder="Stock"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  {/* Delete Button */}
                  <button
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