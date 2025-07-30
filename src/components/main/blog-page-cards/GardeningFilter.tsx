"use client";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { ChevronDownIcon } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";

interface GardeningFilterProps {
  onSortChange: (sort: string) => void;
  totalResults: number;
}

const GardeningFilter = ({ onSortChange, totalResults }: GardeningFilterProps) => {
  const { translate } = useCustomTranslator();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="">
      <div className="w-full lg:max-w-[1280px] mx-auto flex justify-between items-center mb-6 lg:mb-[49px] pt-5 lg:pt-0 px-[20px] lg:px-0">
        <div>
          <Button
            variant={"outline"}
            className="bg-[#EE5A2C] text-white text-[18px] font-normal"
          >
            {translate("ফিল্টার", "Filter")}
            <GiSettingsKnobs className="ml-1 text-white" />
          </Button>
        </div>

        {/* Sort dropdown */}
        <div className="flex justify-between">
          <div className=" items-center space-x-2 w-full sm:w-auto flex">
            <label className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {translate("সাজান:", "Sort By:")}
            </label>
            <div className="relative">
              <select 
                className="appearance-none border rounded px-4 py-1.5 pr-8 bg-white dark:bg-black dark:border border-gray-300 text-gray-700 dark:text-gray-300 text-sm focus:outline-none w-full sm:w-auto"
                onChange={handleSortChange}
              >
                <option value="asc">{translate("নতুন", "Newest")}</option>
                <option value="desc">{translate("পুরাতন", "Oldest")}</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute top-2.5 right-2 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="items-center gap-1 hidden md:block">
          <span className="mr-1">{totalResults}</span>
          <span>{translate("ফলাফল পাওয়া গেছে", "Result Found")}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 md:hidden justify-center">
        <p>{totalResults}</p>
        <p>{translate("ফলাফল পাওয়া গেছে", "Result Found")}</p>
      </div>
    </div>
  );
};

export default GardeningFilter;