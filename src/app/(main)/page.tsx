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

  const buttons = [
    { id: "all", label: translate("সব বিভাগ", "All Categories") },
    { id: "electronics", label: translate("স্টকে ফ্যাশন এবং পোশাক", "Fashion Fashion and Appearl in Stock") },
    { id: "smartphones", label: translate("স্মার্টফোন", "Smartphones") },
    { id: "laptops", label: translate("ল্যাপটপ এবং কম্পিউটার", "Laptops & Computers") },
    { id: "tvs", label: translate("টিভি ও হোম থিয়েটার", "TVs & Home Theater") },
    { id: "audio", label: translate("অডিও ও হেডফোন", "Audio & Headphones") },
    { id: "cameras", label: translate("ক্যামেরা ও ফটোগ্রাফি", "Cameras & Photography") },
    { id: "appliances", label: translate("গৃহ সরঞ্জাম", "Home Appliances") },
    { id: "furniture", label: translate("ফার্নিচার", "Furniture") },
    { id: "living", label: translate("লিভিং রুম", "Living Room") },
    { id: "bedroom", label: translate("বেডরুম", "Bedroom") },
    { id: "kitchen", label: translate("রান্নাঘর ও ডাইনিং", "Kitchen & Dining") },
    { id: "home", label: translate("ঘর সাজানোর সামগ্রী", "Home Decor") },
    { id: "lighting", label: translate("লাইটিং", "Lighting") },
    { id: "clothing", label: translate("পোশাক", "Clothing") },
    { id: "mens", label: translate("পুরুষদের ফ্যাশন", "Men's Fashion") },
    { id: "womens", label: translate("মহিলাদের ফ্যাশন", "Women's Fashion") },
    { id: "kids", label: translate("শিশু ও বেবি", "Kids & Baby") },
    { id: "footwear", label: translate("জুতো", "Footwear") },
    { id: "accessories", label: translate("অ্যাকসেসরিজ", "Accessories") },
    { id: "jewelry", label: translate("জুয়েলারি ও ঘড়ি", "Jewelry & Watches") },
    { id: "beauty", label: translate("সৌন্দর্য ও ব্যক্তিগত যত্ন", "Beauty & Personal Care") },
    { id: "health", label: translate("স্বাস্থ্য ও সুস্থতা", "Health & Wellness") },
    { id: "groceries", label: translate("কাচাবাজার", "Groceries") },
    { id: "toys", label: translate("খেলনা ও গেমস", "Toys & Games") },
    { id: "sports", label: translate("ক্রীড়া ও আউটডোর", "Sports & Outdoors") },
    { id: "automotive", label: translate("অটোমোটিভ", "Automotive") },
    { id: "books", label: translate("বই ও মিডিয়া", "Books & Media") },
    { id: "office", label: translate("অফিস সরঞ্জাম", "Office Supplies") },
    { id: "pet", label: translate("পোষা প্রাণীর সরঞ্জাম", "Pet Supplies") }
  ];

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
          buttons={buttons}
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