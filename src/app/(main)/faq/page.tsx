"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import faq from "@/assets/Home/FAQ.png";

const FAQ = () => {
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
        <div>
          <div className="px-[20px] max-w-[636px] mx-auto py-8 border border-gray-200 rounded-md">
            {/* First Section */}
            <div>
              <h1 className="text-2xl font-bold mb-4">
                What Facilities Does Your Hotel Have?
              </h1>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                voluptate doloribus eos sunt lobore ea enim voluptatem, sequi
                voluptas rem doloremque architecto. Libero, vero natus.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Second Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                How Do I Book A Room For My Vacation?
              </h2>

              {/* FAQ Items */}
              <div className="space-y-4">
                {/* Repeated FAQ Item */}
                <div className="border-b border-gray-200 pb-4">
                  <button className="flex justify-between items-center w-full text-left">
                    <span className="font-medium">
                      Is There Any Fitness Center in Your Hotel?
                    </span>
                    <span className="text-gray-500">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
