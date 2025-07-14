"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const DropdownSearch = () => {
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const cityData = {
    "New York": ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    "Los Angeles": ["Hollywood", "Downtown", "Santa Monica", "Beverly Hills"],
    Chicago: ["Downtown", "North Side", "South Side", "West Side"],
    Houston: ["Downtown", "Uptown", "Midtown", "Energy Corridor"],
  };

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cities = Object.keys(cityData);
  const areas = selectedCity ? cityData[selectedCity as keyof typeof cityData] : [];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedArea(null);
    setCityDropdownOpen(false);
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setAreaDropdownOpen(false);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {/* City Dropdown */}
        <div className="relative w-[118px]">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded bg-[#F9F9F9] text-gray-700 text-sm"
          >
            <span>{selectedCity || "City"}</span>
            {cityDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {cityDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 border border-gray-300 rounded bg-white text-black shadow max-h-60 overflow-auto text-sm"
            >
              {cities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                    selectedCity === city ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {city}
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Area Dropdown */}
        <div className="relative w-[118px]">
          <button
            onClick={() => selectedCity && setAreaDropdownOpen(!areaDropdownOpen)}
            disabled={!selectedCity}
            className={`w-full flex justify-between items-center px-3 py-2 border rounded text-sm ${
              !selectedCity
                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border-gray-300 bg-[#F9F9F9] text-gray-700"
            }`}
          >
            <span>{selectedArea || "Area"}</span>
            {areaDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {areaDropdownOpen && selectedCity && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 text-black rounded shadow max-h-60 overflow-auto text-sm"
            >
              {areas.map((area) => (
                <li
                  key={area}
                  onClick={() => handleAreaSelect(area)}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                    selectedArea === area ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {area}
                </li>
              ))}
            </motion.ul>
          )}
        </div>

       {/* Shop Category Dropdown */}
<div className="relative">
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
    className="w-[174px] flex justify-between items-center px-4 py-2 bg-[#EE5A2C] text-white rounded text-sm font-medium"
  >
    Shop Category
    {categoryDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
  </motion.button>

  {categoryDropdownOpen && (
    <motion.ul
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-10 w-full mt-1 bg-white border border-gray-300 text-black rounded shadow max-h-60 overflow-auto text-sm"
    >
      {/* Add your category items here */}
      <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Category 1</li>
      <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Category 2</li>
      <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Category 3</li>
    </motion.ul>
  )}
</div>
      </div>

      {/* Search Input */}
      <div className="relative w-[221px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
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
  );
};

export default DropdownSearch;
