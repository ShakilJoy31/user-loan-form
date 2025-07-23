"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { useGetAllAreasQuery, useGetAllCitiesQuery } from "@/redux/features/seller-auth/sellerLogin";
import { useGetAllCategoryQuery } from "@/redux/features/product/categoryApi";

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
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

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Dropdowns Row */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {/* City Dropdown */}
        <div className="relative flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <div className="relative">
            <div
              className="w-full  min-h-[25px] px-1 py-[5px] pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex items-center"
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            >
              {selectedCity ? (
                <span className="truncate">{selectedCity}</span>
              ) : (
                <span className="text-gray-400">Select City</span>
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
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                <div className="py-1">
                  {citiesLoading ? (
                    <div className="px-4 py-2 text-gray-500">Loading cities...</div>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <div
                        key={city.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
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
                    <div className="px-4 py-2 text-gray-500">No cities available</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Area Dropdown */}
        <div className="relative flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
          <div className="relative">
            <div
              className={`w-full min-h-[25px] px-1 py-[5px] pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] cursor-text flex items-center ${
                !selectedCity || areasLoading
                  ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
              onClick={() => selectedCity && !areasLoading && setAreaDropdownOpen(!areaDropdownOpen)}
            >
              {selectedArea ? (
                <span className="truncate">{selectedArea}</span>
              ) : (
                <span className="text-gray-400">
                  {!selectedCity ? "Select city first" : areasLoading ? "Loading..." : "Select Area"}
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
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                <div className="py-1">
                  {areasLoading ? (
                    <div className="px-4 py-2 text-gray-500">Loading areas...</div>
                  ) : areasError ? (
                    <div className="px-4 py-2 text-red-500">Error loading areas</div>
                  ) : filteredAreas.length > 0 ? (
                    filteredAreas.map((area) => (
                      <div
                        key={area.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
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
                    <div className="px-4 py-2 text-gray-500">No areas available for this city</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shop Category Dropdown */}
        <div className="relative flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Category</label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            disabled={categoriesLoading}
            className={`w-full flex justify-between items-center px-4 py-2 bg-[#EE5A2C] text-white rounded text-sm font-medium ${
              categoriesLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <span className="truncate">
              {selectedCategory || (categoriesLoading ? "Loading..." : "Shop Category")}
            </span>
            {categoryDropdownOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </motion.button>

          {categoryDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 text-black rounded shadow max-h-60 overflow-auto text-sm"
            >
              {categoriesLoading ? (
                <li className="px-3 py-2 text-gray-500">Loading categories...</li>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <li
                    key={category.id || category._id || category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`px-3 py-2 hover:bg-gray-100 cursor-pointer truncate ${
                      selectedCategory === category.name ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {category.name}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No categories available</li>
              )}
            </motion.ul>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-[220px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownSearch;