"use client";

import { ChevronDown, MessageSquare, Plus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductImageUploader from "./ProductImageUploader";
import { Controller, useForm } from "react-hook-form";
import TipTapEditor from "../../dashboard/tiptap/TipTapEditor";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { useGetUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";
import DataLoader from "@/components/common/DataLoader";
import { useGetBrandsQuery, useEditProductByIdMutation, useGetProductByIdForEditQuery } from "@/redux/features/seller-api/productApi";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { Brand, Category, ProductFormData, ProductImage, ProductVariationType, SubCategory, UserShopCategory, Variation, VariationValue } from "@/types/seller/productInterface";
import { usePathname } from "next/navigation";
import VariationComponent from "./EditVariationComponent";
import { ApiError } from "@/types/apiError";

interface ProductItem {
    id: number;
    sku: string;
    price: number;
    purchasePoint: number;
    discountPrice: number;
    stock: number;
    options: {
        option: string;
    }[];
}
interface ITags {
    id: number,
    productId: number,
    tag: string,
}

interface ProductData {
    id: number;
    productName: string;
    productLink: string;
    type: string;
    categoryId: number;
    subCategoryId: number;
    brandId: number;
    sellerId: number;
    Tags: ITags[],
    rating: number;
    seoTitle: string | null;
    seoDescription: string | null;
    sortDescription: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    ProductImage: ProductImage[];
    VariationType: ProductVariationType[];
    ProductItem: ProductItem[];
    brand: {
        brand: string;
    };
}



const EditProducts = () => {
    const user = useSelector(selectUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const productId = pathname?.split('/')?.pop();

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

    const { data: productData, isLoading: productLoading } = useGetProductByIdForEditQuery(productId || '', {
        skip: !productId
    });

    const [editProductById, { isLoading: productUpdateLoading }] = useEditProductByIdMutation();
    const { data: brandData, isLoading: brandLoading } = useGetBrandsQuery(undefined);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedBrandName, setSelectedBrandName] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState("Published");
    const [hasInitializedVariations, setHasInitializedVariations] = useState(false);
    const [customValues, setCustomValues] = useState<Record<number, string[]>>({});
    const [selectedValues, setSelectedValues] = useState<Record<number, Array<{ id: number, name: string }>>>({});
    const [variationCombinations, setVariationCombinations] = useState<
        Array<{
            sku: string;
            optionValues: string[];
            price: number;
            stock: number;
            discountPrice?: number;
            purchasePoint?: number;
            id?: number;
        }>
    >([]);

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
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
            isTop: productData?.data?.isTop || false,
            isNew: productData?.data?.isNew || false,
            type: "Published",
            seoTitle: ""
        }
    });

    const categories: Category[] = useMemo(() => {
        return sellerUser?.data?.UserShopCategory?.map((item: UserShopCategory) => item.category) || [];
    }, [sellerUser?.data?.UserShopCategory]);

    const subCategories: SubCategory[] = selectedCategory
        ? categories.find((cat: Category) => cat.id === selectedCategory)?.ProductSubCategory || []
        : [];

    const brands: Brand[] = brandData?.data || [];

    const allVariations = useMemo(() => {
        return categories.flatMap((category: Category) =>
            category.CategoryWishVariations.map((item) => item.variation)
        );
    }, [categories]);

    const generateVariationCombinations = useCallback((variations: Variation[]) => {
        if (variations.length === 0) return [];

        const variationOptions = variations.map((v: Variation) => ({
            name: v.name,
            options: v.VariationValue.map((opt: VariationValue) => opt.name)
        }));

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

        return combinations.map(comb => ({
            sku: comb.optionValues.join('-').toLowerCase(),
            optionValues: comb.optionValues,
            price: 0,
            stock: 0
        }));
    }, []);

    useEffect(() => {
        if (!hasInitializedVariations && allVariations.length > 0) {
            const combinations = generateVariationCombinations(allVariations);
            setVariationCombinations(combinations);
            setValue('variations', allVariations.map(v => ({
                name: v.name,
                options: v.VariationValue.map(opt => opt.name)
            })));
            setValue('items', combinations);
            setHasInitializedVariations(true);
        }
    }, [hasInitializedVariations, allVariations, generateVariationCombinations, setValue]);

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        if (productData?.data?.ProductImage) {
            setImageUrls((productData.data as ProductData).ProductImage.map((img: ProductImage) => img.imageUrl));
        }
    }, [productData]);
    const [productDescription, setProductDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');

    const initializeFormData = useCallback(() => {
        if (productData?.data && !productLoading) {
            const product = productData.data as ProductData;

            console.log(product);
            console.log(sellerUser)


            setProductDescription(product?.sortDescription || '')
            setLongDescription(product?.description || '')

            // Reset form with product data
            reset({
                name: product.productName,
                categoryId: product.categoryId,
                subCategoryId: product.subCategoryId,
                brandId: product.brandId,
                images: product.ProductImage.map((img: ProductImage) => img.imageUrl),
                tags: [],
                description: product.sortDescription || "",
                longDescription: product.description || "",
                seoDescription: product.seoDescription || "",
                seoTitle: product.seoTitle || "",
                isTop: productData.data.isTop,
                isNew: productData.data.isNew,
                type: product.type
            });

            // Set state values
            setSelectedCategory(product.categoryId);
            setSelectedSubCategory(product.subCategoryId);
            setSelectedBrand(product.brandId);
            setSelectedBrandName(product.brand?.brand || "");
            setSelectedType(product.type);
            setSelectedTags(product.Tags.map((tag: ITags) => tag.tag));
            setImageUrls(product.ProductImage.map((img: ProductImage) => img.imageUrl));

            // Transform variations data
            const variations = product.VariationType.map((v: ProductVariationType) => ({
                id: v.id,
                name: v.name,
                VariationValue: v.options.map((o) => ({
                    id: o.id,
                    name: o.value,
                    variationId: v.id
                }))
            }));

            // Transform product items
            const combinations = product.ProductItem.map((item: ProductItem) => ({
                id: item.id,
                sku: item.sku,
                optionValues: item.options.map((opt) => opt.option),
                price: item.price,
                stock: item.stock,
                discountPrice: item.discountPrice,
                purchasePoint: item.purchasePoint
            }));

            // Initialize selected values for variations
            const selectedVals: Record<number, Array<{ id: number, name: string }>> = {};
            variations.forEach(variation => {
                const selectedOptions = new Set<string>();
                combinations.forEach(comb => {
                    comb.optionValues.forEach(val => {
                        if (variation.VariationValue.some(v => v.name === val)) {
                            selectedOptions.add(val);
                        }
                    });
                });

                selectedVals[variation.id] = variation.VariationValue
                    .filter(v => selectedOptions.has(v.name))
                    .map(v => ({ id: v.id, name: v.name }));
            });

            // Initialize custom values
            const customVals: Record<number, string[]> = {};
            variations.forEach(variation => {
                const customOptions = new Set<string>();
                combinations.forEach(comb => {
                    comb.optionValues.forEach(val => {
                        if (!variation.VariationValue.some(v => v.name === val)) {
                            customOptions.add(val);
                        }
                    });
                });
                if (customOptions.size > 0) {
                    customVals[variation.id] = Array.from(customOptions);
                }
            });
            console.log(selectedVals)
            setCustomValues(customVals);
            setSelectedValues(selectedVals);
            setVariationCombinations(combinations);

            // Set the form values for variations and items
            setValue('variations', variations.map(v => ({
                name: v.name,
                options: v.VariationValue.map(opt => opt.name)
            })));
            setValue('items', combinations);
        }
    }, [productData, productLoading, reset, setValue]);

    useEffect(() => {
        initializeFormData();
    }, [initializeFormData]);

    const handleImagesUpdate = useCallback((urls: string[]) => {
        setImageUrls(urls);
    }, []);

    const handleCombinationChange = useCallback((updatedCombinations: typeof variationCombinations) => {
        setVariationCombinations(updatedCombinations);
        setValue('items', updatedCombinations);
    }, [setValue]);







    // New

    const regenerateCombinations = useCallback((selectedValues: Record<number, Array<{ id: number, name: string }>>) => {
        const variations = (productData.data as ProductData)?.VariationType?.map((v: ProductVariationType) => ({
            id: v.id,
            name: v.name,
            VariationValue: v.options.map((o) => ({
                id: o.id,
                name: o.value,
                variationId: v.id
            }))
        })) || [];

        const newCombinations: typeof variationCombinations = [];

        // Generate all possible combinations
        const generate = (current: string[], index: number) => {
            if (index === variations.length) {
                if (current.length > 0) {
                    // Find existing combination to preserve price/stock
                    const existing = variationCombinations.find(c =>
                        c.optionValues.length === current.length &&
                        c.optionValues.every((val, i) => val === current[i])
                    );

                    newCombinations.push({
                        sku: current.join('-').toLowerCase(),
                        optionValues: [...current],
                        price: existing?.price || 0,
                        stock: existing?.stock || 0,
                        discountPrice: existing?.discountPrice,
                        purchasePoint: existing?.purchasePoint,
                        id: existing?.id
                    });
                }
                return;
            }

            const currentVariation = variations[index];
            const valuesForVariation = selectedValues[currentVariation.id] || [];

            if (valuesForVariation.length === 0) {
                generate(current, index + 1);
            } else {
                valuesForVariation.forEach(value => {
                    generate([...current, value.name], index + 1);
                });
            }
        };

        generate([], 0);
        handleCombinationChange(newCombinations);
    }, [variationCombinations, handleCombinationChange, productData]);



    const onSubmit = async (data: ProductFormData) => {
        if (!imageUrls || imageUrls.length === 0) {
            toast.error("Please upload product images first");
            return;
        }

        if (!productId) {
            toast.error("Product ID is missing");
            return;
        }

        const currentVariations = (productData?.data as ProductData)?.VariationType || [];

        // Format variations for payload using selectedValues
        const payloadVariations = currentVariations.map((variation: ProductVariationType) => {
            // Get the selected values for this variation
            const selectedForVariation = selectedValues[variation.id] || [];

            // Extract just the option names
            const selectedOptionNames = selectedForVariation.map(v => v.name);

            return {
                name: variation.name,
                options: selectedOptionNames
            };
        });

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
                ...(item.discountPrice !== undefined && { discountPrice: item.discountPrice }),
            })),
            ...(data.isTop !== false && { isTop: data.isTop }),
            ...(data.isNew !== false && { isNew: data.isNew }),
            // description: longDescription, // Long Description from form
            // sortDescription: productDescription, // Product Description from form
        };

        try {
            const result = await editProductById({ id: productId, data: payload });
            if (result?.data?.success) {
                toast.success(result?.data?.message);
            } else {
                toast.error(result?.data?.message || "Failed to update product");
            }
        } catch (error) {
            const apiError = error as ApiError;
            toast.error(apiError?.data?.message || '');
        }
    };






    if (!isUserLoaded || sellerUserLoading || productLoading) {
        return <div className="flex justify-center"><DataLoader /></div>;
    }

    if (!user.id) {
        return <div className="flex justify-center">Please login to access this page</div>;
    }

    if (!sellerUser?.data?.active) {
        if (sellerUserLoading) {
            return <div className="flex justify-center"><DataLoader /></div>;
        } else {
            return <div className="flex justify-center">This seller is not active yet.</div>;
        }
    }

    if (!productData?.data) {
        return <div className="flex justify-center">Product not found</div>;
    }

    return (
        <div className="relative bg-white p-6 border rounded-md shadow-sm mt-[15px]">
            <button className="absolute top-4 right-4 bg-[#F4552F] hover:bg-[#e34724] p-2 rounded-md text-white">
                <MessageSquare size={18} />
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center my-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Edit Product
                    </h2>

                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            type="submit"
                            className="bg-[#F4552F] hover:bg-[#e34724] text-white text-sm font-medium px-4 py-2 rounded-md hover:cursor-pointer"
                        >
                            Update Product
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
                            options={["Select", "Best Product"]}
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

                <VariationComponent
                    variations={(productData.data as ProductData)?.VariationType?.map((v: ProductVariationType) => ({
                        id: v.id,
                        name: v.name,
                        VariationValue: v.options.map((o) => ({
                            id: o.id,
                            name: o.value,
                            variationId: v.id
                        }))
                    })) || []}
                    variationCombinations={variationCombinations}
                    onCombinationChange={handleCombinationChange}
                    customValues={customValues}
                    onCustomValuesChange={setCustomValues}
                    regenerateCombinations={regenerateCombinations}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    selectedCategory={selectedCategory}
                />

                <div className="mt-6">
                    <ProductImageUploader
                        onImagesUpdate={handleImagesUpdate}
                        initialImages={(productData.data as ProductData).ProductImage.map((img: ProductImage) => img.imageUrl)}
                    />
                </div>

                <div className="border rounded-xl p-[24px] mt-6">
                    <div className="mt-10">
                        <label className="mb-3 text-[16px] block">Product Description</label>
                        <Controller
                            name="longDescription"  // This is for Product Description
                            control={control}
                            render={({ field }) => (
                                <TipTapEditor
                                    content={productDescription}
                                    onUpdate={(content) => {
                                        field.onChange(content);  // Update react-hook-form's field value
                                        setProductDescription(content);  // Update local state
                                    }}

                                />
                            )}
                        />
                    </div>

                    <div className="mt-10">
                        <label className="mb-3 text-[16px] block">Long Description</label>
                        <Controller
                            name="description"  // This is for Long Description
                            control={control}
                            render={({ field }) => (
                                <TipTapEditor
                                    content={longDescription}
                                    onUpdate={(content) => {
                                        field.onChange(content);  // Update react-hook-form's field value
                                        setLongDescription(content);  // Update local state
                                    }}

                                />
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
                        {productUpdateLoading ? <ButtonLoader /> : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

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
            ? selected.filter((o: string) => o !== opt)
            : [...selected, opt];
        onChange(newSelected);
    };

    const removeTag = (tag: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(selected.filter((t: string) => t !== tag));
    };

    const filteredOptions = options.filter((opt: string) =>
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
                        selected.map((tag: string) => (
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
                            filteredOptions.map((opt: string) => (
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

export default EditProducts;