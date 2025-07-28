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
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Post } from "@/types/blogPost";



const CameraComperison = ({ post }: { post: Post }) => {
   const { translate } = useCustomTranslator();
   
   // Format date
   const formatDate = (dateString: string) => {
     const date = new Date(dateString);
     return date.toLocaleDateString('en-US', { 
       year: 'numeric', 
       month: 'long', 
       day: 'numeric' 
     });
   };

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
                    `${post.author}-র দ্বারা`,
                    `By ${post.author}`
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
                    post.title,
                    post.title
                  )}
          </h2>
          <Image
            width={844}
            height={442}
            src={post.image || cameraImage}
            alt={post.title}
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
                    `${post.author}`,
                    `${post.author}`
                  )}</h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                {formatDate(post.createdAt)} <span> {translate(
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

      {/* Content */}
      <div 
        className="blog-content mt-6" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </div>
  );
};

export default CameraComperison;