"use client";

import { useGetAllCategoryQuery } from "@/redux/features/product/categoryApi";
import { useState, useRef } from "react";

interface CategoryButton {
  id: string | number;
  label: string;
}

interface Category {
  name: string;
  id: string | number;
  title: string;
  // other properties...
}

interface ScrollableButtonGroupProps {
  activeButtonId?: string | number;
  onButtonClick?: (id: string | number) => void;
}


const ScrollableButtonGroup = ({
  activeButtonId,
  onButtonClick,
} : ScrollableButtonGroupProps ) => {
  // Fetch categories from API
  const { data: categories, isLoading, isError } = useGetAllCategoryQuery({});

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[47px] lg:h-[57px] overflow-hidden bg-[#FDEFEA] rounded-tl-full rounded-bl-full px-2 xl:px-0">
        <div className="flex h-full items-center overflow-x-auto scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-6 bg-gray-200 rounded-full w-24 mx-2 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (isError || !categories?.data) {
    return (
      <div className="relative w-full h-[47px] lg:h-[57px] overflow-hidden bg-[#FDEFEA] rounded-tl-full rounded-bl-full px-2 xl:px-0">
        <div className="flex h-full items-center justify-center text-red-500 text-sm">
          Failed to load categories
        </div>
      </div>
    );
  }

  // Transform API data to button format
  const buttons: CategoryButton[] = categories.data.map(
    (category: Category) => ({
      id: category.id,
      label: category.name,
    })
  );

  return (
    <div className="relative w-full h-[47px] lg:h-[57px] overflow-hidden bg-[#FDEFEA] rounded-tl-full rounded-bl-full px-2 lg:px-0 dark:bg-black ">
      <div
        ref={containerRef}
        className="flex h-full items-center overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing dark:bg-black"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex-shrink-0" />

        {buttons.map((button) => (
          <span
            key={button.id}
            onClick={() => onButtonClick?.(button.id)}
            className={`flex-shrink-0 h-full flex items-center justify-center whitespace-nowrap px-3 sm:px-4 rounded-full transition-colors duration-200 cursor-pointer text-xs sm:text-sm ${
              activeButtonId === button.id
                ? "bg-[#EE5A2C] text-white"
                : "text-[#808089] hover:bg-[#EE5A2C] hover:text-white dark:text-white dark:hover:text-white"
            }`}
          >
            {button.label}
          </span>
        ))}

        <div className="flex-shrink-0 pr-[calc(100vw-100%)]" />
      </div>
    </div>
  );
};

export default ScrollableButtonGroup;
