"use client";

import ScrollableButtonGroup from '@/components/main/home-components/CategoryButtons';
import HomeBanner from '@/components/main/home-components/HomeBanner'
import Promotion from '@/components/main/home-components/Promotion';
import ShopLocationAndCategory from '@/components/main/home-components/ShopLocationAndCategory';
import React, { useState } from 'react'

const Home = () => {
  const [activeButton, setActiveButton] = useState("all");

  const buttons = [
    { id: "all", label: "All" },
    { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" }, { id: "category1", label: "Category 1" },

  ];

  return (
    <div className="">
      <div className='max-w-[1288px] mx-auto px-4 lg:px-0'>
        <HomeBanner />
        <div className="mt-6">
          <h1 className='text-[30px] font-semibold mb-2'>Explore Your Type Around You</h1>
          <p className="mb-4">From local boutiques to trending styles — all in one place.</p>
        </div>
      </div>

      {/* Full-width container for buttons only */}
      <div className="relative pl-[calc((100vw-1288px)/2)]">
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
        <div className='md:flex gap-4 justify-between grid'>
          <Promotion></Promotion>
          <ShopLocationAndCategory></ShopLocationAndCategory>
        </div>
      </div>
    </div>
  )
}

export default Home