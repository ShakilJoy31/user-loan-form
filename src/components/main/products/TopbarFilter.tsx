"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";

interface TopbarFilterProps {
    toggleSidebar: () => void;
    showSidebar: boolean;
}

export default function TopbarFilter({ toggleSidebar, showSidebar }: TopbarFilterProps) {
    const [view, ] = useState("gid");
    const [sort, setSort] = useState("Featured");

    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between border border-gray-300 rounded px-4 py-2 bg-gray-50 text-sm gap-3 sm:gap-0">
            {/* View toggle + message + filter toggle */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
                {/* Mobile filter toggle button */}
                {/* <button 
                    
                    className="md:hidden p-1.5 border rounded bg-white text-gray-600"
                >
                    <FunnelIcon className="w-5 h-5" />
                </button> */}

                <div className="flex space-x-1">
                    <button onClick={toggleSidebar}
                        // onClick={() => setView("grid")}
                        className={`p-1.5 border border-gray-300 bg-[#EE5A2C] hover:cursor-pointer rounded ${
                            showSidebar ? "bg-[#EE5A2C] hover:cursor-pointer text-white" : "bg-white text-gray-600"
                        }`}
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                    </button>
                    <button
                        // onClick={() => setView("list")}
                        className={`p-1.5 rounded border border-gray-300 ${
                            view === "list" ? "bg-[#EE5A2C] text-white" : "bg-white text-gray-600"
                        }`}
                    >
                        <ListBulletIcon className="w-5 h-5" />
                    </button>
                </div>
                <span className="text-gray-700">We found 29 items for you!</span>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-normal">
                <label className="text-gray-700 whitespace-nowrap">Sort By:</label>
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="appearance-none border border-gray-300 rounded px-4 py-1.5 pr-8 bg-white text-gray-700 text-sm focus:outline-none w-full sm:w-auto"
                    >
                        <option>Featured</option>
                        <option>Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute top-2.5 right-2 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}