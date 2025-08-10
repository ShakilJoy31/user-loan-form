// components/Footer.tsx
import { FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import Image from "next/image";
import siteLogo from "@/assets/Logo/navber-logo.png";
import Paragraph from "../reusable-components/Paragraph";
import Heading from "../reusable-components/Heading";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-300 pt-8 md:pt-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {/* Logo & Info */}
        <div className="col-span-2">
          <div className="flex gap-x-[29px] mb-3 md:mb-4">
            <Image 
              src={siteLogo} 
              alt="Tech Element IT Ltd" 
              width={160} 
              height={60}
              className="w-32 md:w-48"
            />
            <Paragraph className="text-xs md:text-sm w-full lg:w-[224px] text-cnter">Instant is a visual, we are ready to give you services</Paragraph>
          </div>
          
          <div className="flex items-start gap-2 mb-2 md:mb-3">
            <MdLocationOn className="text-blue-500 text-lg md:text-xl mt-0.5 flex-shrink-0" />
            <Paragraph className="text-xs md:text-sm">
              Lavel, J-16, Lily Pond Center, 3 RK Mission Road, Ittefeq mor, Motijheel, Dhaka-1203
            </Paragraph>
          </div>
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <MdEmail className="text-blue-500 text-lg md:text-xl flex-shrink-0" />
            <Paragraph className="text-xs md:text-sm">techelementit@gmail.com</Paragraph>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
            <a href="#" className="bg-blue-500 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaTelegramPlane />
            </a>
            <a href="#" className="bg-blue-500 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaWhatsapp />
            </a>
            <a href="#" className="bg-blue-500 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaInstagram />
            </a>
            <a href="#" className="bg-blue-500 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Top Trends */}
        <div>
          <Heading className="font-bold mb-2 md:mb-4 text-sm md:text-base">Top Trends</Heading>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {[
              "Full-stack Developer",
              "Front-End Development",
              "Back-End Development",
              "Our works",
              "Node.js Developer",
              "React Developer",
              "Android Developer",
              "iOS Developer"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-500 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <Heading className="font-bold mb-2 md:mb-4 text-sm md:text-base">Quick Links</Heading>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {[
              "About Us",
              "Contact Us",
              "Technology",
              "Our works",
              "Services",
              "Blogs"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-500 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-2 sm:col-span-1">
          <Heading className="font-bold mb-2 md:mb-4 text-sm md:text-base">Services</Heading>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm grid grid-cols-1">
            {[
              "Full-stack Developer",
              "Front-End Development",
              "Back-End Development",
              "Our works",
              "Node.js Developer",
              "React Developer",
              "Android Developer",
              "iOS Developer"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-500 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8 md:mt-10 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center py-4 text-xs md:text-sm">
        <Paragraph className="flex items-center gap-1 mb-2 md:mb-0">
          COURTESY 2023. ALL RIGHTS RESERVED. <span className="text-sm md:text-lg">©</span>
        </Paragraph>
        <Paragraph className="flex gap-2 md:gap-4">
          <span className="hover:text-blue-500 cursor-pointer">PRIVACY POLICY</span>
          <span>|</span>
          <span className="hover:text-blue-500 cursor-pointer">TERMS & CONDITIONS</span>
        </Paragraph>
      </div>
    </footer>
  );
}