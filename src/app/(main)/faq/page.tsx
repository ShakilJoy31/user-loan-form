"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import faq from "@/assets/Home/FAQ.png";
import { useGetAllFaqsQuery } from "@/redux/features/faq/faqApi";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const FAQ = () => {
     const { data: FAQData, isLoading, isError } = useGetAllFaqsQuery({});
     console.log("FAQData", FAQData)
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) {
    return <div className="text-center py-10">Loading FAQs...</div>;
  }

  if (isError || !FAQData) {
    return <div className="text-center py-10 text-red-500">Error loading FAQs</div>;
  }

  // Type guard to ensure FAQData is an array
  const faqItems: FAQItem[] = Array.isArray(FAQData) ? FAQData : [];

  // Get unique questions (since your data has duplicates)
  const uniqueFaqItems = faqItems.reduce((acc: FAQItem[], current) => {
    const exists = acc.find(item => item.question === current.question);
    if (!exists) {
      return [...acc, current];
    }
    return acc;
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return (
    <div className="mt-16 lg:pt-[28px] max-w-[1280px] mx-auto mb-10 lg:mb-[100px]">
      <div className="mb-4 lg:mb-[60px] text-[#EE5A2C] text-[16px]">
        <Button
          variant={"outline"}
          className=" h-auto text-[#EE5A2C]   flex items-center gap-1"
        >
          <IoMdArrowBack />
          Back
        </Button>
      </div>

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between gap-[25px]">
        {/* image */}
        <div className="px-[20px] lg:px-0">
          <Image
            width={620}
            height={544}
            src={faq}
            alt="faq"
            className="w-full h-full object-cover"
          />
        </div>

        {/* faq */}
         <div className="px-[20px] lg:px-0 w-full lg:max-w-[636px]">
          <div className="max-w-[636px] mx-auto py-8 border border-gray-200 rounded-md">
            {uniqueFaqItems.length > 0 ? (
              uniqueFaqItems.map((item) => (
                <div key={item.id} className="mb-4 last:mb-0 px-4">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 text-left font-medium text-gray-900 flex justify-between items-center"
                  >
                    {item.question}
                    <span className={`transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`}>
                      ⌃
                    </span>
                  </button>
                  {expandedId === item.id && (
                    <div className="px-4 pb-4 pt-1 text-sm text-gray-500 border-l border-r border-b border-gray-200 rounded-b-md">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4">No FAQs available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
