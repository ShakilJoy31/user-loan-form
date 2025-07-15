"use client";

import { useState, useRef } from "react";

interface ScrollableButtonGroupProps {
  buttons: {
    id: string | number;
    label: string;
  }[];
  activeButtonId?: string | number;
  onButtonClick?: (id: string | number) => void;
}

const ScrollableButtonGroup = ({
  buttons,
  activeButtonId,
  onButtonClick,
}: ScrollableButtonGroupProps) => {
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

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
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
          <button
            key={button.id}
            onClick={() => onButtonClick?.(button.id)}
            className={`flex-shrink-0 whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 rounded-full transition-colors duration-200 hover:cursor-pointer text-xs sm:text-sm ${
              activeButtonId === button.id
                ? "bg-[#EE5A2C] text-white"
                : "bg-[#FDEFEA] text-black"
            }`}
          >
            {button.label}
          </button>
        ))}
        
        <div className="flex-shrink-0 pr-[calc(100vw-100%)]" />
      </div>
    </div>
  );
};

export default ScrollableButtonGroup;