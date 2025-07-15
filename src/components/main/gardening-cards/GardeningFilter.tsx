"use client"
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";

const GardeningFilter = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-[49px]">
            {/* Filter Button - moves to top on mobile */}
            <Button 
                variant={"outline"} 
                className="bg-[#EE5A2C] text-white text-base sm:text-[18px] font-normal w-full sm:w-auto"
            >
                Filter
                <GiSettingsKnobs className="ml-1 text-white" />
            </Button>

            {/* Middle section - stacks on mobile */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 w-full sm:w-auto justify-between">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 w-full xs:w-auto">
                    <label className="text-gray-700 whitespace-nowrap text-sm sm:text-base">Sort By:</label>
                    <div className="relative flex-grow xs:flex-grow-0">
                        <select
                            className="appearance-none border border-gray-300 rounded px-4 py-1.5 pr-8 bg-white text-gray-700 text-sm focus:outline-none w-full"
                        >
                            <option>Featured</option>
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                        <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute top-2.5 right-2 pointer-events-none" />
                    </div>
                </div>

                {/* Results count - moves below on mobile */}
                <div className="flex items-center gap-1 text-sm sm:text-base">
                    <p>52</p>
                    <p>Results Found</p>
                </div>
            </div>
        </div>
    );
};

export default GardeningFilter;