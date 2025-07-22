"use client";

import { ChevronDown, MessageSquare, Plus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VariationComponent from "./Variation";
import ProductImageUploader from "./ProductImageUploader";
import { Controller, useForm } from "react-hook-form";
import TipTapEditor from "../../dashboard/tiptap/TipTapEditor";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { useGetSellerUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";
import DataLoader from "@/components/common/DataLoader";
import {
  useCreateProductMutation,
  useGetBrandsQuery,
} from "@/redux/features/seller-api/productApi";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import {
  Brand,
  Category,
  ProductFormData,
  SubCategory,
  UserShopCategory,
  Variation,
} from "@/types/seller/addProduct";

const AddProducts = () => {
  const user = useSelector(selectUser);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  // Load user on initial render if not already loaded
  useEffect(() => {
    if (!user.id) {
      loadUserFromToken(dispatch).then(() => {
        setIsUserLoaded(true);
      });
    } else {
      setIsUserLoaded(true);
    }
  }, [dispatch, user.id]);

  const { data: sellerUser, isLoading: sellerUserLoading } =
    useGetSellerUserByIdQuery(
      user?.id,
      { skip: !user.id || !isUserLoaded } // Skip if no user ID or user not loaded
    );
  console.log(sellerUser);
  const [createProduct, { isLoading: productUploadLoading }] =
    useCreateProductMutation();
  const { data: brandData, isLoading: brandLoading } =
    useGetBrandsQuery(undefined);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("Published");
  const [hasInitializedVariations, setHasInitializedVariations] =
    useState(false);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [variationCombinations, setVariationCombinations] = useState<
    Array<{
      sku: string;
      optionValues: string[];
      price: number;
      stock: number;
    }>
  >([]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      categoryId: null,
      subCategoryId: null,
      brandId: null,
      images: [],
      tags: [],
      variations: [],
      items: [],
      description: "",
      longDescription: "",
      seoDescription: "",
      type: "Published",
      seoTitle: "",
    },
  });

  // Get categories and subcategories from seller data
  const categories: Category[] = useMemo(
    () =>
      sellerUser?.data?.UserShopCategory?.map(
        (item: UserShopCategory) => item.category
      ) || [],
    [sellerUser?.data?.UserShopCategory]
  );

  const subCategories: SubCategory[] = selectedCategory
    ? categories.find((cat: Category) => cat.id === selectedCategory)
        ?.ProductSubCategory || []
    : [];

  // Get brands from API response
  const brands: Brand[] = brandData?.data || [];

  // Get all variations from all categories
  const allVariations = useMemo(() => {
    return categories.flatMap((category) =>
      category.CategoryWishVariations.map((item) => item.variation)
    );
  }, [categories]);

  // Generate all possible combinations of variations
  const generateVariationCombinations = (variations: Variation[]) => {
    if (variations.length === 0) return [];

    // Convert variations to the format needed for combination generation
    const variationOptions = variations.map((v) => ({
      name: v.name,
      options: v.VariationValue.map((opt) => opt.name),
    }));

    // Generate all combinations
    const combinations: { optionValues: string[] }[] = [];
    const generate = (current: string[], index: number) => {
      if (index === variationOptions.length) {
        combinations.push({ optionValues: [...current] });
        return;
      }
      for (const option of variationOptions[index].options) {
        current.push(option);
        generate(current, index + 1);
        current.pop();
      }
    };
    generate([], 0);

    // Create SKUs and default values
    return combinations.map((comb) => ({
      sku: comb.optionValues.join("-").toLowerCase(),
      optionValues: comb.optionValues,
      price: 0,
      stock: 0,
    }));
  };

  useEffect(() => {
    if (allVariations.length > 0 && !hasInitializedVariations) {
      const combinations = generateVariationCombinations(allVariations);
      setVariationCombinations(combinations);
      setValue(
        "variations",
        allVariations.map((v) => ({
          name: v.name,
          options: v.VariationValue.map((opt) => opt.name),
        }))
      );
      setValue("items", combinations);
      setHasInitializedVariations(true);
    }
  }, [allVariations, hasInitializedVariations, setValue]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImagesUpdate = useCallback((urls: string[]) => {
    setImageUrls(urls);
    setImagesUploaded(urls.length > 0);
  }, []);

  // Handle form submission
  const onSubmit = async (data: ProductFormData) => {
    if (!imagesUploaded) {
      toast.error("Please upload product images first");
      return;
    }

    const payload = {
      name: data.name,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      brandId: selectedBrand,
      images: imageUrls,
      tags: selectedTags,
      variations: allVariations.map((v) => ({
        name: v.name,
        options: v.VariationValue.map((opt) => opt.name),
      })),
      items: variationCombinations.map((item) => ({
        sku: item.sku,
        price: item.price,
        stock: item.stock,
        optionValues: item.optionValues,
      })),
      description: data.description,
      longDescription: data.longDescription,
      seoDescription: data.seoDescription,
      type: selectedType,
      seoTitle: data.seoTitle,
    };
    const result = await createProduct(payload);
    if (result?.data?.success) {
      toast(result?.data?.message);
    }
  };
  if (!isUserLoaded || sellerUserLoading) {
    return (
      <div className="flex justify-center">
        <DataLoader />
      </div>
    );
  }

  if (!user.id) {
    return (
      <div className="flex justify-center">
        Please login to access this page
      </div>
    );
  }

  if (!sellerUser?.data?.active) {
    if (sellerUserLoading) {
      return (
        <div className="flex justify-center">{<DataLoader></DataLoader>}</div>
      );
    } else {
      return (
        <div className="flex justify-center">
          This seller is not active yet.
        </div>
      );
    }
  }

  return (
    <div className="relative bg-white p-6 border rounded-md shadow-sm mt-[15px]">
      {/* Floating Chat Button */}
      <button className="absolute top-4 right-4 bg-[#F4552F] hover:bg-[#e34724] p-2 rounded-md text-white">
        <MessageSquare size={18} />
      </button>

      {/* Header */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Row */}
        <div className="flex justify-between items-center my-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Add products via Category
          </h2>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="submit"
              className="bg-[#F4552F] hover:bg-[#e34724] text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Publish Product
            </button>
            <button
              type="button"
              className="border border-gray-300 p-2 rounded-md hover:bg-gray-50"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Basic Details Section */}
        <div className="border rounded-md p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-4">
            Basic Details
          </h3>

          {/* Product Title */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Product Title <span className="text-red-500">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product title is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Selects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <SelectField
              label="Select Type"
              required
              options={["Published", "Draft"]}
              value={selectedType}
              onChange={(val) => setSelectedType(val)}
            />

            <SelectField
              label="Select Category"
              required
              options={categories.map((cat: Category) => cat.name)}
              value={
                categories.find((cat: Category) => cat.id === selectedCategory)
                  ?.name || ""
              }
              onChange={(val) => {
                const cat = categories.find((c: Category) => c.name === val);
                setSelectedCategory(cat?.id || null);
                setSelectedSubCategory(null);
              }}
            />

            <SelectField
              label="Select Subcategory"
              required
              options={subCategories.map((sub: SubCategory) => sub.name)}
              value={
                subCategories.find(
                  (sub: SubCategory) => sub.id === selectedSubCategory
                )?.name || ""
              }
              onChange={(val) => {
                const sub = subCategories.find(
                  (s: SubCategory) => s.name === val
                );
                setSelectedSubCategory(sub?.id || null);
              }}
              disabled={!selectedCategory}
            />

            <SelectField
              label="Select Brand"
              required
              options={brands.map((brand: Brand) => brand.brand)}
              value={selectedBrandName}
              onChange={(val) => {
                const brand = brands.find((b: Brand) => b.brand === val);
                setSelectedBrandName(val);
                setSelectedBrand(brand?.id || null);
              }}
              disabled={brandLoading}
            />

            <MultiSelectField
              label="Select Tag Name"
              required
              options={["Organic", "Best Seller", "Discounted"]}
              selected={selectedTags}
              onChange={setSelectedTags}
            />

            <SelectField
              label="SEO Title"
              required
              options={["Select"]}
              value={watch("seoTitle") || ""}
              onChange={(val) => setValue("seoTitle", val)}
            />
          </div>

          {/* SEO Description */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              SEO Description
            </label>
            <Controller
              name="seoDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full min-h-[100px] border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 resize-y"
                />
              )}
            />
          </div>
        </div>

        {/* Variation Section */}
        <VariationComponent
          variations={allVariations}
          variationCombinations={variationCombinations}
          onCombinationChange={(updatedCombinations) => {
            setVariationCombinations(updatedCombinations);
            setValue("items", updatedCombinations);
          }}
        />

        {/* Image Uploader Section */}
        <div className="mt-6">
          <ProductImageUploader
            onImagesUpdate={handleImagesUpdate}
            initialImages={[]}
          />
        </div>

        {/* Product Description */}
        <div className="border rounded-xl p-[24px] mt-6">
          <div className="mt-10">
            <label className="mb-3 text-[16px] block">
              Product Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TipTapEditor content={field.value} onUpdate={field.onChange} />
              )}
            />
          </div>

          <div className="mt-10">
            <label className="mb-3 text-[16px] block">Long Description</label>
            <Controller
              name="longDescription"
              control={control}
              render={({ field }) => (
                <TipTapEditor content={field.value} onUpdate={field.onChange} />
              )}
            />
          </div>
        </div>

        <div className="flex gap-4 my-6 justify-end items-center">
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold"
          >
            Hold
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#F05323] text-white font-semibold"
          >
            {productUploadLoading ? (
              <ButtonLoader></ButtonLoader>
            ) : (
              "Publish Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Select Field Component
const SelectField = ({
  label,
  required,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 appearance-none focus:ring-2 focus:ring-orange-100 ${
            disabled ? "bg-gray-100" : ""
          }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
};

interface MultiSelectFieldProps {
  label: string;
  required?: boolean;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  required,
  options,
  selected,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (opt: string) => {
    const newSelected = selected.includes(opt)
      ? selected.filter((o) => o !== opt)
      : [...selected, opt];
    onChange(newSelected);
  };

  const removeTag = (tag: string) => {
    onChange(selected.filter((t) => t !== tag));
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selected.length > 0 ? (
            selected.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs"
              >
                {tag}
                <X
                  size={14}
                  className="cursor-pointer hover:text-orange-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-400">Select tags...</span>
          )}
          <ChevronDown
            size={16}
            className={`ml-auto text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search tags..."
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                    selected.includes(opt) ? "bg-orange-50 text-orange-600" : ""
                  }`}
                  onClick={() => toggleOption(opt)}
                >
                  {opt}
                  {selected.includes(opt) && (
                    <span className="float-right">✓</span>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
