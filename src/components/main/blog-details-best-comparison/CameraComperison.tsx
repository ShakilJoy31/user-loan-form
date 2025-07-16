"use client";

import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegComment,
  FaTwitter,
} from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { AiOutlineTag } from "react-icons/ai";
import cameraImage from "@/assets/Home/camera.png";
import person from "@/assets/Home/person.png";
import girl from "@/assets/Home/girl.png";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const CameraComperison = () => {
   const { translate } = useCustomTranslator();
  return (
    <div className="max-w-[894px] px-4 sm:px-6">
      <div className="bg-[#fef7f4] rounded-xl overflow-hidden">
        {/* Top Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-[#ff784b] px-4 sm:px-6 pt-4 sm:pt-6">
          <span className="flex items-center gap-1">
            <AiOutlineTag className="text-base" /> {translate(
                    "বিউটি",
                    "Beauty"
                  )}
          </span>
          <span className="flex items-center gap-1 text-gray-700">
            <BiUser className="text-base" /> {translate(
                    "পূজা-র দ্বারা",
                    "By Puja"
                  )}
          </span>
          <span className="flex items-center gap-1 text-gray-700">
            <FaRegComment className="text-base" /> {translate(
                    "৫৫টি মন্তব্য",
                    "55 Comments"
                  )}
          </span>
        </div>

        {/* Title & Image */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <h2 className="w-full px-2 sm:px-[25px] text-xl sm:text-2xl lg:text-[28px] font-bold mt-2 mb-4 text-center">
            {translate(
                    "ডিএসএলআর, মিরররলেস ও পয়েন্ট-অ্যান্ড-শুট ক্যামেরার সেরা ডিল ও তুলনা (২০২৪)",
                    "Best Deals for DSLR, Mirrorless, & Point-Shoot Cameras & Comparison(2024)"
                  )}
          </h2>
          <Image
            width={844}
            height={442}
            src={cameraImage}
            alt="Camera"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
      {/* person info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 sm:mt-[31px]">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-[12px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-[55px] sm:h-[55px]">
              <Image
                width={55}
                height={55}
                src={person}
                alt="person"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="sm:w-[171px] h-[48px]">
              <h2 className="text-sm sm:text-[16px] font-medium"> {translate(
                    "ক্যামেরন উইলিয়ামসন",
                    "Cameron Williamson"
                  )}</h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                {translate(
                    "৪ এপ্রিল, ২০২১",
                    "4 April, 2021"
                  )} <span> {translate(
                    "· ৬ মিনিটের পড়া",
                    "6 min read"
                  )}</span>
              </p>
            </div>
          </div>
          {/* btn */}
          <div className="flex items-center gap-2 sm:gap-5 flex-wrap">
            <Button
              size={"sm"}
              variant={"outline"}
              className="rounded-full text-[10px] font-normal"
            >
               {translate(
                    "প্রযুক্তি",
                    "Technology"
                  )}
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="rounded-full text-[10px] font-normal"
            >
               {translate(
                    "ক্যামেরা",
                    "Camera"
                  )}
            </Button>
          </div>
        </div>

        {/* icons */}
        <div className="flex space-x-3 sm:space-x-4 self-center sm:self-auto">
          <a
            href="#"
            className="bg-white text-[#EE5A2C] rounded-full hover:bg-gray-100 transition"
          >
            <FaFacebook size={18} className="sm:w-5" />
          </a>
          <a href="#">
            <FaTwitter size={18} className="sm:w-5" />
          </a>
          <a href="#">
            <FaInstagram size={18} className="sm:w-5" />
          </a>
          <a href="#">
            <FaLinkedin size={18} className="sm:w-5" />
          </a>
        </div>
      </div>

      {/* text */}
      <div className="mt-6">
        <h2 className="font-semibold text-base sm:text-[18px] mb-4">
           {translate(
                    "গার্ডেন সেন্টারে গিয়ে গাড়ি ভর্তি গাছের চারা, বীজ আর যন্ত্রপাতি কিনে আনা। তারপর তাড়াহুড়ো করে বাগানে এসে সব বসানো। কিন্তু কয়েক সপ্তাহ পরই আপনি ক্লান্ত আর হতাশ - কিছুই তো হলো না! কিন্তু ভুলটা কোথায় হলো? এই গাইড আপনাকে নতুন বাগান爱好ীদের সাধারণ ভুলগুলো থেকে বাঁচতে সাহায্য করবে, যাতে আপনি একজন লের মতো বাগান করতে পারেন!",
                    "The garden centre, buying a car full of plants, seeds and tools. You then race home to the garden, but you&apos;re left exhausted and disappointed after a few weeks. Nothing has worked! But what went wrong? This guide is going to help you avoid the pitfalls of new gardeners, ensuring you garden like a pro!"
                  )}
        </h2>

        <p className="font-normal text-sm sm:text-[16px] text-gray-300">
          {translate(
                    "যখন আমি এই বাগান বিষয়ক ব্লগটি শুরু করি, আমার লক্ষ্য ছিল খুব সহজ: সব বাগানপ্রেমীদের অনুপ্রাণিত, শিক্ষিত এবং উৎসাহিত করা যাতে তারা তাদের সবুজ প্রকল্পে সফল হয়। আমি বিশেষভাবে নতুন বাগান爱好ীদের সাহায্য করতে ভালোবাসি - তাদের উৎসাহই সবচেয়ে বেশি আনন্দ দেয়। তবে কিছু সাধারণ ভুল আছে যা প্রায় সব নতুন বাগান কর্তাই করেন, যদি না তাদের জন্য উপযুক্ত নির্দেশনা থাকে।",
                    " When I started this gardening blog, I was on a simple mission: to help inspire, educate and encourage all gardeners to succeed in their green spaces. One of the most exciting groups of gardeners I help is beginners or new gardeners. However, there are several common mistakes that all new gardeners make unless they have some guidance."
                  )}
        </p>

        <p className="font-normal text-sm sm:text-[16px] text-gray-300 mt-4 sm:mt-[20px]">
            {translate(
                    "আপনি যদি একজন নতুন বাগানপ্রেমী হন, এই সাধারণ ভুলগুলো এড়াতে এবং বাগানে সফল হতে এই পোস্টটি পড়া আপনার জন্য অপরিহার্য। এই বাগান বিষয়ক ব্লগটি পড়তে আপনার মাত্র কয়েক মিনিট সময় লাগবে, কিন্তু এটি আপনাকে বাগানে সপ্তাহের পর সপ্তাহ হতাশা ও হাঁপানি থেকে বাঁচাবে!",
                    "If you&apos;re a new gardener, reading this post is a must to ensure you avoid these common mistakes to succeed in the garden. This gardening blog will only take a few minutes to read but will save you weeks of upset and frustration in the garden."
                  )}
        </p>
        <p className="font-normal text-sm sm:text-[16px] text-gray-300 mt-4 sm:mt-[20px]">
          {translate(
                    "আমি যখন এই গার্ডেনিং ব্লগটি শুরু করি, আমার লক্ষ্য ছিল খুব সহজ: সব বাগানপ্রেমীদের অনুপ্রাণিত করা, শিক্ষা দেওয়া এবং উৎসাহিত করা, যাতে তারা তাদের সবুজ জগতে সফল হতে পারে। আমি বিশেষভাবে নতুন বাগানপ্রেমীদের সাহায্য করতে ভালোবাসি – তাদের উৎসাহ আমাকে সবচেয়ে বেশি আনন্দ দেয়। তবে, কিছু সাধারণ ভুল আছে যা প্রায় সব নতুন বাগানপ্রেমীই করে থাকেন, যদি না তাদের সঠিক দিকনির্দেশনা থাকে।",
                    " When I started this gardening blog, I was on a simple mission: to help inspire, educate and encourage all gardeners to succeed in their green spaces. One of the most exciting groups of gardeners I help is beginners or new gardeners. However, there are several common mistakes that all new gardeners make unless they have some guidance."
                  )}
        </p>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold mt-6 sm:mt-[30px]">
         {translate(
                    "নতুন বাগানপ্রেমীদের সবচেয়ে সাধারণ ভুলগুলো কী কী?",
                    "What are the most common mistakes of new gardeners?"
                  )}
      </h2>

      <div className="mt-4 sm:mt-[20px] font-medium text-sm sm:text-[16px] text-gray-400">
        <p className="mb-4 sm:mb-[20px]">
           {translate(
                    "চলুন জেনে নিই নতুন বাগানপ্রেমীদের ১০টি প্রধান ভুল এবং কীভাবে আপনি এগুলো এড়াতে পারেন!",
                    "What are the most common mistakes of new gardeners? Let&apos;s jump in and see the top 10 new gardener mistakes and how you can avoid mistakes!"
                  )}
        </p>

        <ol className="space-y-2">
          <li>1. {translate("অনেক বেশি গাছ লাগানো", "Planting too many plants")}</li>
          <li>2. {translate("যে কোনো মাটিতে গাছ লাগানো", "Planting in any soil")}</li>
          <li>3. {translate("গাছের কতটা সূর্যালোক প্রয়োজন তা উপেক্ষা করা", "Ignoring how much sun plants need")}</li>
          <li>4. {translate("বছরের ভুল সময়ে গাছ লাগানো", "Planting at the wrong time of year")}</li>
          <li>5. {translate("গাছগুলো খুব কাছাকাছি লাগানো", "Planting too close together")}</li>
          <li>6. {translate("অনেক বেশি গাছ লাগানো", "Planting too many plants")}</li>
          <li>7. {translate("যে কোনো মাটিতে গাছ লাগানো", "Planting in any soil")}</li>
          <li>8. {translate("গাছের কতটা সূর্যালোক প্রয়োজন তা উপেক্ষা করা", "Ignoring how much sun plants need")}</li>
          <li>9. {translate("বছরের ভুল সময়ে গাছ লাগানো", "Planting at the wrong time of year")}</li>
          <li>10. {translate("গাছগুলো খুব কাছাকাছি লাগানো", "Planting too close together")}</li>
        </ol>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold my-4 sm:my-[20px]">
        {translate("গাছগুলো খুব কাছাকাছি লাগানো", "Planting too close together")}
      </h2>
      <p className="font-medium text-sm sm:text-[16px] text-gray-400">
        {translate(
          "একজন নতুন বাগানপ্রেমী হিসেবে যত বেশি সম্ভব নতুন গাছ আপনার বাগানে ফিট করার জন্য গাছগুলোকে ঘনিষ্ঠভাবে লাগানোর প্রলোভন থাকে। তবে, এই গাছগুলো বড় হওয়ার সাথে সাথে তারা একে অপরের সাথে প্রতিযোগিতা করবে। আপনি গাছ উপভোগ করার চেয়ে সেগুলো সরানোর জন্য বেশি সময় ব্যয় করবেন।",
          "It&apos;s tempting as a new gardener to crowd the plants to try and fit as many new plants into your garden as possible. However, as these plants grow, they will outcompete each other. You&apos;ll spend more time digging up plants to move them than enjoying them."
        )}
      </p>

      <div className="mt-4 sm:mt-[20px]">
        <Image
          width={875}
          height={431}
          src={girl}
          alt="girl"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CameraComperison;