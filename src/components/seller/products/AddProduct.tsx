"use client";

import { ChevronDown, MessageSquare, Plus,  X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Variation from "./Variation";
import ProductImageUploader from "./ProductImageUploader";
import { Controller, useForm } from "react-hook-form";
import TipTapEditor from "../../dashboard/tiptap/TipTapEditor";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
  import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getUserInfoFromToken = () => {
  const token = Cookies.get('__t_beta__token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // console.log('Decoded user info:', decoded);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const AddProducts = () => {
    const [shopCategory, setShopCategory] = useState("Grocery");
    const [subCategory, setSubCategory] = useState("Rice & Grains");
    const [productTitle, setProductTitle] = useState("Premium Basmati Rice");
    const [seoDescription, setSeoDescription] = useState(
        "This item 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum."
    );
    // const { handleSubmit, setValue, watch, control } = useForm();
    const { control } = useForm();

    // const user = useSelector(selectUser); 

    const user = getUserInfoFromToken();
    console.log(user);


    return (
        <div className="relative bg-white p-6 border rounded-md shadow-sm mt-[15px] ">
            {/* Floating Chat Button */}
            <button className="absolute top-4 right-4 bg-[#F4552F] hover:bg-[#e34724] p-2 rounded-md text-white">
                <MessageSquare size={18} />
            </button>

            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Add products via Category
            </h2>

            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {/* Shop Category */}
                <SelectField
                    label="Shop Category"
                    required
                    value={shopCategory}
                    onChange={setShopCategory}
                    options={["Grocery", "Electronics", "Clothing"]}
                />

                {/* Sub Category */}
                <SelectField
                    label="Sub Category"
                    required
                    value={subCategory}
                    onChange={setSubCategory}
                    options={["Rice & Grains", "Snacks", "Beverages"]}
                />

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 mt-6">
                    <button className="bg-[#F4552F] hover:bg-[#e34724] text-white text-sm font-medium px-4 py-2 rounded-md">
                        Publish Product
                    </button>
                    <button className="border border-gray-300 p-2 rounded-md hover:bg-gray-50">
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
                    <input
                        type="text"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700"
                    />
                </div>

                {/* Selects */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <SelectField label="Select Type" required options={["Published", "Draft"]} />
                    <SelectField label="Select Category" required options={["Select"]} />
                    <SelectField label="Select Subcategory" required options={["Select"]} />
                    <SelectField label="Select Brand" required options={["ACI", "Bashundhara"]} />
                    <MultiSelectField
                        label="Select Tag Name"
                        required
                        options={["Organic", "Best Seller", "Discounted"]}
                    />
                    <SelectField label="SEO Title" required options={["Select"]} />
                    <SelectField label="Select Gift Products" required options={["Select"]} />
                </div>

                {/* SEO Description */}
                <div>
                    <label className="text-sm font-semibold text-gray-800 mb-1 block">
                        SEO Description
                    </label>
                    <div className="relative">
                        <textarea
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            className="w-full min-h-[100px] border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 resize-y"
                        />
                    </div>
                </div>
            </div>


            {/* Variant Details Section */}
            <Variation></Variation>

            <div className="mt-6">
                <ProductImageUploader></ProductImageUploader>
            </div>


            {/* Product Description */}
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
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TipTapEditor content={field.value} onUpdate={field.onChange} />
                        )}
                    />
                </div>

            </div>



            <div className="flex gap-4 my-6 justify-end items-center">
                <button className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold">
                    Hold
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#F05323] text-white font-semibold">
                    Publish Product
                </button>
            </div>

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
}: {
    label: string;
    required?: boolean;
    value?: string;
    onChange?: (val: string) => void;
    options: string[];
}) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 appearance-none focus:ring-2 focus:ring-orange-100"
                >
                    {options.map((opt) => (
                        <option key={opt}>{opt}</option>
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

const MultiSelectField = ({
    label,
    required,
    options,
}: {
    label: string;
    required?: boolean;
    options: string[];
}) => {
    const [selected, setSelected] = useState<string[]>([]);
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

    const toggleOption = (opt: string) => {
        setSelected((prev) =>
            prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
        );
    };

    const removeTag = (tag: string) => {
        setSelected(selected.filter((t) => t !== tag));
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
                        className={`ml-auto text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${selected.includes(opt) ? "bg-orange-50 text-orange-600" : ""}`}
                                    onClick={() => toggleOption(opt)}
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