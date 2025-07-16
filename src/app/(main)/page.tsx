"use client";

import ScrollableButtonGroup from '@/components/main/home-components/CategoryButtons';
import HomeBanner from '@/components/main/home-components/HomeBanner'
import Promotion from '@/components/main/home-components/Promotion';
import ShopLocationAndCategory from '@/components/main/home-components/ShopLocationAndCategory';
import { P } from '@/components/ui/paragraph';
import React, { useState } from 'react'

const Home = () => {
  const [activeButton, setActiveButton] = useState("all");

  const buttons = [
    { id: "all", label: "All Categories" },
    { id: "electronics", label: "Electronics" },
    { id: "smartphones", label: "Smartphones" },
    { id: "laptops", label: "Laptops & Computers" },
    { id: "tvs", label: "TVs & Home Theater" },
    { id: "audio", label: "Audio & Headphones" },
    { id: "cameras", label: "Cameras & Photography" },
    { id: "appliances", label: "Home Appliances" },
    { id: "furniture", label: "Furniture" },
    { id: "living", label: "Living Room" },
    { id: "bedroom", label: "Bedroom" },
    { id: "kitchen", label: "Kitchen & Dining" },
    { id: "home", label: "Home Decor" },
    { id: "lighting", label: "Lighting" },
    { id: "clothing", label: "Clothing" },
    { id: "mens", label: "Men's Fashion" },
    { id: "womens", label: "Women's Fashion" },
    { id: "kids", label: "Kids & Baby" },
    { id: "footwear", label: "Footwear" },
    { id: "accessories", label: "Accessories" },
    { id: "jewelry", label: "Jewelry & Watches" },
    { id: "beauty", label: "Beauty & Personal Care" },
    { id: "health", label: "Health & Wellness" },
    { id: "groceries", label: "Groceries" },
    { id: "toys", label: "Toys & Games" },
    { id: "sports", label: "Sports & Outdoors" },
    { id: "automotive", label: "Automotive" },
    { id: "books", label: "Books & Media" },
    { id: "office", label: "Office Supplies" },
    { id: "pet", label: "Pet Supplies" }
  ];

  return (
    <div className="min-h-screen mt-16 pt-[32px]">
      <div className='max-w-[1288px] mx-auto px-4 lg:px-0'>
        <HomeBanner />
        <div className="mt-4 md:mt-6">
          <h1 className='text-xl sm:text-2xl md:text-[30px] font-semibold mb-1 md:mb-2'>Explore Your Type Around You</h1>
          <P className="text-sm md:text-base mb-3 md:mb-4">From local boutiques to trending styles — all in one place.</P>
        </div>
      </div>

      {/* Full-width container for buttons only */}
      <div className="relative pl-4 md:pl-[calc((100vw-1288px)/2)]">
        <div className="bg-[#FDEFEA] rounded-tl-full rounded-bl-full">
          <ScrollableButtonGroup
            buttons={buttons}
            activeButtonId={activeButton}
            onButtonClick={(id) => setActiveButton(String(id))}
          />
        </div>
      </div>

      {/* Rest of your content */}
      <div className="max-w-[1288px] mx-auto px-4 lg:px-0 mt-4">
        <div className='flex flex-col md:flex-row gap-4 justify-between mb-8 md:mb-[80px]'>
          <Promotion />
          <ShopLocationAndCategory />
        </div>
      </div>
      
    </div>
  )
}

export default Home