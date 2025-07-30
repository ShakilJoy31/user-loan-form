"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { useGetAllAreasQuery, useGetAllCitiesQuery } from "@/redux/features/seller-auth/sellerLogin";
import { useGetAllCategoryQuery } from "@/redux/features/product/categoryApi";
import { useGetFilteredShopsQuery } from "@/redux/features/user/userApi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import ButtonLoader from "@/components/common/ButtonLoader";

interface City {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Area {
  id: number;
  cityId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  city: City;
}

interface Category {
  id?: string;
  _id?: string;
  name: string;
}

const DropdownSearch = () => {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from APIs
  const { data: citiesData, isLoading: citiesLoading } = useGetAllCitiesQuery({});
  const { 
    data: areasData, 
    isLoading: areasLoading, 
    isError: areasError,
  } = useGetAllAreasQuery({});
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoryQuery({});

  // Extract arrays from API responses
  const cities: City[] = citiesData?.data || [];
  const areas: Area[] = areasData?.data || [];
  const categories: Category[] = categoriesData?.data || [];

  // Filter areas based on selected city
  const filteredAreas = selectedCityId 
    ? areas.filter(area => area.cityId === selectedCityId)
    : [];

  // Call filtered shops API with selected filters
  const { isLoading: shopsLoading, isError: shopsError, refetch } = useGetFilteredShopsQuery({
    city: selectedCity || "",
    area: selectedArea || "",
    categoryId: selectedCategoryId || "",
    search: searchQuery,
  }, {
    skip: !selectedCity && !selectedArea && !selectedCategoryId && !searchQuery // Skip initial call if no filters are selected
  });

  // Refetch shops when filters change
  useEffect(() => {
    if (selectedCity || selectedArea || selectedCategoryId || searchQuery) {
      refetch();
    }
  }, [selectedCity, selectedArea, selectedCategoryId, searchQuery, refetch]);

  const handleCitySelect = (cityName: string, cityId: number) => {
    setSelectedCity(cityName);
    setSelectedCityId(cityId);
    setSelectedArea(null);
    setCityDropdownOpen(false);
  };

  const handleAreaSelect = (areaName: string) => {
    setSelectedArea(areaName);
    setAreaDropdownOpen(false);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.name);
    setSelectedCategoryId(category.id || category._id || null);
    setCategoryDropdownOpen(false);
  };

  const clearCitySelection = () => {
    setSelectedCity(null);
    setSelectedCityId(null);
    setSelectedArea(null);
  };

  const clearAreaSelection = () => {
    setSelectedArea(null);
  };

  const clearCategorySelection = () => {
    setSelectedCategory(null);
    setSelectedCategoryId(null);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const { translate } = useCustomTranslator();

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Dropdowns Row */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {/* City Dropdown */}
        <div className="relative flex-1 min-w-[120px] ">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
            {translate("শহৰ", "City")}
          </label>
          <div className="relative">
            <div
              className="w-full dark:text-white min-h-[25px] px-1 py-[5px] pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex items-center"
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            >
              {selectedCity ? (
                <span className="truncate">{selectedCity}</span>
              ) : (
                <span className="text-gray-400 dark:text-white">{translate("শহৰ বাছক", "Select City")}</span>
              )}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {selectedCity && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearCitySelection();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCityDropdownOpen(!cityDropdownOpen);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {cityDropdownOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>
              </div>
            </div>
            
            {cityDropdownOpen && (
              <div className="absolute z-10 dark:bg-black dark:text-white dark:border dark:border-gray-300  mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                <div className="py-1">
                  {citiesLoading ? (
                    <div className="px-4 py-2 text-gray-500">{translate("শহৰসমূহ ল'ড হৈ আছে...", "Loading cities...")}</div>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <div
                        key={city.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-black flex items-center ${
                          selectedCity === city.name ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleCitySelect(city.name, city.id)}
                      >
                        <span className={selectedCity === city.name ? "text-[#EE5A2C]" : ""}>
                          {city.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">{translate("কোনো শহৰ উপলব্ধ নাই", "No cities available")}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Area Dropdown */}
        <div className="relative flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">{translate("এৰিয়া", "Area")}</label>
          <div className="relative">
            <div
              className={`w-full min-h-[25px] px-1 py-[5px] pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex items-center dark:text-white ${
                !selectedCity || areasLoading
                  ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-black"
                  : "border-gray-300 bg-white text-gray-700 dark:bg-black"
              }`}
              onClick={() => selectedCity && !areasLoading && setAreaDropdownOpen(!areaDropdownOpen)}
            >
              {selectedArea ? (
                <span className="truncate">{selectedArea}</span>
              ) : (
                <span className="text-gray-400 dark:text-white">
                  {!selectedCity ? translate("প্রথমে শহৰ বাছক", "Select city first") : areasLoading ? translate(`${<ButtonLoader />}`, `${<ButtonLoader />}`) : translate("এৰিয়া বাছক", "Select Area")}
                </span>
              )}
              {selectedCity && !areasLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {selectedArea && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearAreaSelection();
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAreaDropdownOpen(!areaDropdownOpen);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {areaDropdownOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </button>
                </div>
              )}
            </div>
            
            {areaDropdownOpen && selectedCity && (
              <div className="absolute z-10 mt-1 w-full dark:bg-black dark:text-white dark:border dark:border-gray-300  bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                <div className="py-1">
                  {areasLoading ? (
                    <div className="px-4 py-2 text-gray-500">{translate("এৰিয়া ল'ড হৈ আছে...", "Loading areas...")}</div>
                  ) : areasError ? (
                    <div className="px-4 py-2 text-red-500">{translate("এৰিয়া ল'ড কৰোতে ত্ৰুটি", "Error loading areas")}</div>
                  ) : filteredAreas.length > 0 ? (
                    filteredAreas.map((area) => (
                      <div
                        key={area.id}
                        className={`px-4 py-2 cursor-pointer dark:hover:bg-black hover:bg-gray-100 flex items-center ${
                          selectedArea === area.name ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleAreaSelect(area.name)}
                      >
                        <span className={selectedArea === area.name ? "text-[#EE5A2C]" : ""}>
                          {area.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">{translate("এই শহৰৰ বাবে কোনো এৰিয়া উপলব্ধ নাই", "No areas available for this city")}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shop Category Dropdown */}
        <div className="relative flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-white mb-1">{translate("দোকানৰ শ্ৰেণী", "Shop Category")}</label>
          <div className="relative">
            <div
              className="w-full min-h-[25px] px-1 py-[5px] pr-10 border dark:bg-black dark:text-white bg-[#EE5A2C]  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex items-center"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            >
              {selectedCategory ? (
                <span className="truncate">{selectedCategory}</span>
              ) : (
                <span className=" text-white">
                  {categoriesLoading ? translate(`${<ButtonLoader />}`, `${<ButtonLoader />}`) : translate("শ্ৰেণী বাছক", "Select Category")}
                </span>
              )}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {selectedCategory && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearCategorySelection();
                    }}
                    className="text-white"
                  >
                    <FiX className="text-white" size={18} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategoryDropdownOpen(!categoryDropdownOpen);
                  }}
                  className="text-white hover:text-gray-600"
                >
                  {categoryDropdownOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>
              </div>
            </div>
            
            {categoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full dark:bg-black dark:text-white dark:border dark:border-gray-300  bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                <div className="py-1">
                  {categoriesLoading ? (
                    <div className="px-4 py-2 text-gray-500">{translate("শ্ৰেণীবোৰ ল'ড হৈ আছে...", "Loading categories...")}</div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <div
                        key={category.id || category._id || category.name}
                        className={`px-4 py-2 cursor-pointer dark:hover:bg-black hover:bg-gray-100 flex items-center ${
                          selectedCategory === category.name ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        <span className={selectedCategory === category.name ? "text-[#EE5A2C]" : ""}>
                          {category.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">{translate("কোনো শ্ৰেণী উপলব্ধ নাই", "No categories available")}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-[220px]">
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">{translate("সন্ধান কৰক", "Search")}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translate("সন্ধান কৰক...", "Search...")}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] text-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Display loading or error state for shops */}
      {shopsLoading && (
        <div className="mt-4 text-gray-500">{translate("দোকানসমূহ ল'ড হৈ আছে...", "Loading shops...")}</div>
      )}
      {shopsError && (
        <div className="mt-4 text-red-500">{translate("দোকানসমূহ ল'ড কৰোতে ত্ৰুটি", "Error loading shops")}</div>
      )}
    </div>
  );
};

export default DropdownSearch;