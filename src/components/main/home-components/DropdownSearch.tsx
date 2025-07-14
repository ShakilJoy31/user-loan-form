"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const DropdownSearch = () => {
  // Sample data for cities and areas
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
      <div className="flex items-center w-full">
        {/* City Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400 transition-colors"
          >
            <span>{selectedCity || "Select City"}</span>
            {cityDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {cityDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {cities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`p-3 hover:bg-gray-100 cursor-pointer ${
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
        <div className="relative flex-1">
          <button
            onClick={() => selectedCity && setAreaDropdownOpen(!areaDropdownOpen)}
            disabled={!selectedCity}
            className={`w-full flex justify-between items-center p-3 border rounded-lg transition-colors ${
              !selectedCity
                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            <span>{selectedArea || "Select Area"}</span>
            {areaDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {areaDropdownOpen && selectedCity && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {areas.map((area) => (
                <li
                  key={area}
                  onClick={() => handleAreaSelect(area)}
                  className={`p-3 hover:bg-gray-100 cursor-pointer ${
                    selectedArea === area ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {area}
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Shop Category Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-[#EE5A2C] text-white rounded-lg font-medium whitespace-nowrap"
        >
          Shop Category
        </motion.button>
      </div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products, brands, etc."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] focus:border-transparent transition-all"
        />
      </motion.div>
    </div>
  );
};

export default DropdownSearch;