"use client"

import { useState } from "react";
import ScrollableButtonGroup from "./CategoryButtons";
import { P } from "@/components/ui/paragraph";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const ScrollableButtonGroups = () => {
     const [activeButton, setActiveButton] = useState("all");
  const { translate } = useCustomTranslator();

    return (
        <div >

             <div className="mt-4 md:mt-6">
          <h1 className='text-xl sm:text-2xl md:text-[30px] font-semibold mb-1 md:mb-2'>{translate("আপনার চারপাশে আপনার টাইপ অন্বেষণ করুন", "Explore Your Type Around You")}</h1>
          <P className="text-sm md:text-base mb-3 md:mb-4">{translate("স্থানীয় বুটিক থেকে ট্রেন্ডিং স্টাইল পর্যন্ত — সব এক জায়গায়।", "From local boutiques to trending styles — all in one place.")}</P>
        </div>

             <ScrollableButtonGroup
          activeButtonId={activeButton}
          onButtonClick={(id) => setActiveButton(String(id))}
        />
        </div>
    );
};

export default ScrollableButtonGroups;