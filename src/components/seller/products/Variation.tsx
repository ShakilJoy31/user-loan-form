import React, { useState, useRef, useEffect } from "react";
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
  }>;
  onCombinationChange: (index: number, field: 'price' | 'stock' | 'discount', value: string) => void;
  onDeleteRow: (index: number) => void;
  customValues: Record<number, string[]>;
  onCustomValuesChange: (variationId: number, value: string) => void;
  selectedValues: Record<number, Array<{ id: number, name: string }>>;
  onValueSelect: (variationId: number, valueId: number, valueName: string) => void;
  onRemoveValue: (variationId: number, value: { id: number, name: string }) => void;
  onClearSelection: (variationId: number) => void;
}

const VariationComponent: React.FC<VariationProps> = ({
  variations,
  variationCombinations,
  onCombinationChange,
  onDeleteRow,
  customValues,
  onCustomValuesChange,
  selectedValues,
  onValueSelect,
  onRemoveValue,
  onClearSelection
}) => {
  const { translate } = useCustomTranslator();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenMap, setIsOpenMap] = useState<Record<number, boolean>>({});
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  console.log(variations);

  // console.log(selectedValues)

  // Initialize dropdown states
  useEffect(() => {
    const initialIsOpenMap: Record<number, boolean> = {};
    variations.forEach(variation => {
      initialIsOpenMap[variation.id] = false;
    });
    setIsOpenMap(initialIsOpenMap);
  }, [variations]);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([variationId, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
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

  const toggleDropdown = (variationId: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
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

  const handleAddCustomValue = (variationId: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault(); // Add this line to prevent form submission
      e.stopPropagation(); // Add this line to prevent event bubbling
      onCustomValuesChange(variationId, searchTerm.trim());
      setSearchTerm("");
      setIsOpenMap(prev => ({ ...prev, [variationId]: false }));
    }
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

        <div className="border rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 bg-[#FEF1EC] text-sm font-semibold text-gray-800 px-4 py-3 border-b">
            <div>Variants Name</div>
            <div>Options</div>
          </div>

          {variations.sort((a, b) => {
    // Required variations come first
    if (a.isRequired && !b.isRequired) return -1;
    if (!a.isRequired && b.isRequired) return 1;
    return 0;
  }).map((variation) => (
            <div
              key={variation.id}
              className="grid grid-cols-2 items-start gap-4 px-4 py-4 border-b"
            >
              <div className="text-sm font-medium text-gray-700 pt-1">
                {variation.name}
                {variation.isRequired && <span className="text-red-500 ml-1">*</span>}
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
                                onRemoveValue(variation.id, value);
                              }}
                              className="ml-1 text-gray-400 hover:text-gray-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}


                    {
                      variation.VariationValue?.length < 1 && (
                        <input
                          type="text"
                          ref={el => { inputRefs.current[variation.id] = el; }}
                          value={isOpenMap[variation.id] ? searchTerm : ""}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddCustomValue(variation.id, e);
                            }
                          }}
                          onFocus={() => {
                            if (!isOpenMap[variation.id]) setIsOpenMap(prev => ({ ...prev, [variation.id]: true }));
                          }}
                          className="flex-1 min-w-[100px] outline-none bg-transparent"
                          placeholder={getAllValuesForVariation(variation.id).length === 0 ? "" : ""}
                        />
                      )
                    }


                  </div>

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {getAllValuesForVariation(variation.id).length > 0 && !isOpenMap[variation.id] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClearSelection(variation.id);
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

                      {variation.VariationValue.filter(value =>
                        value.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length > 0 && (
                          <>
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
                                      onValueSelect(variation.id, value.id, value.name);
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

        {variationCombinations.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium text-green-700 mb-2">
              Auto Generated Variants:
            </p>

            <div className="border rounded-xl overflow-x-auto">
              <div className="grid grid-cols-7 bg-[#FDEFEA] text-sm font-semibold text-gray-800 px-4 py-3 border-b min-w-[900px]">
                <h1 className="col-span-1 text-center">SL</h1>
                <h1 className="col-span-2 text-center">SKU</h1>
                <h1 className="col-span-1 text-center">Price</h1>
                <h1 className="col-span-1 text-center">Discount</h1>
                <h1 className="col-span-1 text-center">Stock</h1>
                <h1 className="col-span-1 text-center">Actions</h1>
              </div>

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

                  <input
                    type="number"
                    value={combination.price === 0 ? '' : combination.price}
                    onChange={(e) => onCombinationChange(index, 'price', e.target.value)}
                    placeholder="Price"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  <input
                    type="number"
                    value={combination.discount || ''}
                    onChange={(e) => onCombinationChange(index, 'discount', e.target.value)}
                    placeholder="Discount"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  <input
                    type="number"
                    value={combination.stock === 0 ? '' : combination.stock}
                    onChange={(e) => onCombinationChange(index, 'stock', e.target.value)}
                    placeholder="Stock"
                    className="w-full px-3 py-2 text-sm border rounded-md placeholder:text-center text-center"
                  />

                  <button
                    onClick={() => onDeleteRow(index)}
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