"use client";

import ScrollableButtonGroup from '@/components/main/home-components/CategoryButtons';
import HomeBanner from '@/components/main/home-components/HomeBanner'
import Promotion from '@/components/main/home-components/Promotion';
import ShopLocationAndCategory from '@/components/main/home-components/ShopLocationAndCategory';
import { P } from '@/components/ui/paragraph';
import React, { useState } from 'react'
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const Home = () => {
  const [activeButton, setActiveButton] = useState("all");
  const { translate } = useCustomTranslator();

  return (
    <div className="min-h-screen mt-16 pt-[32px]">
      <div className='max-w-[1288px] mx-auto px-4 lg:px-0'>
        <HomeBanner />
        <div className="mt-4 md:mt-6">
          <h1 className='text-xl sm:text-2xl md:text-[30px] font-semibold mb-1 md:mb-2'>{translate("আপনার চারপাশে আপনার টাইপ অন্বেষণ করুন", "Explore Your Type Around You")}</h1>
          <P className="text-sm md:text-base mb-3 md:mb-4">{translate("স্থানীয় বুটিক থেকে ট্রেন্ডিং স্টাইল পর্যন্ত — সব এক জায়গায়।", "From local boutiques to trending styles — all in one place.")}</P>
        </div>
      </div>

      {/* Full-width container for buttons only */}
      <div className="relative pl-4 md:pl-[calc((100vw-1288px)/2)]">
        <ScrollableButtonGroup
          activeButtonId={activeButton}
          onButtonClick={(id) => setActiveButton(String(id))}
        />
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