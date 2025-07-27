"use client";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { FiChevronDown, FiX, FiChevronUp } from "react-icons/fi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface Variation {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface CategoryWiseVariation {
  id?: number;
  categoryId: number;
  isRequired: boolean;
  variationId?: number;
  variationIds?: number[];
  category?: {
    name: string;
  };
  variation?: {
    id: number;
    name: string;
  };
}

interface AddEditCategoryWiseVariationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { 
    categoryId: number; 
    isRequired: boolean;
    variationIds: number[] 
  }) => void;
  initialData: CategoryWiseVariation | null;
  loading: boolean;
  categories: Category[];
  variations: Variation[];
}

const AddEditCategoryWiseVariation = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
  categories = [],
  variations = [],
}: AddEditCategoryWiseVariationProps) => {
  const [categoryId, setCategoryId] = useState<number>(initialData?.categoryId || 0);
  const [isRequired, setIsRequired] = useState<boolean>(initialData?.isRequired || false);
  const [selectedVariations, setSelectedVariations] = useState<number[]>(
    initialData?.variationId ? [initialData.variationId] : initialData?.variationIds || []
  );
  const [error, setError] = useState<string | null>(null);

  const [isVariationOpen, setIsVariationOpen] = useState(false);
  const [variationSearchTerm, setVariationSearchTerm] = useState("");
  const variationDropdownRef = useRef<HTMLDivElement>(null);
  const variationInputRef = useRef<HTMLInputElement>(null);
  const { translate } = useCustomTranslator();

  useEffect(() => {
    if (initialData) {
      setCategoryId(initialData.categoryId);
      setIsRequired(initialData.isRequired);
      setSelectedVariations(
        initialData.variationId 
          ? [initialData.variationId] 
          : initialData.variationIds || []
      );
    } else {
      setCategoryId(0);
      setIsRequired(false);
      setSelectedVariations([]);
    }
    setError(null);
    setVariationSearchTerm("");
    setIsVariationOpen(false);
  }, [initialData, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        variationDropdownRef.current &&
        !variationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsVariationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredVariations = variations.filter(variation =>
    variation.name.toLowerCase().includes(variationSearchTerm.toLowerCase())
  );

  const handleVariationToggle = (variationId: number) => {
    setSelectedVariations(prev =>
      prev.includes(variationId)
        ? prev.filter(id => id !== variationId)
        : [...prev, variationId]
    );
    setError(null);
  };

  const handleSubmit = () => {
    if (!categoryId) {
      setError(translate("একটি ক্যাটাগরি নির্বাচন করুন", "Please select a category"));
      return;
    }
    if (selectedVariations.length === 0) {
      setError(translate("অন্তত একটি বৈচিত্র্য নির্বাচন করুন", "Please select at least one variation"));
      return;
    }

    onSubmit({
      categoryId,
      isRequired,
      variationIds: selectedVariations,
    });
  };

  const removeVariation = (variationId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    handleVariationToggle(variationId);
  };

  const getVariationNameById = (id: number): string => {
    return variations.find(v => v.id === id)?.name || "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {initialData 
              ? translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য সম্পাদনা করুন", "Edit Category-wise Variation")
              : translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য যোগ করুন", "Add Category-wise Variation")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {translate("ক্যাটাগরি *", "Category *")}
              </label>
              <select
                className="w-full dark:bg-black dark:text-white px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-pointer appearance-none"
                value={categoryId || ""}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  setCategoryId(selectedId);
                  setError(null);
                }}
              >
                <option value="">{translate("একটি ক্যাটাগরি নির্বাচন করুন", "Select a category")}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <FiChevronDown size={20} className="text-gray-400" />
              </div>
            </div>
            {error && error.includes(translate("ক্যাটাগরি", "category")) && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          

          <div className="space-y-2">
            <div className="relative" ref={variationDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {translate("বৈচিত্র্য *", "Variations *")}
              </label>
              
              <div className="relative">
                <div
                  ref={variationInputRef}
                  className="w-full dark:bg-black dark:text-white min-h-[42px] px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex flex-wrap gap-2 items-center"
                  onClick={() => setIsVariationOpen(true)}
                >
                  {selectedVariations.length === 0 ? (
                    <span className="text-gray-400">
                      {translate("বৈচিত্র্য নির্বাচন করুন", "Select variations")}
                    </span>
                  ) : (
                    selectedVariations.map(variationId => (
                      <div
                        key={variationId}
                        className="bg-gray-100 dark:bg-black dark:text-white px-2 py-1 rounded-md text-sm flex items-center justify-between"
                      >
                        <span className="truncate">
                          {getVariationNameById(variationId)}
                        </span>
                        <button
                          onClick={(e) => removeVariation(variationId, e)}
                          className="ml-1 text-gray-400 hover:text-gray-600"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))
                  )}
                  <input
                    type="text"
                    value={isVariationOpen ? variationSearchTerm : ""}
                    onChange={(e) => {
                      setVariationSearchTerm(e.target.value);
                      if (!isVariationOpen) setIsVariationOpen(true);
                    }}
                    onFocus={() => {
                      if (!isVariationOpen) setIsVariationOpen(true);
                    }}
                    className="flex-1 dark:bg-black dark:text-black min-w-[100px] outline-none bg-transparent"
                    placeholder={selectedVariations.length === 0 ? "" : ""}
                  />
                </div>
                
                <div className="absolute dark:bg-black dark:text-black right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {selectedVariations.length > 0 && !isVariationOpen && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariations([]);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={translate("সিলেকশন পরিষ্কার করুন", "Clear selection")}
                    >
                      <FiX size={18} />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVariationOpen(!isVariationOpen);
                      variationInputRef.current?.focus();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label={translate("ড্রপডাউন টগল করুন", "Toggle dropdown")}
                  >
                    {isVariationOpen ? (
                      <FiChevronUp size={20} />
                    ) : (
                      <FiChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>

              {isVariationOpen && (
                <div className="absolute dark:bg-black  z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                  <div className="py-1">
                    {filteredVariations.length > 0 ? (
                      filteredVariations.map(variation => (
                        <div
                          key={variation.id}
                          className={`px-4 py-2 cursor-pointer dark:hover:bg-black flex items-center ${
                            selectedVariations.includes(variation.id)
                              ? "bg-gray-100"
                              : ""
                          }`}
                          onClick={() => handleVariationToggle(variation.id)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedVariations.includes(variation.id)}
                            readOnly
                            className="mr-2 h-4 w-4 text-[#EE5A2C] focus:ring-[#EE5A2C] border-gray-300 rounded"
                          />
                          <span className={selectedVariations.includes(variation.id) ? "text-[#EE5A2C]" : ""}>
                            {variation.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        {variationSearchTerm
                          ? translate("কোন বৈচিত্র্য পাওয়া যায়নি", "No variations found")
                          : translate("কোন বৈচিত্র্য পাওয়া যায়নি", "No variations available")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {error && error.includes(translate("বৈচিত্র্য", "variation")) && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>
          

          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
                className="h-4 w-4 text-[#EE5A2C] focus:ring-[#EE5A2C] border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                {translate("প্রয়োজনীয়", "Required")}
              </span>
            </label>
            <p className="text-xs text-gray-500">
              {translate(
                "এই ক্যাটাগরির পণ্যগুলির জন্য এই বৈচিত্র্যগুলো প্রয়োজনীয় কিনা তা চিহ্নিত করুন",
                "Mark if these variations are required for products in this category"
              )}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50"
          >
            {translate("বাতিল", "Cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#EE5A2C] hover:bg-[#d94a1f] text-white"
            disabled={!categoryId || selectedVariations.length === 0 || loading}
          >
            {loading && <ButtonLoader />}
            {initialData 
              ? translate("আপডেট করুন", "Update") 
              : translate("যোগ করুন", "Add")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCategoryWiseVariation;