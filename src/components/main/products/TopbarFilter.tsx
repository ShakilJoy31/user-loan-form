"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface TopbarFilterProps {
    toggleSidebar: () => void;
    showSidebar: boolean;
    onSortChange: (sortOrder: "desc" | "asc" | undefined) => void;
}

export default function TopbarFilter({ toggleSidebar, showSidebar, onSortChange }: TopbarFilterProps) {
    const { translate } = useCustomTranslator();
    const [view, ] = useState("gid");
    const [sort, setSort] = useState(translate("ফিচার্ড", "Featured"));

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
        
        // Map the display text to the expected sortOrder values
        let sortOrder: "desc" | "asc" | undefined;
        switch (selectedSort) {
            case translate("নতুন", "Newest"):
                sortOrder = undefined; // or whatever makes sense for newest
                break;
            case translate("দাম: কম থেকে বেশি", "Price: Low to High"):
                sortOrder = "asc";
                break;
            case translate("দাম: বেশি থেকে কম", "Price: High to Low"):
                sortOrder = "desc";
                break;
            default:
                sortOrder = undefined; // for "Featured"
        }
        
        onSortChange(sortOrder);
    };

    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between border border-gray-300 rounded px-4 py-2 bg-gray-50 text-sm gap-3 sm:gap-0">
            {/* View toggle + message + filter toggle */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="flex space-x-1">
                    <Button variant={'outline'} onClick={toggleSidebar}
                        className={`p-1.5 border border-gray-300 bg-[#EE5A2C] hover:cursor-pointer rounded ${
                            showSidebar ? "bg-[#EE5A2C] hover:cursor-pointer text-white" : "bg-white text-gray-600"
                        }`}
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                    </Button>

                    <Button variant={'outline'}
                        className={`p-1.5 rounded border border-gray-300 ${
                            view === "list" ? "bg-[#EE5A2C] text-white" : "bg-white text-gray-600"
                        }`}
                    >
                        <ListBulletIcon className="w-5 h-5" />
                    </Button>
                </div>
                <span className="text-gray-700">
                    {translate("আমরা আপনার জন্য ২৯টি আইটেম পেয়েছি!", "We found 29 items for you!")}
                </span>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-normal">
                <label className="text-gray-700 whitespace-nowrap">
                    {translate("সাজান:", "Sort By:")}
                </label>
                <div className="relative">
                    <select
                        value={sort}
                        onChange={handleSortChange}
                        className="appearance-none border border-gray-300 rounded px-4 py-1.5 pr-8 bg-white text-gray-700 text-sm focus:outline-none w-full sm:w-auto"
                    >
                        <option>{translate("ফিচার্ড", "Featured")}</option>
                        <option>{translate("নতুন", "Newest")}</option>
                        <option>{translate("দাম: কম থেকে বেশি", "Price: Low to High")}</option>
                        <option>{translate("দাম: বেশি থেকে কম", "Price: High to Low")}</option>
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute top-2.5 right-2 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}