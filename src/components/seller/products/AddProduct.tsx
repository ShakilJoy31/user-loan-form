"use client";

import { ChevronDown, MessageSquare, Plus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VariationComponent from "./Variation";
import ProductImageUploader from "./ProductImageUploader";
import { Controller, useForm } from "react-hook-form";
import TipTapEditor from "../../dashboard/tiptap/TipTapEditor";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { useGetUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";
import DataLoader from "@/components/common/DataLoader";
import { useCreateProductMutation, useGetBrandsQuery } from "@/redux/features/seller-api/productApi";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { Brand, Category, ProductFormData, SubCategory, UserShopCategory, Variation } from "@/types/seller/productInterface";

const AddProducts = () => {
    const user = useSelector(selectUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.id) {
            loadUserFromToken(dispatch).then(() => {
                setIsUserLoaded(true);
            });
        } else {
            setIsUserLoaded(true);
        }
    }, [dispatch, user.id]);

    const { data: sellerUser, isLoading: sellerUserLoading } = useGetUserByIdQuery(
        user?.id,
        { skip: !user.id || !isUserLoaded }
    );

    const [createProduct, { isLoading: productUploadLoading }] = useCreateProductMutation();
    const { data: brandData, isLoading: brandLoading } = useGetBrandsQuery(undefined);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedBrandName, setSelectedBrandName] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState("Published");
    const [customValues, setCustomValues] = useState<Record<number, string[]>>({});
    const [selectedValues, setSelectedValues] = useState<Record<number, Array<{ id: number, name: string }>>>({});
    const [variationCombinations, setVariationCombinations] = useState<
        Array<{
            sku: string;
            optionValues: string[];
            price: number;
            stock: number;
            discount?: number;
        }>
    >([]);

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors }
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
            isTop: undefined,
            isNew: undefined
        }
    });

    const categories: Category[] = useMemo(() => {
        return sellerUser?.data?.UserShopCategory?.map((item: UserShopCategory) => item.category) || [];
    }, [sellerUser?.data?.UserShopCategory]);

    const subCategories: SubCategory[] = useMemo(() => {
        if (!selectedCategory) return [];
        const category = categories.find((cat: Category) => cat.id === selectedCategory);
        return category?.ProductSubCategory || [];
    }, [selectedCategory, categories]);

    const categoryVariations = useMemo(() => {
        if (!selectedCategory) return [];
        const category = categories.find((cat: Category) => cat.id === selectedCategory);
        return category?.CategoryWishVariations?.map(item => item.variation) || [];
    }, [selectedCategory, categories]);

    const brands: Brand[] = brandData?.data || [];

    const generateVariationCombinations = useCallback((variations: Variation[]) => {
        if (variations.length === 0) return [];

        const variationOptions = variations.map(v => ({
            name: v.name,
            options: [
                ...(selectedValues[v.id]?.map(opt => opt.name)) || [],
                ...(customValues[v.id] || [])
            ]
        }));

        const validVariations = variationOptions.filter(v => v.options.length > 0);
        if (validVariations.length === 0) return [];

        const combinations: { optionValues: string[] }[] = [];
        const generate = (current: string[], index: number) => {
            if (index === validVariations.length) {
                combinations.push({ optionValues: [...current] });
                return;
            }
            for (const option of validVariations[index].options) {
                current.push(option);
                generate(current, index + 1);
                current.pop();
            }
        };
        generate([], 0);

        return combinations.map(comb => ({
            sku: comb.optionValues.join('-').toLowerCase(),
            optionValues: comb.optionValues,
            price: 0,
            stock: 0
        }));
    }, [selectedValues, customValues]);

    useEffect(() => {
        if (categoryVariations.length > 0) {
            const combinations = generateVariationCombinations(categoryVariations);
            setVariationCombinations(combinations);
            setValue('items', combinations);
        }
    }, [categoryVariations, generateVariationCombinations, setValue]);

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleImagesUpdate = useCallback((urls: string[]) => {
        setImageUrls(urls);
    }, []);

    const handleCombinationChange = useCallback((index: number, field: 'price' | 'stock' | 'discount', value: string) => {
        const numericValue = value === '' ? undefined : Number(value.replace(/^0+/, ''));
        setVariationCombinations(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: numericValue
            };
            setValue('items', updated);
            return updated;
        });
    }, [setValue]);

    const handleDeleteRow = useCallback((index: number) => {
        setVariationCombinations(prev => {
            const updated = [...prev];
            updated.splice(index, 1);
            setValue('items', updated);
            return updated;
        });
    }, [setValue]);

    const handleValueSelect = useCallback((variationId: number, valueId: number, valueName: string) => {
        setSelectedValues(prev => {
            const currentValues = prev[variationId] || [];
            const isSelected = currentValues.some(v => v.id === valueId);
            const newValues = {
                ...prev,
                [variationId]: isSelected
                    ? currentValues.filter(v => v.id !== valueId)
                    : [...currentValues, { id: valueId, name: valueName }]
            };
            return newValues;
        });
    }, []);

    const handleAddCustomValue = useCallback((variationId: number, value: string) => {
        setCustomValues(prev => ({
            ...prev,
            [variationId]: [...(prev[variationId] || []), value]
        }));
    }, []);

    const removeValue = useCallback((variationId: number, value: { id: number, name: string }) => {
        if (value.id === -1) {
            setCustomValues(prev => ({
                ...prev,
                [variationId]: (prev[variationId] || []).filter(name => name !== value.name)
            }));
        } else {
            setSelectedValues(prev => ({
                ...prev,
                [variationId]: (prev[variationId] || []).filter(v => v.id !== value.id)
            }));
        }
    }, []);

    const clearSelection = useCallback((variationId: number) => {
        setSelectedValues(prev => ({ ...prev, [variationId]: [] }));
        setCustomValues(prev => ({ ...prev, [variationId]: [] }));
    }, []);

    const onSubmit = async (data: ProductFormData) => {
        if (imageUrls?.length < 1) {
            toast.error("Please upload product images first");
            return;
        }

        const payloadVariations = categoryVariations.map(v => {
            const selectedPredefined = selectedValues[v.id]?.map(opt => opt.name) || [];
            const customOptions = customValues[v.id] || [];
            return {
                name: v.name,
                options: [...selectedPredefined, ...customOptions]
            };
        });

        if (!selectedCategory || !selectedSubCategory || !selectedBrand || payloadVariations?.length < 1) {
            toast.error("Please fill out the input fields!");
            return;
        }

        const payload = {
            name: data.name,
            categoryId: selectedCategory,
            subCategoryId: selectedSubCategory,
            brandId: selectedBrand,
            images: imageUrls,
            tags: selectedTags,
            variations: payloadVariations,
            items: variationCombinations.map(item => ({
                sku: item.sku,
                price: item.price,
                stock: item.stock,
                optionValues: item.optionValues,
                ...(item.discount !== undefined && { discountPrice: item.discount }),
            })),
            description: data.description,
            longDescription: data.longDescription,
            seoDescription: data.seoDescription,
            type: selectedType,
            seoTitle: data.seoTitle,
            ...(data.isTop !== undefined && { isTop: data.isTop }),
            ...(data.isNew !== undefined && { isNew: data.isNew })
        };

        const result = await createProduct(payload);
        if (result?.data?.success) {
            toast.success(result?.data?.message);
        }
    };

    if (!isUserLoaded || sellerUserLoading) {
        return <div className="flex justify-center"><DataLoader /></div>;
    }

    if (!user.id) {
        return <div className="flex justify-center">Please login to access this page</div>;
    }

    if (!sellerUser?.data?.active) {
        if (sellerUserLoading) {
            return <div className="flex justify-center">{<DataLoader></DataLoader>}</div>
        } else {
            return <div className="flex justify-center">This seller is not active yet.</div>
        }
    }

    return (
        <div className="relative bg-white p-6 border rounded-md shadow-sm mt-[15px]">
            <button className="absolute top-4 right-4 bg-[#F4552F] hover:bg-[#e34724] p-2 rounded-md text-white">
                <MessageSquare size={18} />
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center my-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add products via Category
                    </h2>

                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            type="submit"
                            className="bg-[#F4552F] hover:bg-[#e34724] text-white text-sm font-medium px-4 py-2 rounded-md hover:cursor-pointer"
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

                <div className="border rounded-md p-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-4">
                        Basic Details
                    </h3>

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
                            value={categories.find((cat: Category) => cat.id === selectedCategory)?.name || ""}
                            onChange={(val) => {
                                const cat = categories.find((c: Category) => c.name === val);
                                setSelectedCategory(cat?.id || null);
                                setSelectedSubCategory(null);
                                setSelectedValues({});
                                setCustomValues({});
                                setVariationCombinations([]);
                            }}
                        />

                        <SelectField
                            label="Select Subcategory"
                            required
                            options={subCategories.map((sub: SubCategory) => sub.name)}
                            value={subCategories.find((sub: SubCategory) => sub.id === selectedSubCategory)?.name || ""}
                            onChange={(val) => {
                                const sub = subCategories.find((s: SubCategory) => s.name === val);
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

                    <div className="flex gap-4 my-4">
                        <div className="flex items-center">
                            <Controller
                                name="isTop"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        id="isTop"
                                        checked={field.value || false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 text-[#EE5A2C] border-gray-300 rounded hover:cursor-pointer"
                                    />
                                )}
                            />
                            <label htmlFor="isTop" className="ml-2 block text-sm text-gray-700 hover:cursor-pointer">
                                Top Product
                            </label>
                        </div>

                        <div className="flex items-center">
                            <Controller
                                name="isNew"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        id="isNew"
                                        checked={field.value || false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 text-[#EE5A2C] border-gray-300 rounded hover:cursor-pointer"
                                    />
                                )}
                            />
                            <label htmlFor="isNew" className="ml-2 block text-sm text-gray-700 hover:cursor-pointer">
                                New Product
                            </label>
                        </div>
                    </div>
                </div>

                {selectedCategory && (
                    <VariationComponent
                        variations={categoryVariations}
                        variationCombinations={variationCombinations}
                        onCombinationChange={handleCombinationChange}
                        onDeleteRow={handleDeleteRow}
                        customValues={customValues}
                        onCustomValuesChange={handleAddCustomValue}
                        selectedValues={selectedValues}
                        onValueSelect={handleValueSelect}
                        onRemoveValue={removeValue}
                        onClearSelection={clearSelection}
                    />
                )}

                <div className="mt-6">
                    <ProductImageUploader
                        onImagesUpdate={handleImagesUpdate}
                        initialImages={[]}
                    />
                </div>

                <div className="border rounded-xl p-[24px] mt-6">
                    <div className="mt-10">
                        <label className="mb-3 text-[16px] block">Product Description</label>
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
                        className="px-6 py-2 rounded-md bg-[#F05323] text-white font-semibold hover:cursor-pointer"
                    >
                        {productUploadLoading ? <ButtonLoader /> : 'Publish Product'}
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
                    className={`w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 appearance-none focus:ring-2 focus:ring-orange-100 ${disabled ? "bg-gray-100" : ""}`}
                >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOption = (opt: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newSelected = selected.includes(opt)
            ? selected.filter((o) => o !== opt)
            : [...selected, opt];
        onChange(newSelected);
    };

    const removeTag = (tag: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(selected.filter((t) => t !== tag));
    };

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col relative h-full" ref={dropdownRef}>
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div
                className={`w-full border border-gray-300 ${isOpen ? 'rounded-tl-md rounded-tr-md' : 'rounded-md'} px-3 py-2 text-sm text-gray-700 cursor-pointer`}
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
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
                                    onClick={(e) => removeTag(tag, e)}
                                />
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400">Select tags...</span>
                    )}
                    <ChevronDown
                        size={16}
                        className={`ml-auto text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-20 bg-white border border-gray-300 rounded-br-md rounded-bl-md shadow-lg">
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder="Search tags..."
                            className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt}
                                    className={`px-3 py-2 text-sm cursor-pointer ${selected.includes(opt) ? "bg-orange-50 text-orange-600" : ""}`}
                                    onClick={(e) => toggleOption(opt, e)}
                                >
                                    {opt}
                                    {selected.includes(opt) && (
                                        <span className="float-right">✓</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


export default AddProducts;