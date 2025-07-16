"use client";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";

const GardeningFilter = () => {
  return (
    <div className="">
      <div className="w-full lg:max-w-[1280px] mx-auto flex justify-between items-center mb-6 lg:mb-[49px] pt-5 lg:pt-0 px-[20px] lg:px-0">
       <div>
         <Button
          variant={"outline"}
          className="bg-[#EE5A2C] text-white text-[18px] font-normal"
        >
          Filter
          <GiSettingsKnobs className="ml-1 text-white" />
        </Button>
       </div>

        {/* Sort dropdown */}
        <div className="flex justify-between">
        <div className=" items-center space-x-2 w-full sm:w-auto flex">
          <label className="text-gray-700 whitespace-nowrap">Sort By:</label>
          <div className="relative">
            <select className="appearance-none border border-gray-300 rounded px-4 py-1.5 pr-8 bg-white text-gray-700 text-sm focus:outline-none w-full sm:w-auto">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute top-2.5 right-2 pointer-events-none" />
          </div>
        </div>
</div>
        <div className="items-center gap-1 hidden md:block">
          <span className="mr-1">52</span>
          <span>Result Fount</span>
        </div>
      </div>

      <div className="flex items-center gap-1 md:hidden justify-center">
          <p>52</p>
          <p>Result Fount</p>
        </div>
    </div>
  );
};

export default GardeningFilter;
